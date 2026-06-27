# 9.3. Visão Geral do Manuseio de Dispositivos e Módulos

No Capítulo 8, instalamos o daemon udev quando o systemd foi construído. Antes de entrarmos nos detalhes sobre como o udev funciona, uma breve história dos métodos anteriores de manipulação de dispositivos é apropriada.

Sistemas Linux em geral tradicionalmente usavam um método estático de criação de dispositivos, pelo qual muitos device nodes eram criados em /dev (às vezes literalmente milhares de nodes), independentemente de os dispositivos de hardware correspondentes realmente existirem. Isso era tipicamente feito através de um script MAKEDEV, que continha várias chamadas para o programa mknod com os números major e minor de dispositivo relevantes para cada dispositivo possível que pudesse existir no mundo.

Usando o método udev, os device nodes são criados apenas para os dispositivos que são detectados pelo kernel. Esses device nodes são criados a cada inicialização do sistema; eles são armazenados em um sistema de arquivos devtmpfs (um sistema de arquivos virtual que reside inteiramente na memória do sistema). Os device nodes não exigem muito espaço, então a memória utilizada é insignificante.

## 9.3.1. Histórico

Em fevereiro de 2000, um novo filesystem chamado devfs foi mesclado ao kernel 2.3.46 e foi disponibilizado durante a série 2.4 de kernels estáveis. Embora estivesse presente no próprio código-fonte do kernel, este método de criação dinâmica de dispositivos nunca recebeu apoio esmagador dos desenvolvedores do kernel core.

O principal problema com a abordagem adotada pelo devfs era a forma como ele lidava com a detecção, criação e nomeação de dispositivos. A última questão, a da nomeação de device nodes, foi talvez a mais crítica. É geralmente aceito que, se os nomes dos dispositivos são configuráveis, a política de nomeação de dispositivos deve ser escolhida pelos administradores de sistema, e não imposta a eles pelo(s) desenvolvedor(es). O sistema de arquivos devfs também sofria de race conditions que eram inerentes ao seu design; estas não puderam ser corrigidas sem uma revisão substancial do kernel. O devfs foi marcado como deprecated por um longo tempo e foi finalmente removido do kernel em junho de 2006.

Com o desenvolvimento da árvore de kernel instável 2.5, posteriormente lançada como a série 2.6 de kernels estáveis, um novo filesystem virtual chamado sysfs surgiu. A função do sysfs é fornecer informações sobre a configuração de hardware do sistema para processos userspace. Com esta representação visível para o userspace, tornou-se possível desenvolver um substituto userspace para o devfs.

## 9.3.2. Implementação do Udev

### 9.3.2.1. Sysfs

O filesystem sysfs foi mencionado brevemente acima. Pode-se perguntar como o sysfs sabe sobre os dispositivos presentes em um sistema e quais números de dispositivo devem ser usados para eles. Drivers que foram compilados no kernel registram seus objetos no sysfs (devtmpfs internamente) à medida que são detectados pelo kernel. Para drivers compilados como modules, o registro acontece quando o module é carregado. Uma vez que o filesystem sysfs é montado (em /sys), os dados que os drivers registraram no sysfs estão disponíveis para processos userspace e para o udevd para processamento (incluindo modificações em device nodes).

### 9.3.2.2. Criação de Device Node

Os arquivos de dispositivo são criados pelo kernel no sistema de arquivos devtmpfs. Qualquer driver que deseje registrar um device node usará o devtmpfs (via driver core) para fazê-lo. Quando uma instância devtmpfs é montada em /dev, o device node será inicialmente exposto ao userspace com um nome, permissões e proprietário fixos.

Pouco tempo depois, o kernel enviará um uevent para o udevd. Com base nas rules especificadas nos arquivos dentro dos diretórios /etc/udev/rules.d, /usr/lib/udev/rules.d e /run/udev/rules.d, o udevd criará symlinks adicionais para o device node, ou mudará suas permissões, proprietário ou grupo, ou modificará a entrada do banco de dados interno do udevd (nome) para aquele objeto.

As rules nesses três diretórios são numeradas e todos os três diretórios são mesclados. Se o udevd não conseguir encontrar uma rule para o dispositivo que está criando, ele manterá as permissões e a propriedade conforme o devtmpfs usou inicialmente.

### 9.3.2.3. Carregamento de Module

Device drivers compilados como modules podem ter aliases embutidos neles. Aliases são visíveis na saída do programa modinfo e geralmente estão relacionados aos identificadores específicos do bus de dispositivos suportados por um module. Por exemplo, o driver snd-fm801 suporta dispositivos PCI com vendor ID 0x1319 e device ID 0x0801, e tem um alias de pci:v00001319d00000801sv*sd*bc04sc01i*. Para a maioria dos dispositivos, o driver do bus exporta o alias do driver que manipularia o dispositivo via sysfs. Por exemplo, o arquivo /sys/bus/pci/devices/0000:00:0d.0/modalias pode conter a string pci:v00001319d00000801sv00001319sd00001319bc04sc01i00. As rules padrão fornecidas com o udev farão com que o udevd chame o /sbin/modprobe com o conteúdo da variável de ambiente MODALIAS uevent (que deve ser o mesmo que o conteúdo do arquivo modalias no sysfs), carregando assim todos os modules cujos aliases correspondem a esta string após a expansão de curingas.

Neste exemplo, isso significa que, além do snd-fm801, o driver forte obsoleto (e indesejado) será carregado se estiver disponível. Veja abaixo as maneiras pelas quais o carregamento de drivers indesejados pode ser evitado.

O próprio kernel também é capaz de carregar modules para protocolos de rede, filesystems e suporte NLS sob demanda.

### 9.3.2.4. Manipulação de Dispositivos Hotpluggable/Dinâmicos

Quando você conecta um dispositivo, como um reprodutor de MP3 Universal Serial Bus (USB), o kernel reconhece que o dispositivo está agora conectado e gera um uevent. Este uevent é então manipulado pelo udevd conforme descrito acima.

## 9.3.3. Problemas com o Carregamento de Modules e Criação de Dispositivos

Existem alguns problemas possíveis quando se trata de criar device nodes automaticamente.

### 9.3.3.1. Um Module do Kernel Não É Carregado Automaticamente

O Udev só carregará um module se ele tiver um alias específico do bus e o driver do bus exportar corretamente os aliases necessários para o sysfs. Em outros casos, deve-se organizar o carregamento do module por outros meios. Com o Linux-6.16.1, o udev é conhecido por carregar drivers bem escritos para dispositivos INPUT, IDE, PCI, USB, SCSI, SERIO e FireWire.

Para determinar se o device driver que você precisa tem o suporte necessário para o udev, execute modinfo com o nome do module como argumento. Agora tente localizar o diretório do dispositivo em /sys/bus e verifique se há um arquivo modalias lá.

Se o arquivo modalias existir no sysfs, o driver suporta o dispositivo e pode se comunicar diretamente com ele, mas não tem o alias, é um bug no driver. Carregue o driver sem a ajuda do udev e espere que o problema seja corrigido posteriormente.

Se não houver um arquivo modalias no diretório relevante em /sys/bus, isso significa que os desenvolvedores do kernel ainda não adicionaram suporte a modalias para este tipo de bus. Com o Linux-6.16.1, este é o caso dos busses ISA. Espere que este problema seja corrigido em versões futuras do kernel.

O Udev não se destina a carregar drivers “wrapper” como snd-pcm-oss e drivers não-hardware como loop de forma alguma.

### 9.3.3.2. Um Module do Kernel Não É Carregado Automaticamente, e o Udev Não Se Destina a Carregá-lo

Se o module “wrapper” apenas aprimora a funcionalidade fornecida por algum outro module (por exemplo, snd-pcm-oss aprimora a funcionalidade de snd-pcm tornando as placas de som disponíveis para aplicações OSS), configure o modprobe para carregar o wrapper depois que o udev carregar o module encapsulado. Para fazer isso, adicione uma linha “softdep” ao arquivo /etc/modprobe.d/<filename>.conf correspondente. Por exemplo:

```
softdep snd-pcm post: snd-pcm-oss
```

Observe que o comando “softdep” também permite dependências pre:, ou uma mistura de dependências pre: e post:. Consulte a página de manual [modprobe.d(5)](https://man.archlinux.org/man/modprobe.d.5) para mais informações sobre a sintaxe e capacidades do “softdep”.

### 9.3.3.3. O Udev Carrega Algum Module Indesejado

Ou não compile o module, ou faça o blacklist dele em um arquivo /etc/modprobe.d/blacklist.conf como feito com o module forte no exemplo abaixo:

```
blacklist forte
```

Modules em blacklist ainda podem ser carregados manualmente com o comando modprobe explícito.

### 9.3.3.4. O Udev Cria um Dispositivo Incorretamente, ou Cria o Symlink Errado

Isso geralmente acontece se uma rule corresponder inesperadamente a um dispositivo. Por exemplo, uma rule mal escrita pode corresponder tanto a um disco SCSI (conforme desejado) quanto ao dispositivo genérico SCSI correspondente (incorretamente) por vendor. Encontre a rule ofensiva e torne-a mais específica, com a ajuda do comando udevadm info.

### 9.3.3.5. Rule do Udev Funciona de Forma Não Confiável

Esta pode ser outra manifestação do problema anterior. Se não, e sua rule usa atributos sysfs, pode ser um problema de timing do kernel, a ser corrigido em kernels posteriores. Por enquanto, você pode contorná-lo criando uma rule que espera pelo atributo sysfs usado e anexando-a ao arquivo /etc/udev/rules.d/10-wait_for_sysfs.rules (crie este arquivo se ele não existir). Por favor, notifique a LFS Development list se você fizer isso e ajudar.

### 9.3.3.6. O Udev Não Cria um Dispositivo

Primeiro, certifique-se de que o driver esteja embutido no kernel ou já carregado como um module, e que o udev não esteja criando um dispositivo com nome incorreto.

Se um driver do kernel não exportar seus dados para o sysfs, o udev não terá as informações necessárias para criar um nó de dispositivo. Isso é mais provável de acontecer com drivers de terceiros de fora da árvore do kernel. Crie um nó de dispositivo estático em /usr/lib/udev/devices com os números major/minor apropriados (consulte o arquivo devices.txt dentro da documentação do kernel ou a documentação fornecida pelo fornecedor do driver de terceiros). O nó de dispositivo estático será copiado para /dev pelo udev.

### 9.3.3.7. A Ordem de Nomenclatura de Dispositivos Muda Aleatoriamente Após a Reinicialização

Isso se deve ao fato de que o udev, por design, lida com uevents e carrega módulos em paralelo, e, portanto, em uma ordem imprevisível. Isso nunca será “corrigido”. Você não deve confiar na estabilidade dos nomes de dispositivos do kernel. Em vez disso, crie suas próprias regras que criem symlinks com nomes estáveis baseados em alguns atributos estáveis do dispositivo, como um número de série ou a saída de várias utilidades *_id instaladas pelo udev. Consulte [Seção 9.4, “Gerenciando Dispositivos”](#/page/chapter09__symlinks) e [Seção 9.2, “Configuração Geral de Rede”](#/page/chapter09__network) para exemplos.

## 9.3.4. Leitura Útil

Documentação adicional útil está disponível nos seguintes sites:

- Uma Implementação de devfs no Espaço do Usuário [ http://www.kroah.com/linux/talks/ols_2003_udev_paper/Reprint-Kroah-Hartman-OLS2003.pdf](http://www.kroah.com/linux/talks/ols_2003_udev_paper/Reprint-Kroah-Hartman-OLS2003.pdf)

- O Sistema de Arquivos sysfs [ https://www.kernel.org/pub/linux/kernel/people/mochel/doc/papers/ols-2005/mochel.pdf](https://www.kernel.org/pub/linux/kernel/people/mochel/doc/papers/ols-2005/mochel.pdf)

# 8.2. Gerenciamento de Pacotes

O Gerenciamento de Pacotes é uma adição frequentemente solicitada ao Livro LFS. Um Gerenciador de Pacotes rastreia a instalação de arquivos, tornando mais fácil remover e atualizar pacotes. Um bom gerenciador de pacotes também lidará com os arquivos de configuração de forma especial para manter a configuração do usuário quando o pacote for reinstalado ou atualizado. Antes que você comece a se perguntar, NÃO—esta seção não abordará nem recomendará nenhum gerenciador de pacotes em particular. O que ela fornece é um resumo das técnicas mais populares e como elas funcionam. O gerenciador de pacotes perfeito para você pode estar entre essas técnicas, ou pode ser uma combinação de duas ou mais dessas técnicas. Esta seção menciona brevemente problemas que podem surgir ao atualizar pacotes.

Algumas razões pelas quais nenhum gerenciador de pacotes é mencionado no LFS ou BLFS incluem:

- Lidar com o gerenciamento de pacotes desvia o foco dos objetivos desses livros—ensinar como um sistema Linux é construído.

- Existem múltiplas soluções para gerenciamento de pacotes, cada uma com seus pontos fortes e fracos. Encontrar uma solução que satisfaça todos os públicos é difícil.

Existem algumas dicas escritas sobre o tópico de gerenciamento de pacotes. Visite o [Projeto de Dicas](https://www.linuxfromscratch.org/hints/downloads/files/) e veja se alguma delas se encaixa nas suas necessidades.

## 8.2.1. Problemas de Atualização

Um Gerenciador de Pacotes facilita a atualização para versões mais recentes quando elas são lançadas. Geralmente, as instruções nos livros LFS e BLFS podem ser usadas para atualizar para as versões mais recentes. Aqui estão alguns pontos que você deve estar ciente ao atualizar pacotes, especialmente em um sistema em execução.

- Se o kernel Linux precisar ser atualizado (por exemplo, de 5.10.17 para 5.10.18 ou 5.11.1), nada mais precisa ser reconstruído. O sistema continuará funcionando bem graças à interface bem definida entre o kernel e o userspace. Especificamente, os cabeçalhos da API Linux não precisam ser atualizados junto com o kernel. Você precisará apenas reiniciar seu sistema para usar o kernel atualizado.

- Se o Glibc precisar ser atualizado para uma versão mais recente (por exemplo, de Glibc-2.36 para Glibc-2.42), alguns passos extras são necessários para evitar quebrar o sistema. Leia a [Seção 8.5, “Glibc-2.42”](#/page/chapter08__glibc) para detalhes.

- Se um pacote contendo uma biblioteca compartilhada for atualizado, e se o nome da biblioteca[1] mudar, então quaisquer pacotes dinamicamente ligados à biblioteca devem ser recompilados, para ligar-se à biblioteca mais recente. Por exemplo, considere um pacote foo-1.2.3 que instala uma biblioteca compartilhada com o nome libfoo.so.1. Suponha que você atualize o pacote para uma versão mais recente foo-1.2.4 que instala uma biblioteca compartilhada com o nome libfoo.so.2. Neste caso, quaisquer pacotes que estão dinamicamente ligados a libfoo.so.1 precisam ser recompilados para ligar-se a libfoo.so.2 a fim de usar a nova versão da biblioteca. Você não deve remover as bibliotecas antigas até que todos os pacotes dependentes tenham sido recompilados.

- Se um pacote estiver (direta ou indiretamente) ligado aos nomes antigo e novo de uma biblioteca compartilhada (por exemplo, o pacote se liga a libfoo.so.2 e libbar.so.1, enquanto este último se liga a libfoo.so.3), o pacote pode funcionar incorretamente porque as diferentes revisões da biblioteca compartilhada apresentam definições incompatíveis para alguns nomes de símbolos. Isso pode ser causado pela recompilação de alguns, mas não todos, os pacotes ligados à biblioteca compartilhada antiga depois que o pacote que fornece a biblioteca compartilhada é atualizado. Para evitar o problema, os usuários precisarão reconstruir cada pacote ligado a uma biblioteca compartilhada com uma revisão atualizada (por exemplo, libfoo.so.2 para libfoo.so.3) o mais rápido possível.

- Se um pacote contendo uma biblioteca compartilhada for atualizado, e o nome da biblioteca não mudar, mas o número de versão do arquivo da biblioteca diminuir (por exemplo, a biblioteca ainda é nomeada libfoo.so.1, mas o nome do arquivo da biblioteca é alterado de libfoo.so.1.25 para libfoo.so.1.24), você deve remover o arquivo da biblioteca da versão previamente instalada (libfoo.so.1.25 neste caso). Caso contrário, um comando ldconfig (invocado por você na linha de comando, ou pela instalação de algum pacote) irá redefinir o symlink libfoo.so.1 para apontar para o arquivo da biblioteca antiga porque parece ser uma versão “mais nova”; seu número de versão é maior. Esta situação pode surgir se você tiver que fazer o downgrade de um pacote, ou se os autores mudarem o esquema de versionamento para arquivos de biblioteca.

- Se um pacote contendo uma biblioteca compartilhada for atualizado, e o nome da biblioteca não mudar, mas um problema grave (especialmente, uma vulnerabilidade de segurança) for corrigido, todos os programas em execução ligados à biblioteca compartilhada devem ser reiniciados. O seguinte comando, executado como root após a conclusão da atualização, listará quais processos estão usando as versões antigas dessas bibliotecas (substitua libfoo pelo nome da biblioteca): grep -l 'libfoo.*deleted' /proc/*/maps | tr -cd 0-9\\n | xargs -r ps u Se o OpenSSH estiver sendo usado para acessar o sistema e estiver ligado à biblioteca atualizada, você deve reiniciar o serviço sshd, então fazer logout, fazer login novamente e executar o comando anterior novamente para confirmar que nada ainda está usando as bibliotecas excluídas. Se o daemon systemd (executando como PID 1) estiver ligado à biblioteca atualizada, você pode reiniciá-lo sem reiniciar o sistema executando systemctl daemon-reexec como usuário root.

```bash
grep -l 'libfoo.*deleted' /proc/*/maps | tr -cd 0-9\\n | xargs -r ps u
```

- Se um programa executável ou uma biblioteca compartilhada for sobrescrito, os processos usando o código ou dados nesse programa ou biblioteca podem falhar. A maneira correta de atualizar um programa ou uma biblioteca compartilhada sem causar a falha do processo é removê-lo primeiro, depois instalar a nova versão. O comando install fornecido pelo coreutils já implementou isso, e a maioria dos pacotes usa esse comando para instalar arquivos binários e bibliotecas. Isso significa que você não será incomodado por este problema na maioria das vezes. No entanto, o processo de instalação de alguns pacotes (notavelmente SpiderMonkey no BLFS) simplesmente sobrescreve o arquivo se ele existe; isso causa uma falha. Portanto, é mais seguro salvar seu trabalho e fechar processos em execução desnecessários antes de atualizar um pacote.

## 8.2.2. Técnicas de Gerenciamento de Pacotes

As seguintes são algumas técnicas comuns de gerenciamento de pacotes. Antes de tomar uma decisão sobre um gerenciador de pacotes, faça alguma pesquisa sobre as várias técnicas, particularmente as desvantagens de cada esquema específico.

### 8.2.2.1. Está Tudo na Minha Cabeça!

Sim, esta é uma técnica de gerenciamento de pacotes. Algumas pessoas não precisam de um gerenciador de pacotes porque conhecem os pacotes intimamente e sabem quais arquivos são instalados por cada pacote. Alguns usuários também não precisam de gerenciamento de pacotes porque planejam reconstruir o sistema inteiro sempre que um pacote é alterado.

### 8.2.2.2. Instalar em Diretórios Separados

Esta é uma técnica simplista de gerenciamento de pacotes que não precisa de um programa especial para gerenciar os pacotes. Cada pacote é instalado em um diretório separado. Por exemplo, o pacote foo-1.1 é instalado em /opt/foo-1.1 e um symlink é criado de /opt/foo para /opt/foo-1.1. Quando uma nova versão foo-1.2 surge, ela é instalada em /opt/foo-1.2 e o symlink anterior é substituído por um symlink para a nova versão.

Variáveis de ambiente como PATH, MANPATH, INFOPATH, PKG_CONFIG_PATH, CPPFLAGS, LDFLAGS e o arquivo de configuração /etc/ld.so.conf podem precisar ser expandidas para incluir os subdiretórios correspondentes em /opt/foo-x.y.

Este esquema é usado pelo livro BLFS para instalar alguns pacotes muito grandes para facilitar a atualização deles. Se você instalar mais do que alguns pacotes, este esquema se torna incontrolável. E alguns pacotes (por exemplo, cabeçalhos da API Linux e Glibc) podem não funcionar bem com este esquema. Nunca use este esquema em todo o sistema.

### 8.2.2.3. Gerenciamento de Pacotes Estilo Symlink

Esta é uma variação da técnica de gerenciamento de pacotes anterior. Cada pacote é instalado como no esquema anterior. Mas em vez de criar o symlink via um nome de pacote genérico, cada arquivo é ligado simbolicamente na hierarquia /usr. Isso remove a necessidade de expandir as variáveis de ambiente. Embora os symlinks possam ser criados pelo usuário, muitos gerenciadores de pacotes usam esta abordagem e automatizam a criação dos symlinks. Alguns dos populares incluem Stow, Epkg, Graft e Depot.

O script de instalação precisa ser enganado, para que o pacote pense que está instalado em /usr embora na realidade esteja instalado na hierarquia /usr/pkg. Instalar desta maneira geralmente não é uma tarefa trivial. Por exemplo, suponha que você esteja instalando um pacote libfoo-1.1. As seguintes instruções podem não instalar o pacote corretamente:

```bash
./configure --prefix=/usr/pkg/libfoo/1.1
make
make install
```

A instalação funcionará, mas os pacotes dependentes podem não se ligar a libfoo como você esperaria. Se você compilar um pacote que se liga a libfoo, você pode notar que ele está ligado a /usr/pkg/libfoo/1.1/lib/libfoo.so.1 em vez de /usr/lib/libfoo.so.1 como você esperaria. A abordagem correta é usar a variável DESTDIR para direcionar a instalação. Esta abordagem funciona da seguinte forma:

```bash
./configure --prefix=/usr
make
make DESTDIR=/usr/pkg/libfoo/1.1 install
```

A maioria dos pacotes suporta esta abordagem, mas há alguns que não. Para os pacotes não-conformes, você pode precisar instalar o pacote manualmente, ou você pode achar mais fácil instalar alguns pacotes problemáticos em /opt.

### 8.2.2.4. Baseado em Carimbo de Data/Hora

Nesta técnica, um arquivo recebe um carimbo de data/hora antes da instalação do pacote. Após a instalação, um uso simples do comando find com as opções apropriadas pode gerar um log de todos os arquivos instalados após a criação do arquivo de carimbo de data/hora. Um gerenciador de pacotes que usa esta abordagem é o install-log.

Embora este esquema tenha a vantagem de ser simples, ele tem duas desvantagens. Se, durante a instalação, os arquivos forem instalados com qualquer carimbo de data/hora diferente do horário atual, esses arquivos não serão rastreados pelo gerenciador de pacotes. Além disso, este esquema só pode ser usado quando os pacotes são instalados um de cada vez. Os logs não são confiáveis se dois pacotes forem instalados simultaneamente de dois consoles diferentes.

### 8.2.2.5. Rastreando Scripts de Instalação

Nesta abordagem, os comandos que os scripts de instalação executam são registrados. Existem duas técnicas que podem ser usadas:

A variável de ambiente LD_PRELOAD pode ser definida para apontar para uma biblioteca a ser pré-carregada antes da instalação. Durante a instalação, esta biblioteca rastreia os pacotes que estão sendo instalados, anexando-se a vários executáveis como cp, install, mv e rastreando as chamadas de sistema que modificam o sistema de arquivos. Para que esta abordagem funcione, todos os executáveis precisam ser ligados dinamicamente sem o bit suid ou sgid. O pré-carregamento da biblioteca pode causar alguns efeitos colaterais indesejados durante a instalação. Portanto, é uma boa ideia realizar alguns testes para garantir que o gerenciador de pacotes não quebre nada e que ele registre todos os arquivos apropriados.

Outra técnica é usar strace, que registra todas as chamadas de sistema feitas durante a execução dos scripts de instalação.

### 8.2.2.6. Criando Arquivos de Pacotes

Neste esquema, a instalação do pacote é simulada em uma árvore separada conforme descrito anteriormente na seção de gerenciamento de pacotes estilo symlink. Após a instalação, um arquivo de pacote é criado usando os arquivos instalados. Este arquivo é então usado para instalar o pacote na máquina local ou mesmo em outras máquinas.

Esta abordagem é usada pela maioria dos gerenciadores de pacotes encontrados nas distribuições comerciais. Exemplos de gerenciadores de pacotes que seguem esta abordagem são RPM (que, incidentalmente, é exigido pela [Especificação Linux Standard Base](https://refspecs.linuxfoundation.org/lsb.shtml)), pkg-utils, apt do Debian e o sistema Portage do Gentoo. Uma dica descrevendo como adotar este estilo de gerenciamento de pacotes para sistemas LFS está localizada em [ https://www.linuxfromscratch.org/hints/downloads/files/fakeroot.txt](https://www.linuxfromscratch.org/hints/downloads/files/fakeroot.txt).

A criação de arquivos de pacotes que incluem informações de dependência é complexa e está além do escopo do LFS.

O Slackware usa um sistema baseado em tar para arquivos de pacotes. Este sistema propositalmente não lida com dependências de pacotes como gerenciadores de pacotes mais complexos fazem. Para detalhes sobre o gerenciamento de pacotes do Slackware, consulte [https://www.slackbook.org/html/package-management.html](https://www.slackbook.org/html/package-management.html).

### 8.2.2.7. Gerenciamento Baseado no Usuário

Este esquema, único ao LFS, foi desenvolvido por Matthias Benkmann e está disponível no [Projeto Dicas](https://www.linuxfromscratch.org/hints/downloads/files/). Neste esquema, cada package é instalado como um usuário separado nos locais padrão. Arquivos pertencentes a um package são facilmente identificados verificando o ID do usuário. As características e deficiências desta abordagem são muito complexas para serem descritas nesta seção. Para os detalhes, consulte a dica em [ https://www.linuxfromscratch.org/hints/downloads/files/more_control_and_pkg_man.txt](https://www.linuxfromscratch.org/hints/downloads/files/more_control_and_pkg_man.txt).

## 8.2.3. Implantação do LFS em Múltiplos Sistemas

Uma das vantagens de um sistema LFS é que não há arquivos que dependam da posição dos arquivos em um sistema de disco. Clonar um build LFS para outro computador com a mesma arquitetura que o sistema base é tão simples quanto usar tar na partição LFS que contém o diretório raiz (cerca de 900MB descompactados para um build LFS básico), copiar esse arquivo via transferência de rede ou CD-ROM / pendrive para o novo sistema e expandi-lo. Depois disso, alguns arquivos de configuração precisarão ser alterados. Arquivos de configuração que podem precisar ser atualizados incluem: /etc/hosts, /etc/fstab, /etc/passwd, /etc/group, /etc/shadow e /etc/ld.so.conf.

Um kernel customizado pode ser necessário para o novo sistema, dependendo das diferenças no hardware do sistema e da configuração original do kernel.

### Importante

Se você deseja implantar o sistema LFS em um sistema com uma CPU diferente, ao buildar [Seção 8.21, “GMP-6.3.0”](#/page/chapter08__gmp) e [Seção 8.50, “Libffi-3.5.2”](#/page/chapter08__libffi), você deve seguir as notas sobre a substituição da otimização específica da arquitetura para produzir bibliotecas adequadas tanto para o sistema host quanto para o(s) sistema(s) onde você implantará o sistema LFS. Caso contrário, você receberá erros de Instrução Ilegal ao executar o LFS.

Finalmente, o novo sistema deve ser tornado inicializável via [Seção 10.4, “Usando GRUB para Configurar o Processo de Inicialização”](#/page/chapter10__grub).

[1] O nome de uma biblioteca compartilhada é a string codificada na entrada DT_SONAME de sua seção dinâmica ELF. Você pode obtê-lo com o comando readelf -d <library file> | grep SONAME. Na maioria dos casos, ele é sufixado com .so.<um número de versão>, mas há alguns casos em que ele contém múltiplos números para versionamento (como libbz2.so.1.0), contém o número de versão antes do sufixo .so (como libbfd-2.45), ou não contém nenhum número de versão (por exemplo, libmemusage.so). Geralmente não há correlação entre a versão do package e o(s) número(s) de versão no nome da biblioteca.

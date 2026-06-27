# 9.10. Uso e Configuração do Systemd

## 9.10.1. Configuração Básica

O arquivo /etc/systemd/system.conf contém um conjunto de opções para controlar operações básicas do systemd. O arquivo padrão tem todas as entradas comentadas com as configurações padrão indicadas. Este arquivo é onde o nível de log pode ser alterado, assim como algumas configurações básicas de log. Consulte a página de manual systemd-system.conf(5) para detalhes sobre cada opção de configuração.

## 9.10.2. Desativando a Limpeza da Tela na Inicialização

O comportamento normal do systemd é limpar a tela ao final da sequência de inicialização. Se desejado, este comportamento pode ser alterado executando o seguinte comando:

```bash
mkdir -pv /etc/systemd/system/getty@tty1.service.d

cat > /etc/systemd/system/getty@tty1.service.d/noclear.conf << EOF
[Service]
TTYVTDisallocate=no
EOF
```

As mensagens de inicialização podem sempre ser revisadas usando o comando journalctl -b como usuário root.

## 9.10.3. Desativando tmpfs para /tmp

Por padrão, /tmp é criado como um tmpfs. Se isso não for desejado, pode ser sobrescrito executando o seguinte comando:

```bash
ln -sfv /dev/null /etc/systemd/system/tmp.mount
```

Alternativamente, se uma partição separada para /tmp for desejada, especifique essa partição em uma entrada de /etc/fstab.

### Aviso

Não crie o link simbólico acima se uma partição separada for usada para /tmp. Isso impedirá que o sistema de arquivos raiz (/) seja remontado como r/w e tornará o sistema inutilizável quando inicializado.

## 9.10.4. Configurando a Criação e Exclusão Automática de Arquivos

Existem vários serviços que criam ou excluem arquivos ou diretórios:

- systemd-tmpfiles-clean.service

- systemd-tmpfiles-setup-dev.service

- systemd-tmpfiles-setup.service

O local do sistema para os arquivos de configuração é /usr/lib/tmpfiles.d/*.conf. Os arquivos de configuração locais estão em /etc/tmpfiles.d. Arquivos em /etc/tmpfiles.d sobrescrevem arquivos com o mesmo nome em /usr/lib/tmpfiles.d. Consulte a página de manual tmpfiles.d(5) para detalhes do formato do arquivo.

Observe que a sintaxe para os arquivos /usr/lib/tmpfiles.d/*.conf pode ser confusa. Por exemplo, a exclusão padrão de arquivos no diretório /tmp está localizada em /usr/lib/tmpfiles.d/tmp.conf com a linha:

```
q /tmp 1777 root root 10d
```

O campo de tipo, q, indica a criação de um subvolume com quotas, o que é realmente aplicável apenas a sistemas de arquivos btrfs. Ele referencia o tipo v, que por sua vez referencia o tipo d (diretório). Isso então cria o diretório especificado se não estiver presente e ajusta as permissões e a propriedade conforme especificado. O conteúdo do diretório estará sujeito à limpeza baseada em tempo se o argumento age for especificado.

Se os parâmetros padrão não forem desejados, então o arquivo deve ser copiado para /etc/tmpfiles.d e editado conforme desejado. Por exemplo:

```bash
mkdir -p /etc/tmpfiles.d
cp /usr/lib/tmpfiles.d/tmp.conf /etc/tmpfiles.d
```

## 9.10.5. Sobrescrevendo o Comportamento Padrão dos Serviços

Os parâmetros de uma unit podem ser sobrescritos criando um diretório e um arquivo de configuração em /etc/systemd/system. Por exemplo:

```bash
mkdir -pv /etc/systemd/system/foobar.service.d

cat > /etc/systemd/system/foobar.service.d/foobar.conf << EOF
[Service]
Restart=always
RestartSec=30
EOF
```

Consulte a página de manual systemd.unit(5) para mais informações. Após criar o arquivo de configuração, execute systemctl daemon-reload e systemctl restart foobar para ativar as mudanças em um serviço.

## 9.10.6. Depurando a Sequência de Inicialização

Em vez de scripts shell simples usados em sistemas init estilo SysVinit ou BSD, o systemd usa um formato unificado para diferentes tipos de arquivos de inicialização (ou units). O comando systemctl é usado para habilitar, desabilitar, controlar o estado e obter o status de arquivos de unit. Aqui estão alguns exemplos de comandos frequentemente usados:

- systemctl list-units -t <service> [--all]: lista arquivos de unit carregados do tipo service.

- systemctl list-units -t <target> [--all]: lista arquivos de unit carregados do tipo target.

- systemctl show -p Wants <multi-user.target>: mostra todas as units que dependem do target multi-user. Targets são arquivos de unit especiais que são análogos aos runlevels sob SysVinit.

- systemctl status <servicename.service>: mostra o status do serviço servicename. A extensão .service pode ser omitida se não houver outros arquivos de unit com o mesmo nome, como arquivos .socket (que criam um socket de escuta que fornece funcionalidade similar a inetd/xinetd).

## 9.10.7. Trabalhando com o Journal do Systemd

O registro (logging) em um sistema inicializado com systemd é tratado com systemd-journald (por padrão), em vez de um daemon syslog unix típico. Você também pode adicionar um daemon syslog normal e fazer com que ambos operem lado a lado, se desejado. O programa systemd-journald armazena entradas de journal em um formato binário, em vez de um arquivo de log de texto simples. Para auxiliar na análise do arquivo, o comando journalctl é fornecido. Aqui estão alguns exemplos de comandos frequentemente usados:

- journalctl -r: mostra todo o conteúdo do journal em ordem cronológica inversa.

- journalctl -u UNIT: mostra as entradas do journal associadas ao arquivo UNIT especificado.

- journalctl -b[=ID] -r: mostra as entradas do journal desde a última inicialização bem-sucedida (ou para o ID de inicialização) em ordem cronológica inversa.

- journalctl -f: fornece funcionalidade similar a tail -f (follow).

## 9.10.8. Trabalhando com Core Dumps

Core dumps são úteis para depurar programas que falharam, especialmente quando um processo daemon falha. Em sistemas inicializados com systemd, o core dumping é tratado por systemd-coredump. Ele registrará o core dump no journal e armazenará o core dump em /var/lib/systemd/coredump. Para recuperar e processar core dumps, a ferramenta coredumpctl é fornecida. Aqui estão alguns exemplos de comandos frequentemente usados:

- coredumpctl -r: lista todos os core dumps em ordem cronológica inversa.

- coredumpctl -1 info: mostra as informações do último core dump.

- coredumpctl -1 debug: carrega o último core dump no GDB.

Core dumps podem usar muito espaço em disco. O espaço máximo em disco usado por core dumps pode ser limitado criando um arquivo de configuração em /etc/systemd/coredump.conf.d. Por exemplo:

```bash
mkdir -pv /etc/systemd/coredump.conf.d

cat > /etc/systemd/coredump.conf.d/maxuse.conf << EOF
[Coredump]
MaxUse=5G
EOF
```

Consulte as páginas de manual systemd-coredump(8), coredumpctl(1) e coredump.conf.d(5) para mais informações.

## 9.10.9. Processos de Longa Duração

A partir do systemd-230, todos os processos de usuário são encerrados quando uma sessão de usuário é finalizada, mesmo que nohup seja usado, ou o processo utilize as funções daemon() ou setsid(). Esta é uma mudança intencional de um ambiente historicamente permissivo para um mais restritivo. O novo comportamento pode causar problemas se você depender de programas de longa duração (por exemplo, screen ou tmux) para permanecerem ativos após o término da sua sessão de usuário. Existem três maneiras de permitir que processos persistentes permaneçam ativos após o término de uma sessão de usuário.

- Habilitar persistência de processo apenas para usuários selecionados: Usuários normais têm permissão para habilitar a persistência de processo com o comando loginctl enable-linger para seu próprio usuário. Administradores de sistema podem usar o mesmo comando com um argumento de usuário para habilitar para um usuário. Esse usuário pode então usar o comando systemd-run para iniciar processos de longa duração. Por exemplo: systemd-run --scope --user /usr/bin/screen. Se você habilitar a persistência para seu usuário, o user@.service permanecerá mesmo após todas as sessões de login serem encerradas, e iniciará automaticamente na inicialização do sistema. Isso tem a vantagem de permitir e proibir explicitamente que processos sejam executados após o término da sessão do usuário, mas quebra a compatibilidade retroativa com ferramentas como nohup e utilitários que usam daemon().

- Habilitar persistência de processo em todo o sistema: Você pode definir KillUserProcesses=no em /etc/systemd/logind.conf para habilitar a persistência de processo globalmente para todos os usuários. Isso tem o benefício de deixar o método antigo disponível para todos os usuários à custa de um controle explícito.

- Desabilitar em tempo de build: Você pode desabilitar a persistência por padrão ao compilar o systemd adicionando a flag -D default-kill-user-processes=false ao comando meson para o systemd. Isso desabilita completamente a capacidade do systemd de encerrar processos de usuário no final da sessão.

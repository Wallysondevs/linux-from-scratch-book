# 8.76. Systemd-257.8

O pacote systemd contém programas para controlar a inicialização, execução e desligamento do sistema.

## 8.76.1. Instalação do systemd

Remova dois grupos desnecessários, render e sgx, das regras udev padrão:

```bash
sed -e 's/GROUP="render"/GROUP="video"/' \
    -e 's/GROUP="sgx", //'               \
    -i rules.d/50-udev-default.rules.in
```

Prepare o systemd para compilação:

```bash
mkdir -p build
cd       build

meson setup ..                \
      --prefix=/usr           \
      --buildtype=release     \
      -D default-dnssec=no    \
      -D firstboot=false      \
      -D install-tests=false  \
      -D ldconfig=false       \
      -D sysusers=false       \
      -D rpmmacrosdir=no      \
      -D homed=disabled       \
      -D userdb=false         \
      -D man=disabled         \
      -D mode=release         \
      -D pamconfdir=no        \
      -D dev-kvm-mode=0660    \
      -D nobody-group=nogroup \
      -D sysupdate=disabled   \
      -D ukify=disabled       \
      -D docdir=/usr/share/doc/systemd-257.8
```

O significado das opções do meson:

Esta opção substitui o buildtype padrão (“debug”), que produz binários não otimizados.

Esta opção desativa o suporte experimental a DNSSEC.

Esta opção impede a instalação de serviços systemd responsáveis pela configuração inicial do sistema. Estes não são úteis no LFS, porque tudo é feito manualmente.

Esta opção impede a instalação dos testes compilados.

Esta opção impede a instalação de uma unidade systemd que executa ldconfig na inicialização; isso não é útil para distribuições de código-fonte como o LFS, e torna o tempo de inicialização mais longo. Remova esta opção para habilitar a execução de ldconfig na inicialização.

Esta opção impede a instalação de serviços systemd responsáveis pela configuração dos arquivos /etc/group e /etc/passwd. Ambos os arquivos foram criados no capítulo anterior. Este daemon não é útil em um sistema LFS, uma vez que as contas de usuário são criadas manualmente.

Esta opção desabilita a instalação de RPM Macros para uso com systemd, porque o LFS não suporta RPM.

Remova dois daemons com dependências que não se encaixam no escopo do LFS.

Impeça a geração de man pages para evitar dependências extras. Instalaremos man pages pré-geradas para o systemd a partir de um tarball.

Desabilite alguns recursos considerados experimentais pelo upstream.

Impeça a instalação de um arquivo de configuração PAM não funcional no LFS.

A regra udev padrão permitiria que todos os usuários acessassem /dev/kvm. Os editores consideram isso perigoso. Esta opção a substitui.

Informe ao pacote que o nome do grupo com GID 65534 é nogroup.

Não instale a ferramenta systemd-sysupdate. Ela é projetada para atualizar automaticamente distribuições binárias, portanto, é inútil para um sistema Linux básico construído a partir do código-fonte. E ela reportará erros na inicialização se estiver habilitada, mas não configurada corretamente.

Não instale o script systemd-ukify. Em tempo de execução, este script requer o módulo Python pefile que nem LFS nem BLFS fornecem.

Compile o pacote:

```bash
ninja
```

Alguns testes precisam de um arquivo /etc/os-release básico. Para testar os resultados, execute:

```bash
echo 'NAME="Linux From Scratch"' > /etc/os-release
ninja test
```

Um teste chamado systemd:core / test-namespace é conhecido por falhar no ambiente chroot do LFS. Alguns outros testes podem falhar porque dependem de várias opções de configuração do kernel. O teste chamado systemd:test / test-copy pode atingir o tempo limite devido a um congestionamento de E/S com um grande número de jobs paralelos, mas passaria se executado sozinho com meson test test-copy.

Instale o pacote:

```bash
ninja install
```

Instale as man pages:

```bash
tar -xf ../../systemd-man-pages-257.8.tar.xz \
    --no-same-owner --strip-components=1     \
    -C /usr/share/man
```

Crie o arquivo /etc/machine-id necessário pelo systemd-journald:

```bash
systemd-machine-id-setup
```

Configure a estrutura básica de target:

```bash
systemctl preset-all
```

## 8.76.2. Conteúdo do systemd

### Descrições Breves

busctl

É usado para inspecionar e monitorar o barramento D-Bus

coredumpctl

É usado para recuperar coredumps do journal do systemd

halt

Normalmente invoca shutdown com a opção -h, exceto quando já em run-level 0, quando ele informa ao kernel para parar o sistema; ele registra no arquivo /var/log/wtmp que o sistema está sendo desligado

hostnamectl

É usado para consultar e alterar o hostname do sistema e configurações relacionadas

init

É o primeiro processo a ser iniciado após o kernel ter inicializado o hardware; init assume o processo de boot e inicia os processos especificados por seus arquivos de configuração; neste caso, ele inicia o systemd

journalctl

É usado para consultar o conteúdo do journal do systemd

kernel-install

É usado para adicionar e remover imagens de kernel e initramfs de e para /boot; no LFS, isso é feito manualmente

localectl

É usado para consultar e alterar as configurações de localidade do sistema e layout do teclado

loginctl

É usado para inspecionar e controlar o estado do Gerenciador de Login do systemd

machinectl

É usado para inspecionar e controlar o estado do Gerenciador de Registro de Máquinas Virtuais e Contêineres do systemd

networkctl

É usado para inspecionar e configurar o estado dos links de rede configurados pelo systemd-networkd

oomctl

Controla o daemon Out Of Memory do systemd

portablectl

É usado para anexar ou desanexar serviços portáteis do sistema local

poweroff

Instrui o kernel a parar o sistema e desligar o computador (veja halt)

reboot

Instrui o kernel a reiniciar o sistema (veja halt)

resolvconf

Registra a configuração de servidor DNS e domínio com systemd-resolved

resolvectl

Envia comandos de controle para o gerenciador de resolução de nomes de rede, ou resolve nomes de domínio, endereços IPv4 e IPv6, registros DNS e serviços

runlevel

Exibe o run-level anterior e o atual, conforme registrado no último registro de run-level em /run/utmp

shutdown

Desliga o sistema de forma segura, sinalizando todos os processos e notificando todos os usuários logados

systemctl

É usado para inspecionar e controlar o estado do gerenciador de sistema e serviço do systemd

systemd-ac-power

Informa se o sistema está conectado a uma fonte de energia externa.

systemd-analyze

É usado para analisar o desempenho da inicialização do sistema, bem como identificar unidades systemd problemáticas

systemd-ask-password

É usado para solicitar uma senha ou frase secreta do sistema ao usuário, usando uma mensagem especificada na linha de comando do Linux

systemd-cat

É usado para conectar as saídas STDOUT e STDERR de um processo ao journal do systemd

systemd-cgls

Mostra recursivamente o conteúdo da hierarquia do grupo de controle Linux selecionado em uma árvore

systemd-cgtop

Exibe os principais grupos de controle da hierarquia local de grupos de controle Linux, ordenados por suas cargas de CPU, memória e I/O de disco

systemd-creds

Exibe e processa credenciais

systemd-delta

É usado para identificar e comparar arquivos de configuração em /etc que sobrescrevem os padrões em /usr

systemd-detect-virt

Detecta se o sistema está sendo executado em um ambiente virtual e ajusta o udev de acordo

systemd-dissect

É usado para inspecionar imagens de disco de OS

systemd-escape

É usado para escapar strings para inclusão em nomes de unidades systemd

systemd-hwdb

É usado para gerenciar o banco de dados de hardware (hwdb)

systemd-id128

Gera e imprime strings id128 (UUID)

systemd-inhibit

É usado para executar um programa com um bloqueio inibidor de desligamento, suspensão ou inatividade ativado, impedindo uma ação como o desligamento do sistema até que o processo seja concluído

systemd-machine-id-setup

É usado por ferramentas de instalação do sistema para inicializar o ID da máquina armazenado em /etc/machine-id no momento da instalação com um ID gerado aleatoriamente

systemd-mount

É usado para montar temporariamente ou automontar discos

systemd-notify

É usado por scripts de daemon para notificar o sistema init sobre mudanças de status

systemd-nspawn

É usado para executar um comando, ou um OS inteiro, em um contêiner de namespace leve

systemd-path

É usado para consultar caminhos de sistema e de usuário

systemd-repart

É usado para expandir e adicionar partições a uma tabela de partições quando o systemd é usado com uma imagem de OS (ex: um contêiner)

systemd-resolve

É usado para resolver nomes de domínio, endereços IPV4 e IPv6, registros de recurso DNS e serviços

systemd-run

É usado para criar e iniciar uma unidade .service ou .scope transiente e executar o comando especificado nela; isso é útil para validar unidades systemd

systemd-socket-activate

É usado para escutar em dispositivos de socket e iniciar um processo após uma conexão bem-sucedida ao socket

systemd-sysext

Ativa imagens de extensão do sistema

systemd-tmpfiles

Cria, exclui e limpa arquivos e diretórios voláteis e temporários, com base no formato e localização do arquivo de configuração especificados nos diretórios tmpfiles.d

systemd-umount

Desmonta pontos de montagem

systemd-tty-ask-password-agent

É usado para listar e/ou processar requisições de senha pendentes do systemd

telinit

Informa ao init para qual nível de execução mudar

timedatectl

É usado para consultar e alterar o relógio do sistema e suas configurações

udevadm

É uma ferramenta genérica de administração do udev que controla o daemon udevd, fornece informações do banco de dados de hardware do udev, monitora uevents, espera que os uevents terminem, testa a configuração do udev e dispara uevents para um determinado dispositivo

libsystemd

É a principal biblioteca de utilitários do systemd

libudev

É uma biblioteca para acessar informações de dispositivo do Udev

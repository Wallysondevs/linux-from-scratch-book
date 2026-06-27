# 8.80. Util-linux-2.41.1

O pacote Util-linux contém diversos programas utilitários. Entre eles estão utilitários para lidar com sistemas de arquivos, consoles, partições e mensagens.

## 8.80.1. Instalação do Util-linux

Prepare o Util-linux para compilação:

```bash
./configure --bindir=/usr/bin     \
            --libdir=/usr/lib     \
            --runstatedir=/run    \
            --sbindir=/usr/sbin   \
            --disable-chfn-chsh   \
            --disable-login       \
            --disable-nologin     \
            --disable-su          \
            --disable-setpriv     \
            --disable-runuser     \
            --disable-pylibmount  \
            --disable-liblastlog2 \
            --disable-static      \
            --without-python      \
            ADJTIME_PATH=/var/lib/hwclock/adjtime \
            --docdir=/usr/share/doc/util-linux-2.41.1
```

As opções --disable e --without evitam avisos sobre a construção de componentes que exigem pacotes não presentes no LFS, ou que são inconsistentes com programas instalados por outros pacotes.

Compile o pacote:

```bash
make
```

Se desejar, crie um arquivo /etc/fstab fictício para satisfazer dois testes e execute a suíte de testes como um usuário não-root:

### Aviso

Executar a suíte de testes como usuário root pode ser prejudicial ao seu sistema. Para executá-la, a opção CONFIG_SCSI_DEBUG para o kernel deve estar disponível no sistema em execução e deve ser construída como um módulo. Construí-la diretamente no kernel impedirá a inicialização. Para cobertura completa, outros pacotes BLFS devem ser instalados. Se desejar, este teste pode ser executado inicializando o sistema LFS concluído e executando:

```bash
bash tests/run.sh --srcdir=$PWD --builddir=$PWD
```

```bash
touch /etc/fstab
chown -R tester .
su tester -c "make -k check"
```

Os testes de hardlink falharão se o kernel do host não tiver a opção CONFIG_CRYPTO_USER_API_HASH habilitada ou não tiver nenhuma opção que forneça uma implementação SHA256 (por exemplo, CONFIG_CRYPTO_SHA256, ou CONFIG_CRYPTO_SHA256_SSSE3 se a CPU suportar Supplemental SSE3) habilitada. Além disso, o teste lsfd: inotify falhará se a opção do kernel CONFIG_NETLINK_DIAG não estiver habilitada.

Um teste, kill: decode functions, é conhecido por falhar com bash-5.3-rc1 ou mais recente.

Instale o pacote:

```bash
make install
```

## 8.80.2. Conteúdo do Util-linux

### Descrições Breves

addpart

Informa o kernel Linux sobre novas partições

agetty

Abre uma porta tty, solicita um nome de login e então invoca o programa login

blkdiscard

Descarta setores em um dispositivo

blkid

Um utilitário de linha de comando para localizar e imprimir atributos de dispositivos de bloco

blkzone

É usado para gerenciar dispositivos de bloco de armazenamento zonado

blockdev

Permite aos usuários chamar ioctls de dispositivos de bloco a partir da linha de comando

cal

Exibe um calendário simples

cfdisk

Manipula a tabela de partições do dispositivo fornecido

chcpu

Modifica o estado das CPUs

chmem

Configura a memória

choom

Exibe e ajusta as pontuações do OOM-killer, usadas para determinar qual processo matar primeiro quando o Linux está sem memória (Out Of Memory)

chrt

Manipula atributos de tempo real de um processo

col

Filtra retrocessos de linha

colcrt

Filtra a saída nroff para terminais que não possuem algumas capacidades, como sobreposição de caracteres e meias-linhas

colrm

Filtra as colunas especificadas

column

Formata um arquivo especificado em múltiplas colunas

ctrlaltdel

Define a função da combinação de teclas Ctrl+Alt+Del para um reset físico (hard reset) ou lógico (soft reset)

delpart

Solicita ao kernel Linux que remova uma partição

dmesg

Exibe as mensagens de inicialização do kernel

eject

Ejeta mídia removível

fallocate

Pré-aloca espaço para um arquivo

fdisk

Manipula a tabela de partições do dispositivo especificado

fincore

Conta páginas de conteúdo de arquivo na memória principal

findfs

Encontra um sistema de arquivos, seja por rótulo ou por Identificador Universalmente Único (UUID)

findmnt

É uma interface de linha de comando para a biblioteca libmount para trabalhar com arquivos mountinfo, fstab e mtab

flock

Adquire um bloqueio de arquivo e então executa um comando com o bloqueio mantido

fsck

É usado para verificar e, opcionalmente, reparar sistemas de arquivos

fsck.cramfs

Realiza uma verificação de consistência no sistema de arquivos Cramfs no dispositivo especificado

fsck.minix

Realiza uma verificação de consistência no sistema de arquivos Minix no dispositivo especificado

fsfreeze

É um invólucro (wrapper) muito simples para operações de driver de kernel ioctl FIFREEZE/FITHAW

fstrim

Descarta blocos não utilizados em um sistema de arquivos montado

getopt

Analisa opções na linha de comando especificada

hardlink

Consolida arquivos duplicados criando hard links

hexdump

Despeja o arquivo fornecido em hexadecimal, decimal, octal ou ascii

hwclock

Lê ou define o relógio de hardware do sistema, também conhecido como Relógio de Tempo Real (RTC) ou relógio do Sistema Básico de Entrada/Saída (BIOS)

i386

Um link simbólico para setarch

ionice

Obtém ou define a classe de agendamento de E/S e a prioridade para um programa

ipcmk

Cria vários recursos IPC

ipcrm

Remove o recurso de Comunicação Entre Processos (IPC) fornecido

ipcs

Fornece informações de status IPC

irqtop

Exibe informações do contador de interrupções do kernel em uma visualização estilo top(1)

isosize

Informa o tamanho de um sistema de arquivos iso9660

kill

Envia sinais para processos

last

Mostra quais usuários fizeram login (e logout) pela última vez, pesquisando no arquivo /var/log/wtmp; também mostra inicializações do sistema, desligamentos e mudanças de nível de execução

lastb

Mostra as tentativas de login falhas, conforme registrado em /var/log/btmp

ldattach

Anexa uma disciplina de linha a uma linha serial

linux32

Um link simbólico para setarch

linux64

Um link simbólico para setarch

logger

Insere a mensagem fornecida no log do sistema

look

Exibe linhas que começam com a string fornecida

losetup

Configura e controla dispositivos de loop

lsblk

Lista informações sobre todos ou dispositivos de bloco selecionados em formato de árvore

lscpu

Imprime informações da arquitetura da CPU

lsfd

Exibe informações sobre arquivos abertos; substitui lsof

lsipc

Imprime informações sobre facilidades IPC atualmente empregadas no sistema

lsirq

Exibe informações do contador de interrupções do kernel

lslocks

Lista bloqueios do sistema local

lslogins

Lista informações sobre usuários, grupos e contas de sistema

lsmem

Lista os intervalos de memória disponível com seu status online

lsns

Lista namespaces

mcookie

Gera magic cookies (números hexadecimais aleatórios de 128 bits) para xauth

mesg

Controla se outros usuários podem enviar mensagens para o terminal do usuário atual

mkfs

Constrói um sistema de arquivos em um dispositivo (geralmente uma partição de disco rígido)

mkfs.bfs

Cria um sistema de arquivos bfs da Santa Cruz Operations (SCO)

mkfs.cramfs

Cria um sistema de arquivos cramfs

mkfs.minix

Cria um sistema de arquivos Minix

mkswap

Inicializa o dispositivo ou arquivo fornecido para ser usado como área de swap

more

Um filtro para paginar texto uma tela por vez

mount

Anexa o sistema de arquivos no dispositivo fornecido a um diretório especificado na árvore do sistema de arquivos

mountpoint

Verifica se o diretório é um mountpoint

namei

Mostra os links simbólicos nos caminhos fornecidos

nsenter

Executa um programa com namespaces de outros processos

partx

Informa ao kernel sobre a presença e numeração de partições em disco

pivot_root

Torna o sistema de arquivos fornecido o novo sistema de arquivos raiz do processo atual

prlimit

Obtém e define os limites de recursos de um processo

readprofile

Lê informações de perfil do kernel

rename

Renomeia os arquivos fornecidos, substituindo uma string fornecida por outra

renice

Altera a prioridade de processos em execução

resizepart

Solicita ao kernel Linux para redimensionar uma partição

rev

Inverte as linhas de um arquivo fornecido

rfkill

Ferramenta para habilitar e desabilitar dispositivos sem fio

rtcwake

Usado para entrar em um estado de suspensão do sistema até o horário de despertar especificado

script

Cria um typescript de uma sessão de terminal

scriptlive

Reexecuta typescripts de sessão usando informações de tempo

scriptreplay

Reproduz typescripts usando informações de tempo

setarch

Altera a arquitetura reportada em um novo ambiente de programa, e define flags de personalidade

setsid

Executa o programa fornecido em uma nova sessão

setterm

Define atributos de terminal

sfdisk

Um manipulador de tabela de partição de disco

sulogin

Permite que o root faça login; é normalmente invocado por init quando o sistema entra em modo de usuário único

swaplabel

Faz alterações no UUID e rótulo da área de swap

swapoff

Desabilita dispositivos e arquivos para paginação e swapping

swapon

Habilita dispositivos e arquivos para paginação e swapping, e lista os dispositivos e arquivos atualmente em uso

switch_root

Muda para outro sistema de arquivos como a raiz da árvore de montagem

taskset

Recupera ou define a afinidade de CPU de um processo

uclampset

Manipula os atributos de limitação de utilização do sistema ou de um processo

ul

Um filtro para traduzir sublinhados em sequências de escape que indicam sublinhado para o terminal em uso

umount

Desconecta um sistema de arquivos da árvore de arquivos do sistema

uname26

Um link simbólico para setarch

unshare

Executa um programa com alguns namespaces não compartilhados do pai

utmpdump

Exibe o conteúdo do arquivo de login fornecido em um formato amigável ao usuário

uuidd

Um daemon usado pela biblioteca UUID para gerar UUIDs baseados em tempo de forma segura e com unicidade garantida

uuidgen

Cria novos UUIDs. Cada novo UUID é um número aleatório com alta probabilidade de ser único entre todos os UUIDs criados, no sistema local e em outros sistemas, no passado e no futuro, com probabilidade extremamente alta (2128 UUIDs são possíveis)

uuidparse

Um utilitário para analisar identificadores únicos

wall

Exibe o conteúdo de um arquivo ou, por padrão, sua entrada padrão, nos terminais de todos os usuários atualmente logados

wdctl

Mostra o status do watchdog de hardware

whereis

Reporta a localização dos arquivos binários, de código-fonte e de página de manual para o comando fornecido

wipefs

Apaga uma assinatura de sistema de arquivos de um dispositivo

x86_64

Um link simbólico para setarch

zramctl

Um programa para configurar e controlar dispositivos zram (disco RAM compactado)

libblkid

Contém rotinas para identificação de dispositivos e extração de tokens

libfdisk

Contém rotinas para manipular tabelas de partição

libmount

Contém rotinas para montagem e desmontagem de dispositivos de bloco

libsmartcols

Contém rotinas para auxiliar a saída de tela em formato tabular

libuuid

Contém rotinas para gerar identificadores únicos para objetos que podem ser acessíveis além do sistema local

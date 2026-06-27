# 8.79. Procps-ng-4.0.5

O pacote Procps-ng contém programas para monitoramento de processos.

## 8.79.1. Instalação do Procps-ng

Prepare o Procps-ng para compilação:

```bash
./configure --prefix=/usr                           \
            --docdir=/usr/share/doc/procps-ng-4.0.5 \
            --disable-static                        \
            --disable-kill                          \
            --enable-watch8bit                      \
            --with-systemd
```

O significado da opção configure:

Esta chave desabilita a construção do comando kill; ele será instalado a partir do pacote Util-linux.

Esta chave habilita o suporte ncursesw para o comando watch, para que ele possa lidar com caracteres de 8 bits.

Compile o pacote:

```bash
make
```

Para executar a suíte de testes, execute:

```bash
chown -R tester .
su tester -c "PATH=$PATH make check"
```

Um teste chamado ps com as flags de saída bsdtime,cputime,etime,etimes é conhecido por falhar se o kernel host não for construído com CONFIG_BSD_PROCESS_ACCT habilitado. Além disso, um teste pgrep pode falhar no ambiente chroot.

Instale o pacote:

```bash
make install
```

## 8.79.2. Conteúdo do Procps-ng

### Descrições Breves

free

Informa a quantidade de memória livre e usada (tanto memória física quanto de swap) no sistema

pgrep

Procura processos com base em seu nome e outros atributos

pidof

Informa os PIDs dos programas fornecidos

pkill

Envia sinais a processos com base em seu nome e outros atributos

pmap

Informa o mapa de memória do processo fornecido

ps

Lista os processos em execução atualmente

pwdx

Informa o diretório de trabalho atual de um processo

slabtop

Exibe informações detalhadas do cache slab do kernel em tempo real

sysctl

Modifica parâmetros do kernel em tempo de execução

tload

Imprime um gráfico da média de carga atual do sistema

top

Exibe uma lista dos processos mais intensivos em CPU; ele fornece uma visão contínua da atividade do processador em tempo real

uptime

Informa há quanto tempo o sistema está em execução, quantos usuários estão logados, e as médias de carga do sistema

vmstat

Informa estatísticas de memória virtual, fornecendo informações sobre processos, memória, paginação, Input/Output (IO) de bloco, traps e atividade da CPU

w

Mostra quais usuários estão logados atualmente, onde, e desde quando

watch

Executa um comando dado repetidamente, exibindo a primeira tela cheia de sua saída; isso permite que um usuário observe a saída mudar ao longo do tempo

libproc-2

Contém as funções usadas pela maioria dos programas neste pacote

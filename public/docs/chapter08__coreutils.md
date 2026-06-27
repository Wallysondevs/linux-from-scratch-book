# 8.59. Coreutils-9.7

O pacote Coreutils contém os programas utilitários básicos necessários por todo sistema operacional.

## 8.59.1. Instalação do Coreutils

Primeiro, aplique um patch para um problema de segurança identificado upstream:

```bash
patch -Np1 -i ../coreutils-9.7-upstream_fix-1.patch
```

O POSIX exige que programas do Coreutils reconheçam os limites de caracteres corretamente mesmo em localidades multibyte. O patch a seguir corrige esta não conformidade e outros bugs relacionados à internacionalização.

```bash
patch -Np1 -i ../coreutils-9.7-i18n-1.patch
```

### Nota

Muitos bugs foram encontrados neste patch. Ao relatar novos bugs aos mantenedores do Coreutils, verifique primeiro se esses bugs são reproduzíveis sem este patch.

Agora prepare o Coreutils para compilação:

```bash
autoreconf -fv
automake -af
FORCE_UNSAFE_CONFIGURE=1 ./configure \
            --prefix=/usr            \
            --enable-no-install-program=kill,uptime
```

O significado dos comandos e opções de configure:

O patch para internacionalização modificou o sistema de build, então os arquivos de configuração devem ser regenerados. Normalmente usaríamos a opção -i para atualizar os arquivos auxiliares padrão, mas para este pacote não funciona porque configure.ac especificou uma versão antiga do gettext.

Os arquivos auxiliares do automake não foram atualizados pelo autoreconf devido à opção -i ausente. Este comando os atualiza para evitar uma falha de build.

Esta variável de ambiente permite que o pacote seja built pelo usuário root.

O propósito desta chave é evitar que o Coreutils instale programas que serão instalados por outros pacotes.

Compile o pacote:

```bash
make
```

Pule para “Instalar o pacote” se não estiver executando a suíte de testes.

Agora a suíte de testes está pronta para ser executada. Primeiro, execute os testes que devem ser executados como usuário root:

```bash
make NON_ROOT_USERNAME=tester check-root
```

Vamos executar o restante dos testes como o usuário tester. Certos testes exigem que o usuário seja membro de mais de um grupo. Para que esses testes não sejam ignorados, adicione um grupo temporário e torne o usuário tester parte dele:

```bash
groupadd -g 102 dummy -U tester
```

Corrija algumas das permissões para que o usuário não-root possa compilar e executar os testes:

```bash
chown -R tester . 
```

Agora execute os testes (usando /dev/null para a entrada padrão, ou dois testes podem ser quebrados se estiver fazendo o build do LFS em um terminal gráfico ou uma sessão em SSH ou GNU Screen porque a entrada padrão está conectada a um PTY da distro host, e o nó do dispositivo para tal PTY não pode ser acessado do ambiente chroot do LFS):

```bash
su tester -c "PATH=$PATH make -k RUN_EXPENSIVE_TESTS=yes check" \
   < /dev/null
```

Remova o grupo temporário:

```bash
groupdel dummy
```

Instale o pacote:

```bash
make install
```

Mova os programas para os locais especificados pelo FHS:

```bash
mv -v /usr/bin/chroot /usr/sbin
mv -v /usr/share/man/man1/chroot.1 /usr/share/man/man8/chroot.8
sed -i 's/"1"/"8"/' /usr/share/man/man8/chroot.8
```

## 8.59.2. Conteúdo do Coreutils

### Descrições Breves

[

É um comando real, /usr/bin/[; é um sinônimo para o comando test

base32

Codifica e decodifica dados de acordo com a especificação base32 (RFC 4648)

base64

Codifica e decodifica dados de acordo com a especificação base64 (RFC 4648)

b2sum

Imprime ou verifica checksums BLAKE2 (512-bit)

basename

Remove qualquer path e um sufixo dado de um nome de arquivo

basenc

Codifica ou decodifica dados usando vários algoritmos

cat

Concatena arquivos para a saída padrão

chcon

Altera o contexto de segurança para arquivos e diretórios

chgrp

Altera a propriedade de grupo de arquivos e diretórios

chmod

Altera as permissões de cada arquivo para o modo especificado; o modo pode ser uma representação simbólica das alterações a serem feitas, ou um número octal representando as novas permissões

chown

Altera a propriedade de usuário e/ou grupo de arquivos e diretórios

chroot

Executa um comando com o diretório especificado como o diretório /

cksum

Exibe o checksum de Cyclic Redundancy Check (CRC) e a contagem de bytes de cada arquivo especificado

comm

Compara dois arquivos ordenados, exibindo em três colunas as linhas que são únicas e as linhas que são comuns

cp

Copia arquivos

csplit

Divide um arquivo dado em vários novos arquivos, separando-os de acordo com padrões ou números de linha especificados, e exibindo a contagem de bytes de cada novo arquivo

cut

Exibe seções de linhas, selecionando as partes de acordo com campos ou posições especificadas

date

Exibe a data e hora atuais no formato especificado, ou define a data e hora do sistema

dd

Copia um arquivo usando o tamanho de bloco e a contagem especificados, enquanto opcionalmente realiza conversões nele

df

Informa a quantidade de espaço em disco disponível (e usado) em todos os sistemas de arquivos montados, ou apenas nos sistemas de arquivos que contêm os arquivos selecionados

dir

Lista o conteúdo de cada diretório especificado (o mesmo que o comando ls)

dircolors

Exibe comandos para definir a variável de ambiente LS_COLOR para alterar o esquema de cores usado por ls

dirname

Extrai a(s) porção(ões) de diretório do(s) nome(s) especificado(s)

du

Informa a quantidade de espaço em disco usado pelo diretório atual, por cada um dos diretórios especificados (incluindo todos os subdiretórios) ou por cada um dos arquivos especificados

echo

Exibe as strings especificadas

env

Executa um comando em um ambiente modificado

expand

Converte tabulações em espaços

expr

Avalia expressões

factor

Imprime os fatores primos dos inteiros especificados

false

Não faz nada, sem sucesso; ele sempre sai com um código de status indicando falha

fmt

Reformatar os parágrafos nos arquivos fornecidos

fold

Quebra as linhas nos arquivos fornecidos

groups

Reporta as associações de grupo de um usuário

head

Imprime as dez primeiras linhas (ou o número de linhas fornecido) de cada arquivo dado

hostid

Reporta o identificador numérico (em hexadecimal) do host

id

Reporta o ID de usuário efetivo, ID de grupo e associações de grupo do usuário atual ou do usuário especificado

install

Copia arquivos enquanto define seus modos de permissão e, se possível, seu proprietário e grupo

join

Une as linhas que possuem campos de união idênticos de dois arquivos separados

link

Cria um hard link (com o nome fornecido) para um arquivo

ln

Cria hard links ou soft (simbólicos) links entre arquivos

logname

Reporta o nome de login do usuário atual

ls

Lista o conteúdo de cada diretório fornecido

md5sum

Reporta ou verifica somas de verificação Message Digest 5 (MD5)

mkdir

Cria diretórios com os nomes fornecidos

mkfifo

Cria First-In, First-Outs (FIFOs), "named pipes" na linguagem UNIX, com os nomes fornecidos

mknod

Cria nós de dispositivo com os nomes fornecidos; um nó de dispositivo é um arquivo especial de caractere, um arquivo especial de bloco ou um FIFO

mktemp

Cria arquivos temporários de forma segura; é usado em scripts

mv

Move ou renomeia arquivos ou diretórios

nice

Executa um programa com prioridade de agendamento modificada

nl

Numera as linhas dos arquivos fornecidos

nohup

Executa um comando imune a hangups, com sua saída redirecionada para um arquivo de log

nproc

Exibe o número de unidades de processamento disponíveis para um processo

numfmt

Converte números para ou de strings legíveis por humanos

od

Despeja arquivos em formato octal e outros formatos

paste

Mescla os arquivos fornecidos, unindo linhas correspondentes sequencialmente lado a lado, separadas por caracteres de tabulação

pathchk

Verifica se os nomes de arquivo são válidos ou portáveis

pinky

É um cliente finger leve; ele relata algumas informações sobre os usuários fornecidos

pr

Pagina e coluniza arquivos para impressão

printenv

Exibe o ambiente

printf

Exibe os argumentos fornecidos de acordo com o formato fornecido, muito parecido com a função printf da linguagem C

ptx

Produz um índice permutado a partir do conteúdo dos arquivos fornecidos, com cada palavra-chave em seu contexto

pwd

Informa o nome do diretório de trabalho atual

readlink

Informa o valor do link simbólico fornecido

realpath

Exibe o caminho resolvido

rm

Remove arquivos ou diretórios

rmdir

Remove diretórios se estiverem vazios

runcon

Executa um comando com contexto de segurança especificado

seq

Exibe uma sequência de números dentro de um determinado intervalo e com um determinado incremento

sha1sum

Imprime ou verifica somas de verificação (checksums) SHA1 (Secure Hash Algorithm 1) de 160 bits

sha224sum

Imprime ou verifica somas de verificação (checksums) do Secure Hash Algorithm de 224 bits

sha256sum

Imprime ou verifica somas de verificação (checksums) do Secure Hash Algorithm de 256 bits

sha384sum

Imprime ou verifica somas de verificação (checksums) do Secure Hash Algorithm de 384 bits

sha512sum

Imprime ou verifica somas de verificação (checksums) do Secure Hash Algorithm de 512 bits

shred

Sobrescreve os arquivos fornecidos repetidamente com padrões complexos, dificultando a recuperação dos dados

shuf

Embaralha linhas de texto

sleep

Pausa pelo período de tempo especificado

sort

Ordena as linhas dos arquivos fornecidos

split

Divide o arquivo fornecido em partes, por tamanho ou por número de linhas

stat

Exibe o status de arquivo ou sistema de arquivos

stdbuf

Executa comandos com operações de buffer alteradas para seus fluxos padrão

stty

Define ou relata configurações de linha do terminal

sum

Imprime soma de verificação (checksum) e contagens de blocos para cada arquivo fornecido

sync

Descarrega os buffers do sistema de arquivos; força blocos alterados para o disco e atualiza o superbloco

tac

Concatena os arquivos fornecidos em ordem inversa

tail

Imprime as últimas dez linhas (ou o número de linhas especificado) de cada arquivo fornecido

tee

Lê da entrada padrão enquanto escreve tanto para a saída padrão quanto para os arquivos fornecidos

test

Compara valores e verifica tipos de arquivo

timeout

Executa um comando com um limite de tempo

touch

Altera os carimbos de data/hora de arquivos, definindo os tempos de acesso e modificação dos arquivos fornecidos para a hora atual; arquivos que não existem são criados com comprimento zero

tr

Traduz, comprime e apaga os caracteres fornecidos da entrada padrão

true

Não faz nada, com sucesso; ele sempre sai com um código de status indicando sucesso

truncate

Reduz ou expande um arquivo para o tamanho especificado

tsort

Executa uma ordenação topológica; ele escreve uma lista completamente ordenada de acordo com a ordenação parcial em um arquivo fornecido

tty

Informa o nome do arquivo do terminal conectado à entrada padrão

uname

Informa informações do sistema

unexpand

Converte espaços em tabulações

uniq

Descarta todas, exceto uma, das linhas idênticas sucessivas

unlink

Remove o arquivo fornecido

users

Informa os nomes dos usuários atualmente logados

vdir

É o mesmo que ls -l

wc

Informa o número de linhas, palavras e bytes para cada arquivo fornecido, bem como totais gerais quando mais de um arquivo é fornecido

who

Informa quem está logado

whoami

Informa o nome de usuário associado ao ID de usuário efetivo atual

yes

Exibe repetidamente y ou uma string fornecida, até ser encerrado

libstdbuf

Biblioteca usada por stdbuf

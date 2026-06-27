# 8.5. Glibc-2.42

O pacote Glibc contém a principal biblioteca C. Esta biblioteca fornece as rotinas básicas para alocação de memória, busca em diretórios, abertura e fechamento de arquivos, leitura e escrita de arquivos, manipulação de strings, correspondência de padrões, aritmética e assim por diante.

## 8.5.1. Instalação do Glibc

Alguns dos programas Glibc usam o diretório /var/db, que não está em conformidade com o FHS, para armazenar seus dados de tempo de execução. Aplique o seguinte patch para fazer com que tais programas armazenem seus dados de tempo de execução em locais compatíveis com o FHS:

```bash
patch -Np1 -i ../glibc-2.42-fhs-1.patch
```

Agora corrija um problema que pode quebrar o Valgrind no BLFS:

```bash
sed -e '/unistd.h/i #include <string.h>' \
    -e '/libc_rwlock_init/c\
  __libc_rwlock_define_initialized (, reset_lock);\
  memcpy (&lock, &reset_lock, sizeof (lock));' \
    -i stdlib/abort.c 
```

A documentação do Glibc recomenda construir o Glibc em um diretório de build dedicado:

```bash
mkdir -v build
cd       build
```

Garanta que os utilitários ldconfig e sln serão instalados em /usr/sbin:

```bash
echo "rootsbindir=/usr/sbin" > configparms
```

Prepare o Glibc para compilação:

```bash
../configure --prefix=/usr                   \
             --disable-werror                \
             --disable-nscd                  \
             libc_cv_slibdir=/usr/lib        \
             --enable-stack-protector=strong \
             --enable-kernel=5.4
```

O significado das opções de configure:

Esta opção desabilita a opção -Werror passada ao GCC. Isso é necessário para executar a suíte de testes.

Esta opção informa ao sistema de build que este Glibc pode ser usado com kernels tão antigos quanto o 5.4. Isso significa gerar soluções alternativas caso uma chamada de sistema introduzida em uma versão posterior não possa ser usada.

Esta opção aumenta a segurança do sistema adicionando código extra para verificar estouros de buffer, como ataques de stack smashing. Note que o Glibc sempre sobrescreve explicitamente o padrão do GCC, então esta opção ainda é necessária mesmo que já tenhamos especificado --enable-default-ssp para o GCC.

Não construa o daemon de cache de serviço de nomes, que não é mais usado.

Esta variável define a biblioteca correta para todos os sistemas. Não queremos que lib64 seja usada.

Compile o pacote:

```bash
make
```

### Importante

Nesta seção, a suíte de testes do Glibc é considerada crítica. Não a pule sob nenhuma circunstância.

Geralmente, alguns testes não passam. As falhas de teste listadas abaixo geralmente podem ser ignoradas com segurança.

```bash
make check
```

Você pode ver algumas falhas de teste. A suíte de testes do Glibc é um tanto dependente do sistema host. Algumas falhas em mais de 6000 testes geralmente podem ser ignoradas. Esta é uma lista dos problemas mais comuns observados nas versões recentes do LFS:

- io/tst-lchmod é conhecido por falhar no ambiente chroot do LFS.

- misc/tst-preadvwritev2 e misc/tst-preadvwritev64v2 são conhecidos por falhar se o kernel host for Linux-6.14 ou posterior.

- Alguns testes, por exemplo nss/tst-nss-files-hosts-multi e nptl/tst-thread-affinity*, são conhecidos por falhar devido a um timeout (especialmente quando o sistema é relativamente lento e/ou executa a suíte de testes com múltiplos jobs make paralelos). Esses testes podem ser identificados com: grep "Timed out" $(find -name \*.out) É possível reexecutar um único teste com timeout ampliado usando TIMEOUTFACTOR=<factor> make test t=<test name>. Por exemplo, TIMEOUTFACTOR=10 make test t=nss/tst-nss-files-hosts-multi reexecutará nss/tst-nss-files-hosts-multi com dez vezes o timeout original.

```bash
grep "Timed out" $(find -name \*.out)
```

- Além disso, alguns testes podem falhar com um modelo de CPU relativamente antigo (por exemplo, elf/tst-cpu-features-cpuinfo) ou versão do kernel host (por exemplo, stdlib/tst-arc4random-thread).

Embora seja uma mensagem inofensiva, o estágio de install do Glibc reclamará da ausência de /etc/ld.so.conf. Evite este aviso com:

```bash
touch /etc/ld.so.conf
```

Corrija o Makefile para pular uma verificação de sanidade desatualizada que falha com uma configuração moderna do Glibc:

```bash
sed '/test-installation/s@$(PERL)@echo not running@' -i ../Makefile
```

### Importante

Se estiver atualizando o Glibc para uma nova versão menor (por exemplo, de Glibc-2.36 para Glibc-2.42) em um sistema LFS em execução, você precisa tomar algumas precauções extras para evitar quebrar o sistema:

- A atualização do Glibc em um sistema LFS anterior a 11.0 (exclusivo) não é suportada. Reconstrua o LFS se você estiver executando um sistema LFS tão antigo, mas precisar de um Glibc mais novo.

- Se estiver atualizando em um sistema LFS anterior a 12.0 (exclusivo), instale o Libxcrypt seguindo a [Seção 8.27, “Libxcrypt-4.4.38.”](#/page/chapter08__libxcrypt) Além de uma instalação normal do Libxcrypt, você DEVE seguir a nota na seção Libxcrypt para instalar libcrypt.so.1* (substituindo libcrypt.so.1 da instalação anterior do Glibc).

- Se estiver atualizando em um sistema LFS anterior a 12.1 (exclusivo), remova o programa nscd: rm -f /usr/sbin/nscd Se este sistema (anterior ao LFS 12.1, exclusivo) for baseado em Systemd, também é necessário desabilitar e parar o serviço nscd agora: systemctl disable --now nscd

```bash
rm -f /usr/sbin/nscd
```

```bash
systemctl disable --now nscd
```

- Atualize o kernel e reinicie se for mais antigo que 5.4 (verifique a versão atual com uname -r) ou se você quiser atualizá-lo de qualquer forma, seguindo a [Seção 10.3, “Linux-6.16.1.”](#/page/chapter10__kernel)

- Atualize os headers da API do kernel se for mais antigo que 5.4 (verifique a versão atual com cat /usr/include/linux/version.h) ou se você quiser atualizá-lo de qualquer forma, seguindo a [Seção 5.4, “Linux-6.16.1 API Headers”](#/page/chapter05__linux-headers) (mas removendo $LFS do comando cp).

- Execute uma instalação DESTDIR e atualize as bibliotecas compartilhadas do Glibc no sistema usando um único comando install: make DESTDIR=$PWD/dest install install -vm755 dest/usr/lib/*.so.* /usr/lib

```bash
make DESTDIR=$PWD/dest install
install -vm755 dest/usr/lib/*.so.* /usr/lib
```

É imperativo seguir rigorosamente os passos acima, a menos que você compreenda completamente o que está fazendo. Qualquer desvio inesperado pode tornar o sistema completamente inutilizável. VOCÊ ESTÁ AVISADO.

Em seguida, continue a executar o comando make install, o comando sed contra /usr/bin/ldd e os comandos para instalar os locales. Assim que terminarem, reinicie o sistema imediatamente.

Quando o sistema tiver sido reiniciado com sucesso, se você estiver executando um sistema LFS anterior a 12.0 (exclusivo) onde o GCC não foi construído com a opção --disable-fixincludes, mova dois headers do GCC para um local melhor e remova as cópias “fixas” obsoletas dos headers do Glibc:

```bash
DIR=$(dirname $(gcc -print-libgcc-file-name))
[ -e $DIR/include/limits.h ]    || mv $DIR/include{-fixed,}/limits.h
[ -e $DIR/include/syslimits.h ] || mv $DIR/include{-fixed,}/syslimits.h
rm -rfv $DIR/include-fixed/*
unset DIR
```

Instale o pacote:

```bash
make install
```

Corrija um path hardcoded para o carregador executável no script ldd:

```bash
sed '/RTLDLIST=/s@/usr@@g' -i /usr/bin/ldd
```

Em seguida, instale os locales que podem fazer o sistema responder em um idioma diferente. Nenhum desses locales é obrigatório, mas se alguns deles estiverem faltando, as suítes de testes de alguns pacotes pularão casos de teste importantes.

Locales individuais podem ser instalados usando o programa localedef. Por exemplo, o segundo comando localedef abaixo combina a definição de locale independente de charset /usr/share/i18n/locales/cs_CZ com a definição de charmap /usr/share/i18n/charmaps/UTF-8.gz e anexa o resultado ao arquivo /usr/lib/locale/locale-archive. As seguintes instruções instalarão o conjunto mínimo de locales necessário para a cobertura ideal dos testes:

```bash
localedef -i C -f UTF-8 C.UTF-8
localedef -i cs_CZ -f UTF-8 cs_CZ.UTF-8
localedef -i de_DE -f ISO-8859-1 de_DE
localedef -i de_DE@euro -f ISO-8859-15 de_DE@euro
localedef -i de_DE -f UTF-8 de_DE.UTF-8
localedef -i el_GR -f ISO-8859-7 el_GR
localedef -i en_GB -f ISO-8859-1 en_GB
localedef -i en_GB -f UTF-8 en_GB.UTF-8
localedef -i en_HK -f ISO-8859-1 en_HK
localedef -i en_PH -f ISO-8859-1 en_PH
localedef -i en_US -f ISO-8859-1 en_US
localedef -i en_US -f UTF-8 en_US.UTF-8
localedef -i es_ES -f ISO-8859-15 es_ES@euro
localedef -i es_MX -f ISO-8859-1 es_MX
localedef -i fa_IR -f UTF-8 fa_IR
localedef -i fr_FR -f ISO-8859-1 fr_FR
localedef -i fr_FR@euro -f ISO-8859-15 fr_FR@euro
localedef -i fr_FR -f UTF-8 fr_FR.UTF-8
localedef -i is_IS -f ISO-8859-1 is_IS
localedef -i is_IS -f UTF-8 is_IS.UTF-8
localedef -i it_IT -f ISO-8859-1 it_IT
localedef -i it_IT -f ISO-8859-15 it_IT@euro
localedef -i it_IT -f UTF-8 it_IT.UTF-8
localedef -i ja_JP -f EUC-JP ja_JP
localedef -i ja_JP -f UTF-8 ja_JP.UTF-8
localedef -i nl_NL@euro -f ISO-8859-15 nl_NL@euro
localedef -i ru_RU -f KOI8-R ru_RU.KOI8-R
localedef -i ru_RU -f UTF-8 ru_RU.UTF-8
localedef -i se_NO -f UTF-8 se_NO.UTF-8
localedef -i ta_IN -f UTF-8 ta_IN.UTF-8
localedef -i tr_TR -f UTF-8 tr_TR.UTF-8
localedef -i zh_CN -f GB18030 zh_CN.GB18030
localedef -i zh_HK -f BIG5-HKSCS zh_HK.BIG5-HKSCS
localedef -i zh_TW -f UTF-8 zh_TW.UTF-8
```

Além disso, instale o locale para o seu próprio país, idioma e conjunto de caracteres.

Alternativamente, instale todas as localidades listadas no arquivo glibc-2.42/localedata/SUPPORTED (ele inclui todas as localidades listadas acima e muitas outras) de uma vez com o seguinte comando demorado:

```bash
make localedata/install-locales
```

### Nota

Glibc agora usa libidn2 ao resolver nomes de domínio internacionalizados. Esta é uma dependência de tempo de execução. Se esta capacidade for necessária, as instruções para instalar libidn2 estão na [página BLFS libidn2](https://www.linuxfromscratch.org/blfs/view/12.4-systemd/general/libidn2.html).

## 8.5.2. Configurando Glibc

### 8.5.2.1. Adicionando nsswitch.conf

O arquivo /etc/nsswitch.conf precisa ser criado porque os padrões do Glibc não funcionam bem em um ambiente de rede.

Crie um novo arquivo /etc/nsswitch.conf executando o seguinte:

```bash
cat > /etc/nsswitch.conf << "EOF"
# Begin /etc/nsswitch.conf

passwd: files systemd
group: files systemd
shadow: files systemd

hosts: mymachines resolve [!UNAVAIL=return] files myhostname dns
networks: files

protocols: files
services: files
ethers: files
rpc: files

# End /etc/nsswitch.conf
EOF
```

### 8.5.2.2. Adicionando Dados de Fuso Horário

Instale e configure os dados de fuso horário com o seguinte:

```bash
tar -xf ../../tzdata2025b.tar.gz

ZONEINFO=/usr/share/zoneinfo
mkdir -pv $ZONEINFO/{posix,right}

for tz in etcetera southamerica northamerica europe africa antarctica  \
          asia australasia backward; do
    zic -L /dev/null   -d $ZONEINFO       ${tz}
    zic -L /dev/null   -d $ZONEINFO/posix ${tz}
    zic -L leapseconds -d $ZONEINFO/right ${tz}
done

cp -v zone.tab zone1970.tab iso3166.tab $ZONEINFO
zic -d $ZONEINFO -p America/New_York
unset ZONEINFO tz
```

O significado dos comandos zic:

Isso cria fusos horários posix sem segundos bissextos. É convencional colocá-los tanto em zoneinfo quanto em zoneinfo/posix. É necessário colocar os fusos horários POSIX em zoneinfo, caso contrário, várias suítes de teste reportarão erros. Em um sistema embarcado, onde o espaço é limitado e você não pretende atualizar os fusos horários, você poderia economizar 1.9 MB não usando o diretório posix, mas algumas aplicações ou suítes de teste podem produzir algumas falhas.

Isso cria fusos horários 'right', incluindo segundos bissextos. Em um sistema embarcado, onde o espaço é limitado e você não pretende atualizar os fusos horários, ou se preocupa com a hora correta, você poderia economizar 1.9MB omitindo o diretório 'right'.

Isso cria o arquivo posixrules. Usamos Nova Iorque porque o POSIX exige que as regras de horário de verão estejam em conformidade com as regras dos EUA.

Uma maneira de determinar o fuso horário local é executar o seguinte script:

```bash
tzselect
```

Após responder algumas perguntas sobre a localização, o script irá exibir o nome do fuso horário (ex: America/Edmonton). Existem também outros fusos horários possíveis listados em /usr/share/zoneinfo, como Canada/Eastern ou EST5EDT, que não são identificados pelo script, mas podem ser usados.

Então crie o arquivo /etc/localtime executando:

```bash
ln -sfv /usr/share/zoneinfo/<xxx> /etc/localtime
```

Substitua <xxx> pelo nome do fuso horário selecionado (ex: Canada/Eastern).

### 8.5.2.3. Configurando o Carregador Dinâmico

Por padrão, o carregador dinâmico (/lib/ld-linux.so.2) pesquisa em /usr/lib por bibliotecas dinâmicas que são necessárias pelos programas quando executados. No entanto, se houver bibliotecas em diretórios diferentes de /usr/lib, estas precisam ser adicionadas ao arquivo /etc/ld.so.conf para que o carregador dinâmico as encontre. Dois diretórios que são comumente conhecidos por conter bibliotecas adicionais são /usr/local/lib e /opt/lib, então adicione esses diretórios ao caminho de pesquisa do carregador dinâmico.

Crie um novo arquivo /etc/ld.so.conf executando o seguinte:

```bash
cat > /etc/ld.so.conf << "EOF"
# Begin /etc/ld.so.conf
/usr/local/lib
/opt/lib

EOF
```

Se desejado, o carregador dinâmico também pode pesquisar um diretório e incluir o conteúdo dos arquivos encontrados lá. Geralmente, os arquivos neste diretório de inclusão são uma linha especificando o caminho da biblioteca desejado. Para adicionar esta capacidade, execute os seguintes comandos:

```bash
cat >> /etc/ld.so.conf << "EOF"
# Add an include directory
include /etc/ld.so.conf.d/*.conf

EOF
mkdir -pv /etc/ld.so.conf.d
```

## 8.5.3. Conteúdo do Glibc

### Descrições Breves

gencat

Gera catálogos de mensagens

getconf

Exibe os valores de configuração do sistema para variáveis específicas do sistema de arquivos

getent

Obtém entradas de um banco de dados administrativo

iconv

Realiza conversão de conjunto de caracteres

iconvconfig

Cria arquivos de configuração de módulo iconv de carregamento rápido

ldconfig

Configura as ligações de tempo de execução do linker dinâmico

ldd

Reporta quais bibliotecas compartilhadas são exigidas por cada programa ou biblioteca compartilhada fornecida

lddlibc4

Auxilia ldd com arquivos objeto. Não existe em arquiteturas mais recentes como x86_64

locale

Imprime várias informações sobre o locale atual

localedef

Compila especificações de locale

makedb

Cria um banco de dados simples a partir de entrada textual

mtrace

Lê e interpreta um arquivo de rastreamento de memória e exibe um resumo em formato legível por humanos

pcprofiledump

Despeja informações geradas por perfilamento de PC

pldd

Lista objetos compartilhados dinâmicos usados por processos em execução

sln

Um programa ln linkado estaticamente

sotruss

Rastreia chamadas de procedimento de biblioteca compartilhada de um comando especificado

sprof

Lê e exibe dados de perfilamento de objeto compartilhado

tzselect

Pergunta ao usuário sobre a localização do sistema e relata a descrição do fuso horário correspondente

xtrace

Rastreia a execução de um programa imprimindo a função atualmente executada

zdump

O despejador de fuso horário

zic

O compilador de fuso horário

ld-*.so

O programa auxiliar para executáveis de biblioteca compartilhada

libBrokenLocale

Usado internamente pelo Glibc como um hack grosseiro para fazer programas quebrados (por exemplo, algumas aplicações Motif) funcionarem. Veja os comentários em glibc-2.42/locale/broken_cur_max.c para mais informações

libanl

Biblioteca dummy que não contém funções. Anteriormente era a biblioteca de pesquisa de nomes assíncrona, cujas funções agora estão em libc

libc

A principal biblioteca C

libc_malloc_debug

Ativa a verificação de alocação de memória quando pré-carregado

libdl

Biblioteca dummy que não contém funções. Anteriormente era a biblioteca de interface de link dinâmico, cujas funções agora estão em libc

libg

Biblioteca dummy que não contém funções. Anteriormente era uma biblioteca de tempo de execução para g++

libm

A biblioteca matemática

libmvec

A biblioteca matemática vetorial, vinculada conforme necessário quando libm é usada

libmcheck

Ativa a verificação de alocação de memória quando vinculada

libmemusage

Usada por memusage para ajudar a coletar informações sobre o uso de memória de um programa

libnsl

A biblioteca de serviços de rede, agora obsoleta

libnss_*

Os módulos Name Service Switch, contendo funções para resolver nomes de host, nomes de usuário, nomes de grupo, aliases, serviços, protocolos, etc. Carregados por libc de acordo com a configuração em /etc/nsswitch.conf

libpcprofile

Pode ser pré-carregada para perfilar um executável de PC

libpthread

Biblioteca dummy que não contém funções. Anteriormente continha funções que forneciam a maioria das interfaces especificadas pelas Extensões de Threads POSIX.1c e as interfaces de semáforo especificadas pelas Extensões de Tempo Real POSIX.1b, agora as funções estão em libc

libresolv

Contém funções para criar, enviar e interpretar pacotes para os servidores de nomes de domínio da Internet

librt

Contém funções que fornecem a maioria das interfaces especificadas pelas Extensões de Tempo Real POSIX.1b

libthread_db

Contém funções úteis para construir depuradores para programas multi-threaded

libutil

Biblioteca dummy que não contém funções. Anteriormente continha código para funções “padrão” usadas em muitas utilidades Unix diferentes. Essas funções agora estão em libc

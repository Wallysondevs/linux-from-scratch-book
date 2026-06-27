# 8.43. Perl-5.42.0

O pacote Perl contém a Linguagem Prática de Extração e Relatórios.

## 8.43.1. Instalação do Perl

Esta versão do Perl compila os módulos Compress::Raw::Zlib e Compress::Raw::BZip2. Por padrão, o Perl usará uma cópia interna dos fontes para a build. Execute o seguinte comando para que o Perl use as bibliotecas instaladas no sistema:

```bash
export BUILD_ZLIB=False
export BUILD_BZIP2=0
```

Para ter controle total sobre a forma como o Perl é configurado, você pode remover as opções “-des” do seguinte comando e escolher manualmente a forma como este pacote é built. Alternativamente, use o comando exatamente como mostrado abaixo para usar os padrões que o Perl auto-detecta:

```bash
sh Configure -des                                          \
             -D prefix=/usr                                \
             -D vendorprefix=/usr                          \
             -D privlib=/usr/lib/perl5/5.42/core_perl      \
             -D archlib=/usr/lib/perl5/5.42/core_perl      \
             -D sitelib=/usr/lib/perl5/5.42/site_perl      \
             -D sitearch=/usr/lib/perl5/5.42/site_perl     \
             -D vendorlib=/usr/lib/perl5/5.42/vendor_perl  \
             -D vendorarch=/usr/lib/perl5/5.42/vendor_perl \
             -D man1dir=/usr/share/man/man1                \
             -D man3dir=/usr/share/man/man3                \
             -D pager="/usr/bin/less -isR"                 \
             -D useshrplib                                 \
             -D usethreads
```

O significado das novas opções do Configure:

Isso garante que less seja usado em vez de more.

Como o Groff ainda não está instalado, o Configure não criará páginas man para o Perl. Esses parâmetros sobrescrevem este comportamento.

Build o Perl com suporte para threads.

Compile o pacote:

```bash
make
```

Para testar os resultados, execute:

```bash
TEST_JOBS=$(nproc) make test_harness
```

Instale o pacote e limpe:

```bash
make install
unset BUILD_ZLIB BUILD_BZIP2
```

## 8.43.2. Conteúdo do Perl

### Descrições Breves

corelist

Um front end de linha de comando para Module::CoreList

cpan

Interage com a Comprehensive Perl Archive Network (CPAN) a partir da linha de comando

enc2xs

Builds uma extensão Perl para o módulo Encode a partir de Mapeamentos de Caracteres Unicode ou Arquivos de Codificação Tcl

encguess

Adivinha o tipo de codificação de um ou vários arquivos

h2ph

Converte arquivos de cabeçalho C .h para arquivos de cabeçalho Perl .ph

h2xs

Converte arquivos de cabeçalho C .h para extensões Perl

instmodsh

Script shell para examinar módulos Perl instalados; ele pode criar um tarball a partir de um módulo instalado

json_pp

Converte dados entre certos formatos de entrada e saída

libnetcfg

Pode ser usado para configurar o módulo Perl libnet

perl

Combina algumas das melhores características de C, sed, awk e sh em uma única linguagem 'canivete suíço'

perl5.42.0

Um hard link para perl

perlbug

Usado para gerar relatórios de bug sobre o Perl, ou os módulos que vêm com ele, e enviá-los por e-mail

perldoc

Exibe um pedaço de documentação no formato pod que está embutido na árvore de instalação do Perl ou em um script Perl

perlivp

O Procedimento de Verificação de Instalação do Perl; pode ser usado para verificar se o Perl e suas bibliotecas foram instalados corretamente

perlthanks

Usado para gerar mensagens de agradecimento para enviar por e-mail aos desenvolvedores do Perl

piconv

Uma versão Perl do conversor de codificação de caracteres iconv

pl2pm

Uma ferramenta rudimentar para converter arquivos .pl do Perl4 para módulos .pm do Perl5

pod2html

Converte arquivos do formato pod para o formato HTML

pod2man

Converte dados pod para entrada *roff formatada

pod2text

Converte dados pod para texto ASCII formatado

pod2usage

Imprime mensagens de uso de documentos pod incorporados em arquivos

podchecker

Verifica a sintaxe de arquivos de documentação no formato pod

podselect

Exibe seções selecionadas da documentação pod

prove

Ferramenta de linha de comando para executar testes contra o módulo Test::Harness

ptar

Um programa tipo tar escrito em Perl

ptardiff

Um programa Perl que compara um arquivo extraído com um não extraído

ptargrep

Um programa Perl que aplica correspondência de padrões ao conteúdo de arquivos em um arquivo tar

shasum

Imprime ou verifica somas de verificação SHA

splain

É usado para forçar diagnósticos de aviso verbosos no Perl

xsubpp

Converte código Perl XS em código C

zipdetails

Exibe detalhes sobre a estrutura interna de um arquivo Zip

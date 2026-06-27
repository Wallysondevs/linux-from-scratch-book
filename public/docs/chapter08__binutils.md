# 8.20. Binutils-2.45

O pacote Binutils contém um ligador, um montador e outras ferramentas para manipular arquivos objeto.

## 8.20.1. Instalação do Binutils

A documentação do Binutils recomenda construir o Binutils em um diretório build dedicado:

```bash
mkdir -v build
cd       build
```

Prepare o Binutils para compilação:

```bash
../configure --prefix=/usr       \
             --sysconfdir=/etc   \
             --enable-ld=default \
             --enable-plugins    \
             --enable-shared     \
             --disable-werror    \
             --enable-64-bit-bfd \
             --enable-new-dtags  \
             --with-system-zlib  \
             --enable-default-hash-style=gnu
```

O significado dos novos parâmetros configure:

Construa o ligador bfd original e instale-o como ld (o ligador padrão) e ld.bfd.

Habilita o suporte a plugins para o ligador.

Use a biblioteca zlib instalada em vez de construir a versão incluída.

Compile o pacote:

```bash
make tooldir=/usr
```

O significado do parâmetro make:

Normalmente, o tooldir (o diretório onde os executáveis serão finalmente localizados) é definido como $(exec_prefix)/$(target_alias). Por exemplo, máquinas x86_64 expandiriam isso para /usr/x86_64-pc-linux-gnu. Como este é um sistema personalizado, este diretório específico do target em /usr não é necessário. $(exec_prefix)/$(target_alias) seria usado se o sistema fosse utilizado para cross-compile (por exemplo, compilando um package em uma máquina Intel que gera código que pode ser executado em máquinas PowerPC).

### Importante

A suíte de testes para o Binutils nesta seção é considerada crítica. Não a pule sob nenhuma circunstância.

Teste os resultados:

```bash
make -k check
```

Para uma lista de testes falhos, execute:

```bash
grep '^FAIL:' $(find -name '*.log')
```

Instale o pacote:

```bash
make tooldir=/usr install
```

Remova bibliotecas estáticas inúteis e outros arquivos:

```bash
rm -rfv /usr/lib/lib{bfd,ctf,ctf-nobfd,gprofng,opcodes,sframe}.a \
        /usr/share/doc/gprofng/
```

## 8.20.2. Conteúdo do Binutils

### Descrições Breves

addr2line

Traduz endereços de programa para nomes de arquivo e números de linha; dado um endereço e o nome de um executável, ele usa as informações de depuração no executável para determinar qual arquivo fonte e número de linha estão associados ao endereço

ar

Cria, modifica e extrai de arquivos

as

Um montador que monta a saída do gcc em arquivos objeto

c++filt

Usado pelo ligador para des-manglear símbolos C++ e Java e para evitar que funções sobrecarregadas entrem em conflito

dwp

O utilitário de empacotamento DWARF

elfedit

Atualiza os cabeçalhos ELF de arquivos ELF

gprof

Exibe dados de perfil de grafo de chamadas

gprofng

Coleta e analisa dados de desempenho

ld

Um ligador que combina vários arquivos objeto e arquivos em um único arquivo, realocando seus dados e amarrando referências de símbolos

ld.bfd

Um hard link para ld

nm

Lista os símbolos presentes em um dado arquivo objeto

objcopy

Traduz um tipo de arquivo objeto em outro

objdump

Exibe informações sobre o dado arquivo objeto, com opções que controlam as informações específicas a serem exibidas; as informações mostradas são úteis para programadores que estão trabalhando nas ferramentas de compilação

ranlib

Gera um índice do conteúdo de um arquivo e o armazena no arquivo; o índice lista todos os símbolos definidos por membros do arquivo que são arquivos objeto relocáveis

readelf

Exibe informações sobre binários do tipo ELF

size

Lista os tamanhos das seções e o tamanho total para os dados arquivos objeto

strings

Exibe, para cada arquivo dado, as sequências de caracteres imprimíveis que possuem pelo menos o comprimento especificado (com padrão de quatro); para arquivos objeto, ele imprime, por padrão, apenas as strings das seções de inicialização e carregamento, enquanto para outros tipos de arquivos, ele escaneia o arquivo inteiro

strip

Descarta símbolos de arquivos objeto

libbfd

A biblioteca Binary File Descriptor

libctf

A biblioteca de suporte de depuração Compat ANSI-C Type Format

libctf-nobfd

Uma variante do libctf que não usa a funcionalidade do libbfd

libgprofng

Uma biblioteca contendo a maioria das rotinas usadas pelo gprofng

libopcodes

Uma biblioteca para lidar com opcodes—as versões em “texto legível” das instruções para o processador; é usada para construir utilitários como o objdump

libsframe

Uma biblioteca para suportar rastreamento de pilha online usando um unwinder simples

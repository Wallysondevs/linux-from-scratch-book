# 8.29. GCC-15.2.0

O pacote GCC contém a coleção de compiladores GNU, que inclui os compiladores C e C++.

## 8.29.1. Instalação do GCC

Se estiver compilando em x86_64, altere o nome do diretório padrão para bibliotecas de 64 bits para “lib”:

```bash
case $(uname -m) in
  x86_64)
    sed -e '/m64=/s/lib64/lib/' \
        -i.orig gcc/config/i386/t-linux64
  ;;
esac
```

A documentação do GCC recomenda compilar o GCC em um diretório de build dedicado:

```bash
mkdir -v build
cd       build
```

Prepare o GCC para compilação:

```bash
../configure --prefix=/usr            \
             LD=ld                    \
             --enable-languages=c,c++ \
             --enable-default-pie     \
             --enable-default-ssp     \
             --enable-host-pie        \
             --disable-multilib       \
             --disable-bootstrap      \
             --disable-fixincludes    \
             --with-system-zlib
```

O GCC suporta sete linguagens de computador diferentes, mas os pré-requisitos para a maioria delas ainda não foram instalados. Consulte a [página do GCC no Livro BLFS](https://www.linuxfromscratch.org/blfs/view/12.4-systemd/general/gcc.html) para obter instruções sobre como compilar todas as linguagens suportadas pelo GCC.

O significado dos novos parâmetros de configuração:

Este parâmetro faz com que o script configure use o programa ld instalado pelo pacote Binutils compilado anteriormente neste capítulo, em vez da versão cross-built que seria usada de outra forma.

Por padrão, durante a instalação do GCC, alguns headers do sistema seriam “corrigidos” para serem usados com o GCC. Isso não é necessário para um sistema Linux moderno e potencialmente prejudicial se um package for reinstalado após a instalação do GCC. Este switch impede que o GCC “corrija” os headers.

Este switch instrui o GCC a linkar com a cópia da biblioteca Zlib instalada no sistema, em vez de sua própria cópia interna.

### Nota

PIE (executáveis independentes de posição) são programas binários que podem ser carregados em qualquer lugar na memória. Sem PIE, o recurso de segurança chamado ASLR (Address Space Layout Randomization) pode ser aplicado para as bibliotecas compartilhadas, mas não para os próprios executáveis. Habilitar PIE permite ASLR para os executáveis, além das bibliotecas compartilhadas, e mitiga alguns ataques baseados em endereços fixos de código ou dados sensíveis nos executáveis.

SSP (Stack Smashing Protection) é uma técnica para garantir que a stack de parâmetros não seja corrompida. A corrupção da stack pode, por exemplo, alterar o endereço de retorno de uma sub-rotina, transferindo assim o controle para algum código perigoso (existente no programa ou em bibliotecas compartilhadas, ou injetado pelo atacante de alguma forma).

Compile o package:

```bash
make
```

### Importante

Nesta seção, o conjunto de testes para o GCC é considerado importante, mas leva muito tempo. Os builders de primeira viagem são encorajados a executar o conjunto de testes. O tempo para executar os testes pode ser significativamente reduzido adicionando -jx ao comando make -k check abaixo, onde x é o número de núcleos de CPU em seu sistema.

O GCC pode precisar de mais espaço de stack ao compilar alguns padrões de código extremamente complexos. Como precaução para as distros host com um limite de stack apertado, defina explicitamente o limite rígido do tamanho da stack como infinito. Na maioria das distros host (e no sistema LFS final), o limite rígido é infinito por padrão, mas não há problema em defini-lo explicitamente. Não é necessário alterar o limite flexível do tamanho da stack porque o GCC o definirá automaticamente para um valor apropriado, desde que o valor não exceda o limite rígido:

```bash
ulimit -s -H unlimited
```

Agora remova várias falhas de teste conhecidas:

```bash
sed -e '/cpython/d' -i ../gcc/testsuite/gcc.dg/plugin/plugin.exp
```

Teste os resultados como um usuário não privilegiado, mas não pare em erros:

```bash
chown -R tester .
su tester -c "PATH=$PATH make -k check"
```

Para extrair um resumo dos resultados do conjunto de testes, execute:

```bash
../contrib/test_summary
```

Para filtrar apenas os resumos, direcione a saída através de grep -A7 Summ.

Os resultados podem ser comparados com aqueles localizados em [https://www.linuxfromscratch.org/lfs/build-logs/12.4/](https://www.linuxfromscratch.org/lfs/build-logs/12.4/) e [https://gcc.gnu.org/ml/gcc-testresults/](https://gcc.gnu.org/ml/gcc-testresults/).

Os testes relacionados a pr90579.c são conhecidos por falhar.

Algumas falhas inesperadas nem sempre podem ser evitadas. Em alguns casos, as falhas de teste dependem do hardware específico do sistema. A menos que os resultados do teste sejam muito diferentes daqueles no URL acima, é seguro continuar.

Instale o package:

```bash
make install
```

O diretório de build do GCC agora pertence ao tester, e a propriedade do diretório de headers instalado (e seu conteúdo) está incorreta. Altere a propriedade para o usuário e grupo root:

```bash
chown -v -R root:root \
    /usr/lib/gcc/$(gcc -dumpmachine)/15.2.0/include{,-fixed}
```

Crie um symlink exigido pelo [FHS](https://refspecs.linuxfoundation.org/FHS_3.0/fhs/ch03s09.html) por razões “históricas”.

```bash
ln -svr /usr/bin/cpp /usr/lib
```

Muitos packages usam o nome cc para chamar o compilador C. Já criamos cc como um symlink em [gcc-pass2](#/page/chapter06__gcc-pass2), crie sua página man também como um symlink:

```bash
ln -sv gcc.1 /usr/share/man/man1/cc.1
```

Adicione um symlink de compatibilidade para permitir a compilação de programas com Link Time Optimization (LTO):

```bash
ln -sfv ../../libexec/gcc/$(gcc -dumpmachine)/15.2.0/liblto_plugin.so \
        /usr/lib/bfd-plugins/
```

Agora que nossa toolchain final está no lugar, é importante garantir novamente que a compilação e a linkagem funcionarão como esperado. Fazemos isso realizando algumas verificações de sanidade:

```bash
echo 'int main(){}' | cc -x c - -v -Wl,--verbose &> dummy.log
readelf -l a.out | grep ': /lib'
```

Não deve haver erros, e a saída do último comando será (permitindo diferenças específicas da plataforma no nome do dynamic linker):

```
[Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]
```

Agora certifique-se de que estamos configurados para usar os arquivos de início corretos:

```bash
grep -E -o '/usr/lib.*/S?crt[1in].*succeeded' dummy.log
```

A saída do último comando deve ser:

```
/usr/lib/gcc/x86_64-pc-linux-gnu/15.2.0/../../../../lib/Scrt1.o succeeded
/usr/lib/gcc/x86_64-pc-linux-gnu/15.2.0/../../../../lib/crti.o succeeded
/usr/lib/gcc/x86_64-pc-linux-gnu/15.2.0/../../../../lib/crtn.o succeeded
```

Dependendo da arquitetura da sua máquina, o acima pode diferir ligeiramente. A diferença será o nome do diretório após /usr/lib/gcc. O importante a procurar aqui é que o gcc encontrou todos os três arquivos crt*.o sob o diretório /usr/lib.

Verifique se o compilador está procurando pelos arquivos de header corretos:

```bash
grep -B4 '^ /usr/include' dummy.log
```

Este comando deve retornar a seguinte saída:

```
#include <...> search starts here:
 /usr/lib/gcc/x86_64-pc-linux-gnu/15.2.0/include
 /usr/local/include
 /usr/lib/gcc/x86_64-pc-linux-gnu/15.2.0/include-fixed
 /usr/include
```

Novamente, o diretório nomeado após seu target triplet pode ser diferente do acima, dependendo da arquitetura do seu sistema.

Em seguida, verifique se o novo linker está sendo usado com os caminhos de busca corretos:

```bash
grep 'SEARCH.*/usr/lib' dummy.log |sed 's|; |\n|g'
```

Referências a paths que possuem componentes com '-linux-gnu' devem ser ignoradas, mas, caso contrário, a saída do último comando deve ser:

```
SEARCH_DIR("/usr/x86_64-pc-linux-gnu/lib64")
SEARCH_DIR("/usr/local/lib64")
SEARCH_DIR("/lib64")
SEARCH_DIR("/usr/lib64")
SEARCH_DIR("/usr/x86_64-pc-linux-gnu/lib")
SEARCH_DIR("/usr/local/lib")
SEARCH_DIR("/lib")
SEARCH_DIR("/usr/lib");
```

Um sistema de 32 bits pode usar alguns outros diretórios. Por exemplo, aqui está a saída de uma máquina i686:

```
SEARCH_DIR("/usr/i686-pc-linux-gnu/lib32")
SEARCH_DIR("/usr/local/lib32")
SEARCH_DIR("/lib32")
SEARCH_DIR("/usr/lib32")
SEARCH_DIR("/usr/i686-pc-linux-gnu/lib")
SEARCH_DIR("/usr/local/lib")
SEARCH_DIR("/lib")
SEARCH_DIR("/usr/lib");
```

Em seguida, certifique-se de que estamos usando a libc correta:

```bash
grep "/lib.*/libc.so.6 " dummy.log
```

A saída do último comando deve ser:

```
attempt to open /usr/lib/libc.so.6 succeeded
```

Certifique-se de que o GCC está usando o dynamic linker correto:

```bash
grep found dummy.log
```

A saída do último comando deve ser (permitindo diferenças específicas da plataforma no nome do dynamic linker):

```
found ld-linux-x86-64.so.2 at /usr/lib/ld-linux-x86-64.so.2
```

Se a saída não aparecer como mostrado acima ou não for recebida, então algo está seriamente errado. Investigue e refaça os passos para descobrir onde está o problema e corrigi-lo. Quaisquer problemas devem ser resolvidos antes de continuar com o processo.

Assim que tudo estiver funcionando corretamente, limpe os arquivos de teste:

```bash
rm -v a.out dummy.log
```

Finalmente, mova um arquivo fora do lugar:

```bash
mkdir -pv /usr/share/gdb/auto-load/usr/lib
mv -v /usr/lib/*gdb.py /usr/share/gdb/auto-load/usr/lib
```

## 8.29.2. Conteúdo do GCC

### Descrições Breves

c++

O compilador C++

cc

O compilador C

cpp

O pré-processador C; é usado pelo compilador para expandir as diretivas #include, #define e similares nos arquivos de código-fonte

g++

O compilador C++

gcc

O compilador C

gcc-ar

Um wrapper para ar que adiciona um plugin à linha de comando. Este programa é usado apenas para adicionar "otimização em tempo de linkagem" e não é útil com as opções de build padrão.

gcc-nm

Um wrapper para nm que adiciona um plugin à linha de comando. Este programa é usado apenas para adicionar "otimização em tempo de linkagem" e não é útil com as opções de build padrão.

gcc-ranlib

Um wrapper para ranlib que adiciona um plugin à linha de comando. Este programa é usado apenas para adicionar "otimização em tempo de linkagem" e não é útil com as opções de build padrão.

gcov

Uma ferramenta de teste de cobertura; é usada para analisar programas para determinar onde as otimizações terão o maior efeito

gcov-dump

Ferramenta de dump de perfil offline gcda e gcno

gcov-tool

Ferramenta de processamento de perfil offline gcda

lto-dump

Ferramenta para despejar arquivos objeto produzidos pelo GCC com LTO habilitado

libasan

A biblioteca de tempo de execução do Address Sanitizer

libatomic

Biblioteca de tempo de execução built-in atômica do GCC

libcc1

Uma biblioteca que permite ao GDB usar o GCC

libgcc

Contém suporte em tempo de execução para gcc

libgcov

Esta biblioteca é vinculada a um programa quando o GCC é instruído a habilitar o profiling

libgomp

Implementação GNU da API OpenMP para programação paralela de memória compartilhada multiplataforma em C/C++ e Fortran

libhwasan

A biblioteca de tempo de execução Hardware-assisted Address Sanitizer

libitm

A biblioteca de memória transacional GNU

liblsan

A biblioteca de tempo de execução Leak Sanitizer

liblto_plugin

O plugin LTO do GCC permite que o Binutils processe arquivos objeto produzidos pelo GCC com LTO habilitado

libquadmath

API da Biblioteca Matemática de Precisão Quádrupla do GCC

libssp

Contém rotinas que suportam a funcionalidade de proteção contra stack-smashing do GCC. Normalmente não é usada, porque o Glibc também fornece essas rotinas.

libstdc++

A biblioteca C++ padrão

libstdc++exp

Biblioteca de Contratos C++ Experimental

libstdc++fs

Biblioteca Filesystem ISO/IEC TS 18822:2015

libsupc++

Fornece rotinas de suporte para a linguagem de programação C++

libtsan

A biblioteca de tempo de execução Thread Sanitizer

libubsan

A biblioteca de tempo de execução Undefined Behavior Sanitizer

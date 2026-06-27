# 5.5. Glibc-2.42

O pacote Glibc contém a principal biblioteca C. Esta biblioteca fornece as rotinas básicas para alocar memória, pesquisar diretórios, abrir e fechar arquivos, ler e escrever arquivos, manipulação de strings, correspondência de padrões, aritmética e assim por diante.

## 5.5.1. Instalação do Glibc

Primeiro, crie um link simbólico para conformidade com LSB. Adicionalmente, para x86_64, crie um link simbólico de compatibilidade necessário para o funcionamento adequado do carregador de biblioteca dinâmica:

```bash
case $(uname -m) in
    i?86)   ln -sfv ld-linux.so.2 $LFS/lib/ld-lsb.so.3
    ;;
    x86_64) ln -sfv ../lib/ld-linux-x86-64.so.2 $LFS/lib64
            ln -sfv ../lib/ld-linux-x86-64.so.2 $LFS/lib64/ld-lsb-x86-64.so.3
    ;;
esac
```

### Nota

O comando acima está correto. O comando ln possui várias versões sintáticas, então certifique-se de verificar info coreutils ln e [ln(1)](https://man.archlinux.org/man/ln.1) antes de relatar o que pode parecer um erro.

Alguns dos programas Glibc usam o diretório /var/db, que não está em conformidade com FHS, para armazenar seus dados de tempo de execução. Aplique o seguinte patch para fazer com que tais programas armazenem seus dados de tempo de execução em locais compatíveis com FHS:

```bash
patch -Np1 -i ../glibc-2.42-fhs-1.patch
```

A documentação do Glibc recomenda construir o Glibc em um diretório build dedicado:

```bash
mkdir -v build
cd       build
```

Garanta que os utilitários ldconfig e sln estejam instalados em /usr/sbin:

```bash
echo "rootsbindir=/usr/sbin" > configparms
```

Em seguida, prepare o Glibc para compilação:

```bash
../configure                             \
      --prefix=/usr                      \
      --host=$LFS_TGT                    \
      --build=$(../scripts/config.guess) \
      --disable-nscd                     \
      libc_cv_slibdir=/usr/lib           \
      --enable-kernel=5.4
```

O significado das opções do configure:

O efeito combinado dessas chaves é que o sistema de build do Glibc se configura para ser cross-compiled, usando o cross-linker e o cross-compiler em $LFS/tools.

Isso instrui o Glibc a compilar a biblioteca com suporte para kernels Linux 5.4 e posteriores. Soluções alternativas para kernels mais antigos não são habilitadas.

Isso garante que a biblioteca seja instalada em /usr/lib em vez do padrão /lib64 em máquinas de 64 bits.

Não construa o daemon de cache de serviço de nomes, que não é mais usado.

Durante esta etapa, o seguinte aviso pode aparecer:

```
configure: WARNING:
*** These auxiliary programs are missing or
*** incompatible versions: msgfmt
*** some features will be disabled.
*** Check the INSTALL file for required versions.
```

O programa msgfmt ausente ou incompatível é geralmente inofensivo. Este programa msgfmt faz parte do pacote Gettext, que a distribuição host deve fornecer.

### Nota

Houve relatos de que este package pode falhar ao construir como um “parallel make.” Se isso ocorrer, execute novamente o comando make com a opção -j1.

Compile o package:

```bash
make
```

Instale o package:

### Aviso

Se LFS não estiver configurado corretamente e, apesar das recomendações, você estiver construindo como root, o próximo comando instalará o Glibc recém-construído em seu sistema host, o que quase certamente o tornará inutilizável. Portanto, verifique novamente se o ambiente está configurado corretamente e se você não é root, antes de executar o seguinte comando.

```bash
make DESTDIR=$LFS install
```

O significado da opção make install:

A variável make DESTDIR é usada por quase todos os packages para definir o local onde o package deve ser instalado. Se não for definida, o padrão é o diretório root (/). Aqui especificamos que o package é instalado em $LFS, que se tornará o diretório root na [Seção 7.4, “Entrando no Ambiente Chroot.”](#/page/chapter07__chroot)

Corrija um path hard coded para o carregador executável no script ldd:

```bash
sed '/RTLDLIST=/s@/usr@@g' -i $LFS/usr/bin/ldd
```

Agora que nossa cross toolchain está no lugar, é importante garantir que a compilação e a vinculação funcionarão como esperado. Fazemos isso realizando algumas verificações de sanidade:

```bash
echo 'int main(){}' | $LFS_TGT-gcc -x c - -v -Wl,--verbose &> dummy.log
readelf -l a.out | grep ': /lib'
```

Não deve haver erros, e a saída do último comando será (permitindo diferenças específicas da plataforma no nome do dynamic linker):

```
[Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]
```

Observe que este path não deve conter /mnt/lfs (ou o valor da variável LFS se você usou uma diferente). O path é resolvido quando o programa compilado é executado, e isso só deve acontecer depois que entrarmos no ambiente chroot onde o kernel consideraria $LFS como o diretório root (/).

Agora, certifique-se de que estamos configurados para usar os arquivos de início corretos:

```bash
grep -E -o "$LFS/lib.*/S?crt[1in].*succeeded" dummy.log
```

A saída do último comando deve ser:

```
/mnt/lfs/lib/../lib/Scrt1.o succeeded
/mnt/lfs/lib/../lib/crti.o succeeded
/mnt/lfs/lib/../lib/crtn.o succeeded
```

Verifique se o compiler está procurando pelos arquivos header corretos:

```bash
grep -B3 "^ $LFS/usr/include" dummy.log
```

Este comando deve retornar a seguinte saída:

```
#include <...> search starts here:
 /mnt/lfs/tools/lib/gcc/x86_64-lfs-linux-gnu/15.2.0/include
 /mnt/lfs/tools/lib/gcc/x86_64-lfs-linux-gnu/15.2.0/include-fixed
 /mnt/lfs/usr/include
```

Novamente, o diretório nomeado após o seu target triplet pode ser diferente do acima, dependendo da arquitetura do seu sistema.

Em seguida, verifique se o novo linker está sendo usado com os search paths corretos:

```bash
grep 'SEARCH.*/usr/lib' dummy.log |sed 's|; |\n|g'
```

Referências a paths que possuem componentes com '-linux-gnu' devem ser ignoradas, mas, caso contrário, a saída do último comando deve ser:

```
SEARCH_DIR("=/mnt/lfs/tools/x86_64-lfs-linux-gnu/lib64")
SEARCH_DIR("=/usr/local/lib64")
SEARCH_DIR("=/lib64")
SEARCH_DIR("=/usr/lib64")
SEARCH_DIR("=/mnt/lfs/tools/x86_64-lfs-linux-gnu/lib")
SEARCH_DIR("=/usr/local/lib")
SEARCH_DIR("=/lib")
SEARCH_DIR("=/usr/lib");
```

Um sistema de 32 bits pode usar alguns outros diretórios, mas de qualquer forma o aspecto importante aqui é que todos os paths devem começar com um sinal de igual (=), que seria substituído pelo diretório sysroot que configuramos para o linker.

Em seguida, certifique-se de que estamos usando a libc correta:

```bash
grep "/lib.*/libc.so.6 " dummy.log
```

A saída do último comando deve ser:

```
attempt to open /mnt/lfs/usr/lib/libc.so.6 succeeded
```

Certifique-se de que o GCC está usando o dynamic linker correto:

```bash
grep found dummy.log
```

A saída do último comando deve ser (permitindo diferenças específicas da plataforma no nome do dynamic linker):

```
found ld-linux-x86-64.so.2 at /mnt/lfs/usr/lib/ld-linux-x86-64.so.2
```

Se a saída não aparecer como mostrado acima ou não for recebida de forma alguma, então algo está seriamente errado. Investigue e refaça os passos para descobrir onde está o problema e corrigi-lo. Quaisquer problemas devem ser resolvidos antes de continuar com o processo.

Assim que tudo estiver funcionando corretamente, limpe os arquivos de teste:

```bash
rm -v a.out dummy.log
```

### Nota

A construção dos packages no próximo capítulo servirá como uma verificação adicional de que a toolchain foi construída corretamente. Se algum package, especialmente Binutils-pass2 ou GCC-pass2, falhar ao construir, é uma indicação de que algo deu errado com as instalações anteriores de Binutils, GCC ou Glibc.

Detalhes sobre este package estão localizados em [Seção 8.5.3, “Conteúdo do Glibc.”](#/page/chapter08__glibc)

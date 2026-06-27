# 6.18. GCC-15.2.0 - Pass 2

O pacote GCC contém a coleção de compiladores GNU, que inclui os compiladores C e C++.

## 6.18.1. Instalação do GCC

Assim como no primeiro build do GCC, os pacotes GMP, MPFR e MPC são necessários. Descompacte os tarballs e mova-os para os diretórios necessários:

```bash
tar -xf ../mpfr-4.2.2.tar.xz
mv -v mpfr-4.2.2 mpfr
tar -xf ../gmp-6.3.0.tar.xz
mv -v gmp-6.3.0 gmp
tar -xf ../mpc-1.3.1.tar.gz
mv -v mpc-1.3.1 mpc
```

Se você estiver fazendo o build em x86_64, altere o nome do diretório padrão para bibliotecas de 64 bits para “lib”:

```bash
case $(uname -m) in
  x86_64)
    sed -e '/m64=/s/lib64/lib/' \
        -i.orig gcc/config/i386/t-linux64
  ;;
esac
```

Substitua as regras de build dos cabeçalhos libgcc e libstdc++ para permitir o build dessas bibliotecas com suporte a threads POSIX:

```bash
sed '/thread_header =/s/@.*@/gthr-posix.h/' \
    -i libgcc/Makefile.in libstdc++-v3/include/Makefile.in
```

Crie um diretório de build separado novamente:

```bash
mkdir -v build
cd       build
```

Antes de iniciar o build do GCC, lembre-se de desdefinir quaisquer variáveis de ambiente que substituam as flags de otimização padrão.

Agora prepare o GCC para compilação:

```bash
../configure                   \
    --build=$(../config.guess) \
    --host=$LFS_TGT            \
    --target=$LFS_TGT          \
    --prefix=/usr              \
    --with-build-sysroot=$LFS  \
    --enable-default-pie       \
    --enable-default-ssp       \
    --disable-nls              \
    --disable-multilib         \
    --disable-libatomic        \
    --disable-libgomp          \
    --disable-libquadmath      \
    --disable-libsanitizer     \
    --disable-libssp           \
    --disable-libvtv           \
    --enable-languages=c,c++   \
    LDFLAGS_FOR_TARGET=-L$PWD/$LFS_TGT/libgcc
```

O significado das novas opções de configure:

Normalmente, usar --host garante que um cross-compiler seja usado para o build do GCC, e que esse compilador sabe que deve procurar por cabeçalhos e bibliotecas em $LFS. No entanto, o sistema de build para GCC usa ferramentas adicionais que não estão cientes desta localização. Este switch é necessário para que essas ferramentas encontrem os arquivos necessários em $LFS, e não no host.

Estamos fazendo cross-compiling do GCC, portanto, é impossível fazer o build das bibliotecas target (libgcc e libstdc++) com os binários do GCC compilados nesta passagem — esses binários não serão executados no host. O sistema de build do GCC tentará usar os compiladores C e C++ do host como uma solução alternativa por padrão. Fazer o build das bibliotecas target do GCC com uma versão diferente do GCC não é suportado, portanto, usar os compiladores do host pode fazer com que o build falhe. Este parâmetro garante que as bibliotecas sejam feitas o build pelo GCC pass 1.

Permita que libstdc++ use o libgcc que está sendo feito o build nesta passagem, em vez da versão anterior feita o build em [gcc-pass1](#/page/chapter05__gcc-pass1). A versão anterior não pode suportar adequadamente o tratamento de exceções C++ porque foi feita o build sem suporte a libc.

Desabilite as bibliotecas de runtime do GCC sanitizer. Elas não são necessárias para a instalação temporária. Em [gcc-pass1](#/page/chapter05__gcc-pass1) foi implícito por --disable-libstdcxx, e agora podemos passá-lo explicitamente.

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make DESTDIR=$LFS install
```

Como um toque final, crie um symlink de utilidade. Muitos programas e scripts executam cc em vez de gcc, o que é usado para manter os programas genéricos e, portanto, utilizáveis em todos os tipos de sistemas UNIX onde o compilador GNU C nem sempre está instalado. Executar cc deixa o administrador do sistema livre para decidir qual compilador C instalar:

```bash
ln -sv gcc $LFS/usr/bin/cc
```

Detalhes sobre este pacote estão localizados em [Seção 8.29.2, “Conteúdo do GCC.”](#/page/chapter08__gcc)

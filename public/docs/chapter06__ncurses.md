# 6.3. Ncurses-6.5-20250809

O pacote Ncurses contém bibliotecas para manipulação independente de terminal de telas de caracteres.

## 6.3.1. Instalação do Ncurses

Primeiro, execute os seguintes comandos para construir o programa tic no host de build. Nós o instalamos em $LFS/tools, para que seja encontrado no PATH quando necessário:

```bash
mkdir build
pushd build
  ../configure --prefix=$LFS/tools AWK=gawk
  make -C include
  make -C progs tic
  install progs/tic $LFS/tools/bin
popd
```

Prepare o Ncurses para compilação:

```bash
./configure --prefix=/usr                \
            --host=$LFS_TGT              \
            --build=$(./config.guess)    \
            --mandir=/usr/share/man      \
            --with-manpage-format=normal \
            --with-shared                \
            --without-normal             \
            --with-cxx-shared            \
            --without-debug              \
            --without-ada                \
            --disable-stripping          \
            AWK=gawk
```

O significado das novas opções de configure:

Isso impede que o Ncurses instale páginas de manual compactadas, o que pode acontecer se a própria distribuição host tiver páginas de manual compactadas.

Isso faz com que o Ncurses construa e instale bibliotecas C compartilhadas.

Isso impede que o Ncurses construa e instale bibliotecas C estáticas.

Isso impede que o Ncurses construa e instale bibliotecas de depuração.

Isso faz com que o Ncurses construa e instale ligações C++ compartilhadas. Também impede que ele construa e instale ligações C++ estáticas.

Isso garante que o Ncurses não construa suporte para o compilador Ada, que pode estar presente no host mas não estará disponível assim que entrarmos no ambiente chroot.

Este switch impede que o sistema de build use o programa strip do host. Usar ferramentas do host em programas cross-compilados pode causar falha.

Este switch impede que o sistema de build use o programa mawk do host. Algumas versões do mawk podem fazer com que este pacote falhe na build.

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make DESTDIR=$LFS install
ln -sv libncursesw.so $LFS/usr/lib/libncurses.so
sed -e 's/^#if.*XOPEN.*$/#if 1/' \
    -i $LFS/usr/include/curses.h
```

O significado das opções de install:

A biblioteca libncurses.so é necessária por alguns pacotes que construiremos em breve. Nós criamos este symlink para usar libncursesw.so como substituto.

O arquivo de cabeçalho curses.h contém a definição de várias estruturas de dados do Ncurses. Com diferentes definições de macro de pré-processador, dois conjuntos diferentes da definição da estrutura de dados podem ser usados: a definição de 8 bits é compatível com libncurses.so e a definição de caractere largo é compatível com libncursesw.so. Como estamos usando libncursesw.so como substituto de libncurses.so, edite o arquivo de cabeçalho para que ele sempre use a definição de estrutura de dados de caractere largo compatível com libncursesw.so.

Detalhes sobre este pacote estão localizados na Seção 8.30.2, “Conteúdo do Ncurses.”

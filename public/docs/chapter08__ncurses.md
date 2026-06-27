# 8.30. Ncurses-6.5-20250809

O pacote Ncurses contém bibliotecas para o tratamento independente de terminal de telas de caracteres.

## 8.30.1. Instalação do Ncurses

Prepare o Ncurses para compilação:

```bash
./configure --prefix=/usr           \
            --mandir=/usr/share/man \
            --with-shared           \
            --without-debug         \
            --without-normal        \
            --with-cxx-shared       \
            --enable-pc-files       \
            --with-pkg-config-libdir=/usr/lib/pkgconfig
```

O significado das novas opções de configure:

Isso faz com que o Ncurses build e instale bibliotecas C compartilhadas.

Isso impede que o Ncurses build e instale bibliotecas C estáticas.

Isso impede que o Ncurses build e instale bibliotecas de debug.

Isso faz com que o Ncurses build e instale bindings C++ compartilhados. Também impede que ele build e instale bindings C++ estáticos.

Este switch gera e instala arquivos .pc para o pkg-config.

Compile o pacote:

```bash
make
```

Este pacote possui uma test suite, mas ela só pode ser executada após o pacote ter sido instalado. Os testes residem no diretório test/. Veja o arquivo README nesse diretório para mais detalhes.

A instalação deste pacote irá sobrescrever libncursesw.so.6.5 in-place. Isso pode causar a falha do processo shell que está usando código e dados do arquivo da biblioteca. Instale o pacote com DESTDIR, e substitua o arquivo da biblioteca corretamente usando o comando install (o header curses.h também é editado para garantir que o ABI de wide-character seja usado como fizemos na Seção 6.3, “Ncurses-6.5-20250809”):

```bash
make DESTDIR=$PWD/dest install
install -vm755 dest/usr/lib/libncursesw.so.6.5 /usr/lib
rm -v  dest/usr/lib/libncursesw.so.6.5
sed -e 's/^#if.*XOPEN.*$/#if 1/' \
    -i dest/usr/include/curses.h
cp -av dest/* /
```

Muitas aplicações ainda esperam que o linker seja capaz de encontrar bibliotecas Ncurses de non-wide-character. Engane tais aplicações para que façam linking com bibliotecas de wide-character por meio de symlinks (note que os links .so são seguros apenas com curses.h editado para sempre usar o ABI de wide-character):

```bash
for lib in ncurses form panel menu ; do
    ln -sfv lib${lib}w.so /usr/lib/lib${lib}.so
    ln -sfv ${lib}w.pc    /usr/lib/pkgconfig/${lib}.pc
done
```

Finalmente, certifique-se de que aplicações antigas que procuram por -lcurses no build time ainda são buildable:

```bash
ln -sfv libncursesw.so /usr/lib/libcurses.so
```

Se desejado, instale a documentação do Ncurses:

```bash
cp -v -R doc -T /usr/share/doc/ncurses-6.5-20250809
```

### Nota

As instruções acima não criam bibliotecas Ncurses de non-wide-character, já que nenhum pacote instalado por compilação a partir de sources faria link contra elas em runtime. No entanto, as únicas aplicações binary-only conhecidas que fazem link contra bibliotecas Ncurses de non-wide-character exigem a versão 5. Se você deve ter tais bibliotecas por causa de alguma aplicação binary-only ou para estar em conformidade com o LSB, build o pacote novamente com os seguintes comandos:

```bash
make distclean
./configure --prefix=/usr    \
            --with-shared    \
            --without-normal \
            --without-debug  \
            --without-cxx-binding \
            --with-abi-version=5
make sources libs
cp -av lib/lib*.so.5* /usr/lib
```

## 8.30.2. Conteúdo do Ncurses

### Descrições Breves

captoinfo

Converte uma descrição termcap em uma descrição terminfo

clear

Limpa a tela, se possível

infocmp

Compara ou imprime descrições terminfo

infotocap

Converte uma descrição terminfo em uma descrição termcap

ncursesw6-config

Fornece informações de configuração para ncurses

reset

Reinicializa um terminal para seus valores padrão

tabs

Limpa e define paradas de tabulação em um terminal

tic

O compilador de descrição de entrada terminfo que traduz um arquivo terminfo do formato source para o formato binary necessário para as rotinas da biblioteca ncurses [Um arquivo terminfo contém informações sobre as capacidades de um determinado terminal.]

toe

Lista todos os tipos de terminal disponíveis, fornecendo o nome primário e a descrição para cada um

tput

Torna os valores das capacidades dependentes do terminal disponíveis para o shell; também pode ser usado para resetar ou inicializar um terminal ou relatar seu nome longo

tset

Pode ser usado para inicializar terminais

libncursesw

Contém funções para exibir texto de muitas maneiras complexas em uma tela de terminal; um bom exemplo do uso dessas funções é o menu exibido durante o make menuconfig do kernel

libncurses++w

Contém binding C++ para outras bibliotecas neste pacote

libformw

Contém funções para implementar formulários

libmenuw

Contém funções para implementar menus

libpanelw

Contém funções para implementar painéis

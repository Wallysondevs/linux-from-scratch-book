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

Isso faz com que o Ncurses construa e instale bibliotecas C compartilhadas.

Isso impede que o Ncurses construa e instale bibliotecas C estáticas.

Isso impede que o Ncurses construa e instale bibliotecas de depuração.

Isso faz com que o Ncurses construa e instale bindings C++ compartilhados. Também impede que ele construa e instale bindings C++ estáticos.

Este switch gera e instala arquivos .pc para o pkg-config.

Compile o pacote:

```bash
make
```

Este pacote possui uma suíte de testes, mas ela só pode ser executada após a instalação do pacote. Os testes residem no diretório test/. Consulte o arquivo README nesse diretório para mais detalhes.

A instalação deste pacote sobrescreverá libncursesw.so.6.5 no local. Isso pode travar o processo shell que está usando código e dados do arquivo da biblioteca. Instale o pacote com DESTDIR e substitua o arquivo da biblioteca corretamente usando o comando install (o cabeçalho curses.h também é editado para garantir que a ABI de caracteres largos seja usada como fizemos na [Seção 6.3, “Ncurses-6.5-20250809”](#/page/chapter06__ncurses)):

```bash
make DESTDIR=$PWD/dest install
install -vm755 dest/usr/lib/libncursesw.so.6.5 /usr/lib
rm -v  dest/usr/lib/libncursesw.so.6.5
sed -e 's/^#if.*XOPEN.*$/#if 1/' \
    -i dest/usr/include/curses.h
cp -av dest/* /
```

Muitas aplicações ainda esperam que o linker seja capaz de encontrar bibliotecas Ncurses de caracteres não-largos. Engane essas aplicações para que se liguem a bibliotecas de caracteres largos por meio de symlinks (observe que os links .so são seguros apenas com curses.h editado para sempre usar a ABI de caracteres largos):

```bash
for lib in ncurses form panel menu ; do
    ln -sfv lib${lib}w.so /usr/lib/lib${lib}.so
    ln -sfv ${lib}w.pc    /usr/lib/pkgconfig/${lib}.pc
done
```

Finalmente, certifique-se de que aplicações antigas que procuram por -lcurses em tempo de build ainda possam ser construídas:

```bash
ln -sfv libncursesw.so /usr/lib/libcurses.so
```

Se desejado, instale a documentação do Ncurses:

```bash
cp -v -R doc -T /usr/share/doc/ncurses-6.5-20250809
```

### Nota

As instruções acima não criam bibliotecas Ncurses de caracteres não-largos, pois nenhum pacote instalado por compilação a partir de fontes se ligaria a elas em tempo de execução. No entanto, as únicas aplicações binárias conhecidas que se ligam a bibliotecas Ncurses de caracteres não-largos exigem a versão 5. Se você precisar de tais bibliotecas devido a alguma aplicação binária ou para estar em conformidade com o LSB, construa o pacote novamente com os seguintes comandos:

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

O compilador de descrição de entrada terminfo que traduz um arquivo terminfo do formato de origem para o formato binário necessário para as rotinas da biblioteca ncurses [Um arquivo terminfo contém informações sobre as capacidades de um determinado terminal.]

toe

Lista todos os tipos de terminal disponíveis, fornecendo o nome principal e a descrição para cada um

tput

Disponibiliza os valores das capacidades dependentes do terminal para o shell; também pode ser usado para redefinir ou inicializar um terminal ou relatar seu nome longo

tset

Pode ser usado para inicializar terminais

libncursesw

Contém funções para exibir texto de várias maneiras complexas em uma tela de terminal; um bom exemplo do uso dessas funções é o menu exibido durante o make menuconfig do kernel

libncurses++w

Contém binding C++ para outras bibliotecas neste pacote

libformw

Contém funções para implementar formulários

libmenuw

Contém funções para implementar menus

libpanelw

Contém funções para implementar painéis

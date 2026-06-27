# v. LFS e Padrões

A estrutura do LFS segue os padrões Linux o mais próximo possível. Os padrões primários são:

- POSIX.1-2008.

- Filesystem Hierarchy Standard (FHS) Versão 3.0

- Linux Standard Base (LSB) Versão 5.0 (2015) O LSB possui quatro especificações separadas: Core, Desktop, Linguagens e Imagem. Algumas partes das especificações Core e Desktop são específicas da arquitetura. Existem também duas especificações de teste: Gtk3 e Gráficos. O LFS tenta estar em conformidade com as especificações do LSB para as arquiteturas IA32 (x86 de 32 bits) ou AMD64 (x86_64) discutidas na seção anterior. Nota Muitas pessoas não concordam com esses requisitos. O principal objetivo do LSB é garantir que softwares proprietários possam ser instalados e executados em um sistema compatível. Como o LFS é baseado em código-fonte, o usuário tem controle total sobre quais packages são desejados; você pode optar por não instalar alguns packages que são especificados pelo LSB.

### Nota

Embora seja possível criar um sistema completo que passará nos testes de certificação LSB “do zero”, isso não pode ser feito sem muitos packages adicionais que estão além do escopo do livro LFS. Instruções de instalação para alguns desses packages adicionais podem ser encontradas no BLFS.

### Packages fornecidos pelo LFS necessários para satisfazer os Requisitos do LSB

LSB Core:

Bash, Bc, Binutils, Coreutils, Diffutils, File, Findutils, Gawk, GCC, Gettext, Glibc, Grep, Gzip, M4, Man-DB, Procps, Psmisc, Sed, Shadow, Systemd, Tar, Util-linux, Zlib

LSB Desktop:

Nenhum

LSB Linguagens:

Perl

LSB Imagem:

Nenhum

LSB Gtk3 e LSB Gráficos (Uso Experimental):

Nenhum

### Packages fornecidos pelo BLFS necessários para satisfazer os Requisitos do LSB

LSB Core:

At, Batch (uma parte do At), Arquivos de Inicialização Bash do BLFS, Cpio, Ed, Fcrontab, LSB-Tools, NSPR, NSS, Linux-PAM, Pax, Sendmail (ou Postfix ou Exim), Time

LSB Desktop:

Alsa, ATK, Cairo, Desktop-file-utils, Freetype, Fontconfig, Gdk-pixbuf, Glib2, GLU, Icon-naming-utils, Libjpeg-turbo, Libxml2, Mesa, Pango, Xdg-utils, Xorg

LSB Linguagens:

Libxml2, Libxslt

LSB Imagem:

CUPS, Cups-filters, Ghostscript, SANE

LSB Gtk3 e LSB Gráficos (Uso Experimental):

GTK+3

### Componentes não fornecidos ou fornecidos opcionalmente pelo LFS ou BLFS necessários para satisfazer os Requisitos do LSB

LSB Core:

install_initd, libcrypt.so.1 (pode ser fornecido com instruções opcionais para o package LFS Libxcrypt), libncurses.so.5 (pode ser fornecido com instruções opcionais para o package LFS Ncurses), libncursesw.so.5 (mas libncursesw.so.6 é fornecido pelo package LFS Ncurses)

LSB Desktop:

libgdk-x11-2.0.so (mas libgdk-3.so é fornecido pelo package BLFS GTK+-3), libgtk-x11-2.0.so (mas libgtk-3.so e libgtk-4.so são fornecidos pelos packages BLFS GTK+-3 e GTK-4), libpng12.so (mas libpng16.so é fornecido pelo package BLFS Libpng), libQt*.so.4 (mas libQt6*.so.6 são fornecidos pelo package BLFS Qt6), libtiff.so.4 (mas libtiff.so.6 é fornecido pelo package BLFS Libtiff)

LSB Linguagens:

/usr/bin/python (LSB requer Python2 mas LFS e BLFS fornecem apenas Python3)

LSB Imagem:

Nenhum

LSB Gtk3 e LSB Gráficos (Uso Experimental):

libpng15.so (mas libpng16.so é fornecido pelo package BLFS Libpng)

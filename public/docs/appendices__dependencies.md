# C. Dependências

Cada package construído no LFS depende de um ou mais outros packages para construir e instalar corretamente. Alguns packages até participam de dependências circulares, ou seja, o primeiro package depende do segundo que por sua vez depende do primeiro. Devido a essas dependências, a ordem em que os packages são construídos no LFS é muito importante. O objetivo desta página é documentar as dependências de cada package construído no LFS.

Para cada package que é construído, existem três, e às vezes até cinco tipos de dependências listados abaixo. O primeiro lista quais outros packages precisam estar disponíveis para compilar e instalar o package em questão. O segundo lista os packages que devem estar disponíveis quando quaisquer programas ou bibliotecas do package são usados em tempo de execução (runtime). O terceiro lista quais packages, além daqueles na primeira lista, precisam estar disponíveis para executar as suítes de teste. A quarta lista de dependências são packages que exigem que este package seja construído e instalado em sua localização final antes que eles sejam construídos e instalados.

A última lista de dependências são packages opcionais que não são abordados no LFS, mas podem ser úteis para o usuário. Esses packages podem ter dependências obrigatórias ou opcionais adicionais próprias. Para essas dependências, a prática recomendada é instalá-las após a conclusão do livro LFS e então voltar e reconstruir o package LFS. Em vários casos, a reinstalação é abordada no BLFS.

## Acl

## Attr

## Autoconf

## Automake

## Bash

## Bc

## Binutils

## Bison

## Bzip2

## Coreutils

## D-Bus

## DejaGNU

## Diffutils

## E2fsprogs

## Expat

## Expect

## File

## Findutils

## Flex

## Flit-Core

## Gawk

## GCC

## GDBM

## Gettext

## Glibc

## GMP

## Gperf

## Grep

## Groff

## GRUB

## Gzip

## Iana-Etc

## Inetutils

## Intltool

## IProute2

## Jinja2

## Kbd

## Kmod

## Less

## Libcap

## Libelf

## Libffi

## Libpipeline

## Libtool

## Libxcrypt

## Linux

## Cabeçalhos da API do Linux

## Lz4

## M4

## Make

## Man-DB

## Páginas de Manual

## MarkupSafe

## Meson

## MPC

## MPFR

## Ncurses

## Ninja

## OpenSSL

## Empacotamento

## Patch

## Perl

## Pkgconf

## Procps-ng

## Psmisc

## Python

## Readline

## Sed

## Setuptools

## Shadow

## Systemd

## Tar

## Tcl

## Texinfo

## Util-linux

## Vim

## Wheel

## XML::Parser

## Xz

## Zlib

## Zstd

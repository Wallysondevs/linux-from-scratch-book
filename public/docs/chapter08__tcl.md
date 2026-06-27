# 8.16. Tcl-8.6.16

O package Tcl contém a Tool Command Language, uma linguagem de script robusta de propósito geral. O package Expect é escrito em Tcl (pronuncia-se "tickle").

## 8.16.1. Instalação do Tcl

Este package e os próximos dois (Expect e DejaGNU) são instalados para suportar a execução das suítes de teste para Binutils, GCC e outros packages. Instalar três packages para fins de teste pode parecer excessivo, mas é muito reconfortante, se não essencial, saber que as ferramentas mais importantes estão funcionando corretamente.

Prepare o Tcl para compilação:

```bash
SRCDIR=$(pwd)
cd unix
./configure --prefix=/usr           \
            --mandir=/usr/share/man \
            --disable-rpath
```

O significado dos novos parâmetros do configure:

Este parâmetro impede a codificação fixa de caminhos de busca de biblioteca (rpath) nos arquivos executáveis binários e bibliotecas compartilhadas. Este package não precisa de rpath para uma instalação no local padrão, e rpath pode, às vezes, causar efeitos indesejados ou até mesmo problemas de segurança.

Faça o build do package:

```bash
make

sed -e "s|$SRCDIR/unix|/usr/lib|" \
    -e "s|$SRCDIR|/usr/include|"  \
    -i tclConfig.sh

sed -e "s|$SRCDIR/unix/pkgs/tdbc1.1.10|/usr/lib/tdbc1.1.10|" \
    -e "s|$SRCDIR/pkgs/tdbc1.1.10/generic|/usr/include|"     \
    -e "s|$SRCDIR/pkgs/tdbc1.1.10/library|/usr/lib/tcl8.6|"  \
    -e "s|$SRCDIR/pkgs/tdbc1.1.10|/usr/include|"             \
    -i pkgs/tdbc1.1.10/tdbcConfig.sh

sed -e "s|$SRCDIR/unix/pkgs/itcl4.3.2|/usr/lib/itcl4.3.2|" \
    -e "s|$SRCDIR/pkgs/itcl4.3.2/generic|/usr/include|"    \
    -e "s|$SRCDIR/pkgs/itcl4.3.2|/usr/include|"            \
    -i pkgs/itcl4.3.2/itclConfig.sh

unset SRCDIR
```

As várias instruções “sed” após o comando “make” removem referências ao diretório de build dos arquivos de configuração e as substituem pelo diretório de install. Isso não é obrigatório para o restante do LFS, mas pode ser necessário se um package construído posteriormente usar Tcl.

Para testar os resultados, execute:

```bash
make test
```

Instale o package:

```bash
make install 
chmod 644 /usr/lib/libtclstub8.6.a
```

Torne a biblioteca instalada gravável para que os símbolos de depuração possam ser removidos posteriormente:

```bash
chmod -v u+w /usr/lib/libtcl8.6.so
```

Instale os headers do Tcl. O próximo package, Expect, os requer.

```bash
make install-private-headers
```

Agora crie um link simbólico necessário:

```bash
ln -sfv tclsh8.6 /usr/bin/tclsh
```

Renomeie uma man page que entra em conflito com uma man page do Perl:

```bash
mv /usr/share/man/man3/{Thread,Tcl_Thread}.3
```

Opcionalmente, instale a documentação executando os seguintes comandos:

```bash
cd ..
tar -xf ../tcl8.6.16-html.tar.gz --strip-components=1
mkdir -v -p /usr/share/doc/tcl-8.6.16
cp -v -r  ./html/* /usr/share/doc/tcl-8.6.16
```

## 8.16.2. Conteúdo do Tcl

### Descrições Breves

tclsh8.6

O shell de comando Tcl

tclsh

Um link para tclsh8.6

libtcl8.6.so

A biblioteca Tcl

libtclstub8.6.a

A biblioteca Stub do Tcl

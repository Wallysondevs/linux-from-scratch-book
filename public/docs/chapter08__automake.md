# 8.47. Automake-1.18.1

O pacote Automake contém programas para gerar Makefiles para uso com Autoconf.

## 8.47.1. Instalação do Automake

Prepare o Automake para compilação:

```bash
./configure --prefix=/usr --docdir=/usr/share/doc/automake-1.18.1
```

Compile o pacote:

```bash
make
```

Usar quatro jobs paralelos acelera os testes, mesmo em sistemas com menos núcleos lógicos, devido a atrasos internos em testes individuais. Para testar os resultados, execute:

```bash
make -j$(($(nproc)>4?$(nproc):4)) check
```

Substitua $((...)) pelo número de núcleos lógicos que você deseja usar se você não quiser usar todos.

Instale o pacote:

```bash
make install
```

## 8.47.2. Conteúdo do Automake

### Breves Descrições

aclocal

Gera arquivos aclocal.m4 com base no conteúdo de arquivos configure.in

aclocal-1.18

Um hard link para aclocal

automake

Uma ferramenta para gerar automaticamente arquivos Makefile.in a partir de arquivos Makefile.am [Para criar todos os arquivos Makefile.in para um pacote, execute este programa no diretório de nível superior. Ao escanear o arquivo configure.in, ele encontra automaticamente cada arquivo Makefile.am apropriado e gera o arquivo Makefile.in correspondente.]

automake-1.18

Um hard link para automake

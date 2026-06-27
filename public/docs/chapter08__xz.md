# 8.8. Xz-5.8.1

O pacote Xz contém programas para compactar e descompactar arquivos. Ele oferece recursos para os formatos de compactação lzma e o mais recente xz. A compactação de arquivos de texto com xz resulta em uma porcentagem de compactação melhor do que com os comandos tradicionais gzip ou bzip2.

## 8.8.1. Instalação do Xz

Prepare o Xz para compilação com:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --docdir=/usr/share/doc/xz-5.8.1
```

Compile o pacote:

```bash
make
```

Para testar os resultados, execute:

```bash
make check
```

Instale o pacote:

```bash
make install
```

## 8.8.2. Conteúdo do Xz

### Descrições Breves

lzcat

Descompacta para a saída padrão

lzcmp

Executa cmp em arquivos compactados LZMA

lzdiff

Executa diff em arquivos compactados LZMA

lzegrep

Executa egrep em arquivos compactados LZMA

lzfgrep

Executa fgrep em arquivos compactados LZMA

lzgrep

Executa grep em arquivos compactados LZMA

lzless

Executa less em arquivos compactados LZMA

lzma

Compacta ou descompacta arquivos usando o formato LZMA

lzmadec

Um decodificador pequeno e rápido para arquivos compactados LZMA

lzmainfo

Mostra informações armazenadas no cabeçalho de arquivo compactado LZMA

lzmore

Executa more em arquivos compactados LZMA

unlzma

Descompacta arquivos usando o formato LZMA

unxz

Descompacta arquivos usando o formato XZ

xz

Compacta ou descompacta arquivos usando o formato XZ

xzcat

Descompacta para a saída padrão

xzcmp

Executa cmp em arquivos compactados XZ

xzdec

Um decodificador pequeno e rápido para arquivos compactados XZ

xzdiff

Executa diff em arquivos compactados XZ

xzegrep

Executa egrep em arquivos compactados XZ

xzfgrep

Executa fgrep em arquivos compactados XZ

xzgrep

Executa grep em arquivos compactados XZ

xzless

Executa less em arquivos compactados XZ

xzmore

Executa more em arquivos compactados XZ

liblzma

A biblioteca que implementa compressão de dados sem perdas, com ordenação por blocos, usando o algoritmo Lempel-Ziv-Markov chain

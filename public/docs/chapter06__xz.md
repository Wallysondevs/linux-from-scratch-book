# 6.16. Xz-5.8.1

O pacote Xz contém programas para compactar e descompactar arquivos. Ele fornece recursos para os formatos de compactação lzma e o mais recente xz. A compactação de arquivos de texto com xz resulta em uma porcentagem de compactação melhor do que com os comandos tradicionais gzip ou bzip2.

## 6.16.1. Instalação do Xz

Prepare o Xz para compilação:

```bash
./configure --prefix=/usr                     \
            --host=$LFS_TGT                   \
            --build=$(build-aux/config.guess) \
            --disable-static                  \
            --docdir=/usr/share/doc/xz-5.8.1
```

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make DESTDIR=$LFS install
```

Remova o arquivo de arquivamento libtool porque é prejudicial para a compilação cruzada:

```bash
rm -v $LFS/usr/lib/liblzma.la
```

Detalhes sobre este pacote estão localizados em [Seção 8.8.2, “Conteúdo do Xz.”](#/page/chapter08__xz)

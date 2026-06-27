# 6.17. Binutils-2.45 - Pass 2

O pacote Binutils contém um ligador, um montador e outras ferramentas para manipulação de arquivos objeto.

## 6.17.1. Instalação do Binutils

O sistema de build do Binutils depende de uma cópia do libtool fornecida para ligar contra bibliotecas estáticas internas, mas as cópias de libiberty e zlib fornecidas no pacote não usam libtool. Essa inconsistência pode fazer com que binários produzidos sejam erroneamente ligados contra bibliotecas da distro host. Contorne este problema:

```bash
sed '6031s/$add_dir//' -i ltmain.sh
```

Crie um diretório de build separado novamente:

```bash
mkdir -v build
cd       build
```

Prepare o Binutils para compilação:

```bash
../configure                   \
    --prefix=/usr              \
    --build=$(../config.guess) \
    --host=$LFS_TGT            \
    --disable-nls              \
    --enable-shared            \
    --enable-gprofng=no        \
    --disable-werror           \
    --enable-64-bit-bfd        \
    --enable-new-dtags         \
    --enable-default-hash-style=gnu
```

O significado das novas opções de configure:

Faz o build de libbfd como uma biblioteca compartilhada.

Habilita suporte a 64 bits (em hosts com tamanhos de palavra menores). Isso pode não ser necessário em sistemas de 64 bits, mas não causa nenhum dano.

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make DESTDIR=$LFS install
```

Remova os arquivos de arquivo do libtool porque são prejudiciais para a cross compilation, e remova bibliotecas estáticas desnecessárias:

```bash
rm -v $LFS/usr/lib/lib{bfd,ctf,ctf-nobfd,opcodes,sframe}.{a,la}
```

Detalhes sobre este pacote estão localizados em [Seção 8.20.2, “Conteúdo do Binutils.”](#/page/chapter08__binutils)

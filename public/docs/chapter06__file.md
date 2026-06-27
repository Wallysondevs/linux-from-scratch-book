# 6.7. File-5.46

O pacote File contém um utilitário para determinar o tipo de um determinado arquivo ou arquivos.

## 6.7.1. Instalação do File

O comando file no host de build precisa ser da mesma versão que o que estamos construindo a fim de criar o arquivo de assinatura. Execute os seguintes comandos para fazer uma cópia temporária do comando file:

```bash
mkdir build
pushd build
  ../configure --disable-bzlib      \
               --disable-libseccomp \
               --disable-xzlib      \
               --disable-zlib
  make
popd
```

O significado da nova opção de configure:

O script de configuração tenta usar alguns pacotes da distribuição do host se os arquivos de biblioteca correspondentes existirem. Isso pode causar falha na compilação se um arquivo de biblioteca existir, mas os arquivos de cabeçalho correspondentes não. Essas opções impedem o uso dessas capacidades desnecessárias do host.

Prepare o File para compilação:

```bash
./configure --prefix=/usr --host=$LFS_TGT --build=$(./config.guess)
```

Compile o pacote:

```bash
make FILE_COMPILE=$(pwd)/build/src/file
```

Instale o pacote:

```bash
make DESTDIR=$LFS install
```

Remova o arquivo de archive libtool porque é prejudicial para a cross compilation:

```bash
rm -v $LFS/usr/lib/libmagic.la
```

Detalhes sobre este pacote estão localizados na Seção 8.11.2, “Conteúdo do File.”

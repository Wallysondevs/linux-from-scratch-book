# 6.9. Gawk-5.3.2

O pacote Gawk contém programas para manipular arquivos de texto.

## 6.9.1. Instalação do Gawk

Primeiro, certifique-se de que alguns arquivos desnecessários não sejam instalados:

```bash
sed -i 's/extras//' Makefile.in
```

Prepare o Gawk para compilação:

```bash
./configure --prefix=/usr   \
            --host=$LFS_TGT \
            --build=$(build-aux/config.guess)
```

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make DESTDIR=$LFS install
```

Detalhes sobre este pacote estão localizados na Seção 8.61.2, “Conteúdo do Gawk.”

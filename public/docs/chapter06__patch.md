# 6.13. Patch-2.8

O pacote Patch contém um programa para modificar ou criar arquivos aplicando um arquivo “patch” tipicamente criado pelo programa diff.

## 6.13.1. Instalação do Patch

Prepare o Patch para compilação:

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

Detalhes sobre este pacote estão localizados na Seção 8.70.2, “Conteúdo do Patch.”

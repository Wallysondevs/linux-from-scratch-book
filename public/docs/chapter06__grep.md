# 6.10. Grep-3.12

O pacote Grep contém programas para pesquisar o conteúdo de arquivos.

## 6.10.1. Instalação do Grep

Prepare o Grep para compilação:

```bash
./configure --prefix=/usr   \
            --host=$LFS_TGT \
            --build=$(./build-aux/config.guess)
```

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make DESTDIR=$LFS install
```

Detalhes sobre este pacote estão localizados em [Seção 8.35.2, “Conteúdo do Grep.”](#/page/chapter08__grep)

# 6.14. Sed-4.9

O pacote Sed contém um editor de fluxo.

## 6.14.1. Instalação do Sed

Prepare o Sed para compilação:

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

Detalhes sobre este pacote estão localizados em [Seção 8.31.2, “Conteúdo do Sed.”](#/page/chapter08__sed)

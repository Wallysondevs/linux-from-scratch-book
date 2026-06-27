# 6.2. M4-1.4.20

O pacote M4 contém um processador de macros.

## 6.2.1. Instalação do M4

Prepare o M4 para compilação:

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

Detalhes sobre este pacote estão localizados em [Seção 8.13.2, “Conteúdo do M4.”](#/page/chapter08__m4)

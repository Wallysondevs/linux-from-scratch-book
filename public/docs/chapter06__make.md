# 6.12. Make-4.4.1

O pacote Make contém um programa para controlar a geração de executáveis e outros arquivos não-fonte de um pacote a partir de arquivos fonte.

## 6.12.1. Instalação do Make

Prepare o Make para compilação:

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

Detalhes sobre este pacote estão localizados na Seção 8.69.2, “Conteúdo do Make.”

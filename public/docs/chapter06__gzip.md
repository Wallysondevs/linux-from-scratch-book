# 6.11. Gzip-1.14

O pacote Gzip contém programas para comprimir e descomprimir arquivos.

## 6.11.1. Instalação do Gzip

Prepare o Gzip para compilação:

```bash
./configure --prefix=/usr --host=$LFS_TGT
```

Compile o pacote:

```bash
make
```

Instale o pacote:

```bash
make DESTDIR=$LFS install
```

Detalhes sobre este pacote estão localizados na Seção 8.65.2, “Conteúdo do Gzip.”

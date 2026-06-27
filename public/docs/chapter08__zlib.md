# 8.6. Zlib-1.3.1

O pacote Zlib contém rotinas de compressão e descompressão usadas por alguns programas.

## 8.6.1. Instalação do Zlib

Prepare o Zlib para compilação:

```bash
./configure --prefix=/usr
```

Compile o pacote:

```bash
make
```

Para testar os resultados, execute:

```bash
make check
```

Instale o pacote:

```bash
make install
```

Remova uma biblioteca estática inútil:

```bash
rm -fv /usr/lib/libz.a
```

## 8.6.2. Conteúdo do Zlib

### Descrições Breves

libz

Contém funções de compressão e descompressão usadas por alguns programas

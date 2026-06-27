# 8.9. Lz4-1.10.0

Lz4 é um algoritmo de compressão sem perdas, oferecendo velocidade de compressão superior a 500 MB/s por núcleo. Ele possui um decodificador extremamente rápido, com velocidade de múltiplos GB/s por núcleo. Lz4 pode trabalhar com Zstandard para permitir que ambos os algoritmos comprimam dados mais rapidamente.

## 8.9.1. Instalação do Lz4

Compile o pacote:

```bash
make BUILD_STATIC=no PREFIX=/usr
```

Para testar os resultados, execute:

```bash
make -j1 check
```

Instale o pacote:

```bash
make BUILD_STATIC=no PREFIX=/usr install
```

## 8.9.2. Conteúdo do Lz4

### Descrições Breves

lz4

Comprime ou descomprime arquivos usando o formato LZ4

lz4c

Comprime arquivos usando o formato LZ4

lz4cat

Lista o conteúdo de um arquivo comprimido usando o formato LZ4

unlz4

Descomprime arquivos usando o formato LZ4

liblz4

A biblioteca que implementa compressão de dados sem perdas, usando o algoritmo LZ4

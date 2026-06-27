# 8.10. Zstd-1.5.7

Zstandard é um algoritmo de compressão em tempo real, oferecendo altas taxas de compressão. Ele oferece uma ampla gama de compensações entre compressão e velocidade, ao mesmo tempo que é suportado por um decodificador muito rápido.

## 8.10.1. Instalação do Zstd

Compile o pacote:

```bash
make prefix=/usr
```

### Nota

Na saída do teste, existem vários locais que indicam 'failed'. Estes são esperados e apenas 'FAIL' é uma falha de teste real. Não deve haver falhas de teste.

Para testar os resultados, execute:

```bash
make check
```

Instale o pacote:

```bash
make prefix=/usr install
```

Remova a biblioteca estática:

```bash
rm -v /usr/lib/libzstd.a
```

## 8.10.2. Conteúdo do Zstd

### Descrições Breves

zstd

Comprime ou descomprime arquivos usando o formato ZSTD

zstdgrep

Executa grep em arquivos comprimidos com ZSTD

zstdless

Executa less em arquivos comprimidos com ZSTD

libzstd

A biblioteca que implementa compressão de dados sem perdas, usando o algoritmo ZSTD

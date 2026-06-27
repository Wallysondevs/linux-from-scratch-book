# 8.65. Gzip-1.14

O pacote Gzip contém programas para comprimir e descomprimir arquivos.

## 8.65.1. Instalação do Gzip

Prepare o Gzip para compilação:

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

## 8.65.2. Conteúdo do Gzip

### Descrições Breves

gunzip

Descomprime arquivos gzipped

gzexe

Cria arquivos executáveis auto-descompactáveis

gzip

Comprime os arquivos fornecidos usando codificação Lempel-Ziv (LZ77)

uncompress

Descomprime arquivos comprimidos

zcat

Descomprime os arquivos gzipped fornecidos para a saída padrão

zcmp

Executa cmp em arquivos gzipped

zdiff

Executa diff em arquivos gzipped

zegrep

Executa egrep em arquivos gzipped

zfgrep

Executa fgrep em arquivos gzipped

zforce

Força uma extensão .gz em todos os arquivos fornecidos que são arquivos gzipped, para que o gzip não os comprima novamente; isso pode ser útil quando nomes de arquivos foram truncados durante uma transferência de arquivo

zgrep

Executa grep em arquivos gzipped

zless

Executa less em arquivos gzipped

zmore

Executa more em arquivos gzipped

znew

Recomprime arquivos do formato compress para o formato gzip— .Z para .gz

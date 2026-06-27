# 8.11. File-5.46

O pacote File contém um utilitário para determinar o tipo de um dado arquivo ou arquivos.

## 8.11.1. Instalação do File

Prepare o File para compilação:

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

## 8.11.2. Conteúdo do File

### Descrições Breves

file

Tenta classificar cada arquivo dado; ele faz isso executando vários testes — testes de sistema de arquivos, testes de número mágico e testes de linguagem

libmagic

Contém rotinas para reconhecimento de número mágico, usadas pelo programa file

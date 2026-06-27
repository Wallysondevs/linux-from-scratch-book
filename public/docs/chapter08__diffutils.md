# 8.60. Diffutils-3.12

O pacote Diffutils contém programas que exibem as diferenças entre arquivos ou diretórios.

## 8.60.1. Instalação do Diffutils

Prepare o Diffutils para compilação:

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

## 8.60.2. Conteúdo do Diffutils

### Descrições Breves

cmp

Compara dois arquivos e relata quaisquer diferenças byte a byte

diff

Compara dois arquivos ou diretórios e relata quais linhas nos arquivos diferem

diff3

Compara três arquivos linha por linha

sdiff

Mescla dois arquivos e exibe interativamente os resultados

# 8.35. Grep-3.12

O pacote Grep contém programas para pesquisar o conteúdo de arquivos.

## 8.35.1. Instalação do Grep

Primeiro, remova um aviso sobre o uso de egrep e fgrep que faz com que testes em alguns pacotes falhem:

```bash
sed -i "s/echo/#echo/" src/egrep.sh
```

Prepare o Grep para compilação:

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

## 8.35.2. Conteúdo do Grep

### Descrições Breves

egrep

Imprime linhas que correspondem a uma expressão regular estendida. É obsoleto, use grep -E em vez disso

fgrep

Imprime linhas que correspondem a uma lista de strings fixas. É obsoleto, use grep -F em vez disso

grep

Imprime linhas que correspondem a uma expressão regular básica

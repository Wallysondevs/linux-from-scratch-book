# 8.62. Findutils-4.10.0

O package Findutils contém programas para encontrar arquivos. Programas são fornecidos para pesquisar todos os arquivos em uma árvore de diretórios e para criar, manter e pesquisar um banco de dados (geralmente mais rápido que o find recursivo, mas não confiável a menos que o banco de dados tenha sido atualizado recentemente). O Findutils também fornece o programa xargs, que pode ser usado para executar um comando especificado em cada arquivo selecionado por uma pesquisa.

## 8.62.1. Instalação do Findutils

Prepare o Findutils para compilação:

```bash
./configure --prefix=/usr --localstatedir=/var/lib/locate
```

O significado das opções do configure:

Esta opção move o banco de dados do locate para /var/lib/locate, que é o local compatível com FHS.

Compile o package:

```bash
make
```

Para testar os resultados, execute:

```bash
chown -R tester .
su tester -c "PATH=$PATH make check"
```

Instale o package:

```bash
make install
```

## 8.62.2. Conteúdo do Findutils

### Descrições Breves

find

Pesquisa árvores de diretórios fornecidas por arquivos que correspondem aos critérios especificados

locate

Pesquisa em um banco de dados de nomes de arquivos e relata os nomes que contêm uma determinada string ou correspondem a um determinado padrão

updatedb

Atualiza o banco de dados do locate; ele escaneia o sistema de arquivos inteiro (incluindo outros sistemas de arquivos que estão atualmente montados, a menos que seja instruído a não fazê-lo) e coloca cada nome de arquivo que encontra no banco de dados

xargs

Pode ser usado para aplicar um determinado comando a uma lista de arquivos

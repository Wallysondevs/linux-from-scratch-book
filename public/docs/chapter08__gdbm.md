# 8.38. GDBM-1.26

O pacote GDBM contém o Gerenciador de Banco de Dados GNU. É uma biblioteca de funções de banco de dados que usa hashing extensível e funciona como o dbm padrão do UNIX. A biblioteca fornece primitivas para armazenar pares chave/dado, pesquisar e recuperar os dados pela sua chave e excluir uma chave junto com seus dados.

## 8.38.1. Instalação do GDBM

Prepare o GDBM para compilação:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --enable-libgdbm-compat
```

O significado da opção de configuração:

Esta opção habilita a construção da biblioteca de compatibilidade libgdbm. Alguns pacotes fora do LFS podem exigir as rotinas DBM mais antigas que ela fornece.

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

## 8.38.2. Conteúdo do GDBM

### Descrições Breves

gdbm_dump

Despeja um banco de dados GDBM para um arquivo

gdbm_load

Recria um banco de dados GDBM a partir de um arquivo de dump

gdbmtool

Testa e modifica um banco de dados GDBM

libgdbm

Contém funções para manipular um banco de dados com hashing

libgdbm_compat

Biblioteca de compatibilidade contendo funções DBM mais antigas

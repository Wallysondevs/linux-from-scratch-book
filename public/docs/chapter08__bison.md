# 8.34. Bison-3.8.2

O pacote Bison contém um gerador de analisador sintático.

## 8.34.1. Instalação do Bison

Prepare o Bison para compilação:

```bash
./configure --prefix=/usr --docdir=/usr/share/doc/bison-3.8.2
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

## 8.34.2. Conteúdo do Bison

### Descrições Breves

bison

Gera, a partir de uma série de regras, um programa para analisar a estrutura de arquivos de texto; Bison é um substituto para Yacc (Yet Another Compiler Compiler)

yacc

Um wrapper para bison, destinado a programas que ainda chamam yacc em vez de bison; ele chama bison com a opção -y

liby

A biblioteca Yacc contendo implementações de funções yyerror e main compatíveis com Yacc; esta biblioteca normalmente não é muito útil, mas o POSIX a exige

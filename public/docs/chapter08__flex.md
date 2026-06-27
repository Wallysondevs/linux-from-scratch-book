# 8.15. Flex-2.6.4

O pacote Flex contém um utilitário para gerar programas que reconhecem padrões em texto.

## 8.15.1. Instalação do Flex

Prepare o Flex para compilação:

```bash
./configure --prefix=/usr \
            --docdir=/usr/share/doc/flex-2.6.4 \
            --disable-static
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

Alguns programas ainda não conhecem o flex e tentam executar seu predecessor, o lex. Para suportar esses programas, crie um link simbólico chamado lex que executa o flex no modo de emulação lex, e também crie a página de manual do lex como um symlink:

```bash
ln -sv flex   /usr/bin/lex
ln -sv flex.1 /usr/share/man/man1/lex.1
```

## 8.15.2. Conteúdo do Flex

### Descrições Breves

flex

Uma ferramenta para gerar programas que reconhecem padrões em texto; ela permite a versatilidade de especificar as regras para a localização de padrões, eliminando a necessidade de desenvolver um programa especializado

flex++

Uma extensão do flex, é usada para gerar código e classes C++. É um link simbólico para o flex

lex

Um link simbólico que executa o flex no modo de emulação lex

libfl

A biblioteca flex

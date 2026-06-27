# 8.37. Libtool-2.5.4

O pacote Libtool contém o script de suporte a bibliotecas genéricas GNU. Ele torna o uso de bibliotecas compartilhadas mais simples com uma interface consistente e portátil.

## 8.37.1. Instalação do Libtool

Prepare o Libtool para compilação:

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

Remova uma biblioteca estática útil apenas para o conjunto de testes:

```bash
rm -fv /usr/lib/libltdl.a
```

## 8.37.2. Conteúdo do Libtool

### Descrições Breves

libtool

Fornece serviços de suporte generalizados para construção de bibliotecas

libtoolize

Fornece uma maneira padrão de adicionar suporte libtool a um pacote

libltdl

Oculta as várias dificuldades de abrir bibliotecas carregadas dinamicamente

# 8.40. Expat-2.7.1

O pacote Expat contém uma biblioteca C orientada a fluxo para análise de XML.

## 8.40.1. Instalação do Expat

Prepare o Expat para compilação:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --docdir=/usr/share/doc/expat-2.7.1
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

Se desejado, instale a documentação:

```bash
install -v -m644 doc/*.{html,css} /usr/share/doc/expat-2.7.1
```

## 8.40.2. Conteúdo do Expat

### Descrições Breves

xmlwf

É um utilitário não validador para verificar se documentos XML estão bem formados

libexpat

Contém funções de API para análise de XML

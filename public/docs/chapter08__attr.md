# 8.24. Attr-2.5.2

O package Attr contém utilitários para administrar os atributos estendidos de objetos de filesystem.

## 8.24.1. Instalação do Attr

Prepare o Attr para compilação:

```bash
./configure --prefix=/usr     \
            --disable-static  \
            --sysconfdir=/etc \
            --docdir=/usr/share/doc/attr-2.5.2
```

Compile o package:

```bash
make
```

Os testes devem ser executados em um filesystem que suporte atributos estendidos, como os filesystems ext2, ext3, ou ext4. Para testar os resultados, execute:

```bash
make check
```

Instale o package:

```bash
make install
```

## 8.24.2. Conteúdo do Attr

### Descrições Breves

attr

Estende atributos em objetos de filesystem

getfattr

Obtém os atributos estendidos de objetos de filesystem

setfattr

Define os atributos estendidos de objetos de filesystem

libattr

Contém as funções de biblioteca para manipular atributos estendidos

# 8.25. Acl-2.3.2

O pacote Acl contém utilitários para administrar Listas de Controle de Acesso, que são usadas para definir direitos de acesso discricionários granulares para arquivos e diretórios.

## 8.25.1. Instalação do Acl

Prepare o Acl para compilação:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --docdir=/usr/share/doc/acl-2.3.2
```

Compile o pacote:

```bash
make
```

Os testes do Acl devem ser executados em um sistema de arquivos que suporte controles de acesso. Para testar os resultados, execute:

```bash
make check
```

Um teste chamado test/cp.test é conhecido por falhar porque o Coreutils ainda não foi construído com o suporte a Acl.

Instale o pacote:

```bash
make install
```

## 8.25.2. Conteúdo do Acl

### Descrições Breves

chacl

Altera a lista de controle de acesso de um arquivo ou diretório

getfacl

Obtém listas de controle de acesso de arquivos

setfacl

Define listas de controle de acesso de arquivos

libacl

Contém as funções de biblioteca para manipular Listas de Controle de Acesso

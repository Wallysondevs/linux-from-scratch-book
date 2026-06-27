# 8.78. Man-DB-2.13.1

O pacote Man-DB contém programas para encontrar e visualizar páginas man.

## 8.78.1. Instalação do Man-DB

Prepare o Man-DB para compilação:

```bash
./configure --prefix=/usr                         \
            --docdir=/usr/share/doc/man-db-2.13.1 \
            --sysconfdir=/etc                     \
            --disable-setuid                      \
            --enable-cache-owner=bin              \
            --with-browser=/usr/bin/lynx          \
            --with-vgrind=/usr/bin/vgrind         \
            --with-grap=/usr/bin/grap
```

O significado das opções de configure:

Isso desabilita tornar o programa man setuid para o usuário man.

Isso altera a propriedade dos arquivos de cache de todo o sistema para o usuário bin.

Esses três parâmetros são usados para definir alguns programas padrão. lynx é um navegador web baseado em texto (veja BLFS para instruções de instalação), vgrind converte fontes de programa para entrada Groff, e grap é útil para compor gráficos em documentos Groff. Os programas vgrind e grap não são normalmente necessários para visualizar páginas de manual. Eles não fazem parte do LFS ou BLFS, mas você deve ser capaz de instalá-los por conta própria após terminar o LFS, se desejar.

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

## 8.78.2. Páginas de Manual Não-Inglesas no LFS

A tabela a seguir mostra o conjunto de caracteres que o Man-DB assume que as páginas de manual instaladas em /usr/share/man/<ll> serão codificadas. Além disso, o Man-DB determina corretamente se as páginas de manual instaladas nesse diretório estão codificadas em UTF-8.

Tabela 8.1. Codificação de caracteres esperada para páginas de manual legadas de 8 bits

### Nota

Páginas de manual em idiomas não listados não são suportadas.

## 8.78.3. Conteúdo do Man-DB

### Descrições Breves

accessdb

Despeja o conteúdo do banco de dados whatis em formato legível por humanos

apropos

Pesquisa o banco de dados whatis e exibe as descrições breves de comandos do sistema que contêm uma determinada string

catman

Cria ou atualiza as páginas de manual pré-formatadas

lexgrog

Exibe informações de resumo de uma linha sobre uma determinada página de manual

man

Formata e exibe a página de manual solicitada

man-recode

Converte páginas de manual para outra codificação

mandb

Cria ou atualiza o banco de dados whatis

manpath

Exibe o conteúdo de $MANPATH ou (se $MANPATH não estiver definido) um caminho de busca adequado baseado nas configurações em man.conf e no ambiente do usuário

whatis

Pesquisa o banco de dados whatis e exibe as descrições breves de comandos do sistema que contêm a palavra-chave fornecida como uma palavra separada

libman

Contém suporte em tempo de execução para man

libmandb

Contém suporte em tempo de execução para man

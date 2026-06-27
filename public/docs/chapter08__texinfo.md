# 8.72. Texinfo-7.2

O pacote Texinfo contém programas para leitura, escrita e conversão de páginas info.

## 8.72.1. Instalação do Texinfo

Corrija um padrão de código que causa um aviso no Perl-5.42 ou posterior:

```bash
sed 's/! $output_file eq/$output_file ne/' -i tp/Texinfo/Convert/*.pm
```

Prepare o Texinfo para compilação:

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

Opcionalmente, instale os componentes pertencentes a uma instalação TeX:

```bash
make TEXMF=/usr/share/texmf install-tex
```

O significado do parâmetro make:

A variável makefile TEXMF contém a localização da raiz da árvore TeX se, por exemplo, um pacote TeX for instalado posteriormente.

O sistema de documentação Info usa um arquivo de texto simples para armazenar sua lista de entradas de menu. O arquivo está localizado em /usr/share/info/dir. Infelizmente, devido a problemas ocasionais nos Makefiles de vários pacotes, ele pode, às vezes, ficar dessincronizado com as páginas info instaladas no sistema. Se o arquivo /usr/share/info/dir precisar ser recriado, os seguintes comandos opcionais realizarão a tarefa:

```bash
pushd /usr/share/info
  rm -v dir
  for f in *
    do install-info $f dir 2>/dev/null
  done
popd
```

## 8.72.2. Conteúdo do Texinfo

### Descrições Breves

info

Usado para ler páginas info que são semelhantes às páginas man, mas frequentemente vão muito mais fundo do que apenas explicar todas as opções de linha de comando disponíveis [Por exemplo, compare man bison e info bison.]

install-info

Usado para instalar páginas info; ele atualiza entradas no arquivo de índice info

makeinfo

Traduz os documentos fonte Texinfo fornecidos em páginas info, texto simples ou HTML

pdftexi2dvi

Usado para formatar o documento Texinfo fornecido em um arquivo Portable Document Format (PDF)

pod2texi

Converte Pod para o formato Texinfo

texi2any

Traduz documentação fonte Texinfo para vários outros formatos

texi2dvi

Usado para formatar o documento Texinfo fornecido em um arquivo independente de dispositivo que pode ser impresso

texi2pdf

Usado para formatar o documento Texinfo fornecido em um arquivo Portable Document Format (PDF)

texindex

Usado para ordenar arquivos de índice Texinfo

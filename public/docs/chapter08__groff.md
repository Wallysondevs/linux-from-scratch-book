# 8.63. Groff-1.23.0

O Groff package contém programas para processar e formatar texto e imagens.

## 8.63.1. Instalação do Groff

Groff espera que a variável de ambiente PAGE contenha o tamanho de papel padrão. Para usuários nos Estados Unidos, PAGE=letter é apropriado. Em outros lugares, PAGE=A4 pode ser mais adequado. Embora o tamanho de papel padrão seja configurado durante a compilação, ele pode ser sobrescrito posteriormente ecoando “A4” ou “letter” para o arquivo /etc/papersize.

Prepare o Groff para compilação:

```bash
PAGE=<paper_size> ./configure --prefix=/usr
```

Faça o build do package:

```bash
make
```

Para testar os resultados, execute:

```bash
make check
```

Instale o package:

```bash
make install
```

## 8.63.2. Conteúdo do Groff

### Descrições Breves

addftinfo

Lê um arquivo de fonte troff e adiciona algumas informações adicionais de métricas de fonte que são usadas pelo sistema groff

afmtodit

Cria um arquivo de fonte para uso com groff e grops

chem

Pré-processador Groff para produzir diagramas de estrutura química

eqn

Compila descrições de equações incorporadas em arquivos de entrada troff em comandos que são compreendidos por troff

eqn2graph

Converte um EQN (equação) troff em uma imagem cortada

gdiffmk

Marca diferenças entre arquivos groff/nroff/troff

glilypond

Transforma partituras escritas na linguagem lilypond para a linguagem groff

gperl

Pré-processador para groff, permitindo a inserção de código perl em arquivos groff

gpinyin

Pré-processador para groff, permitindo a inserção de Pinyin (Chinês Mandarim escrito com o alfabeto romano) em arquivos groff.

grap2graph

Converte um arquivo de programa grap em uma imagem bitmap cortada (grap é uma antiga linguagem de programação Unix para criar diagramas)

grn

Um pré-processador groff para arquivos gremlin

grodvi

Um driver para groff que produz arquivos de saída no formato TeX dvi

groff

Uma interface para o sistema de formatação de documentos groff; normalmente, ele executa o programa troff e um pós-processador apropriado para o dispositivo selecionado

groffer

Exibe arquivos groff e páginas man em terminais X e tty

grog

Lê arquivos e adivinha quais das opções groff -e, -man, -me, -mm, -ms, -p, -s e -t são necessárias para imprimir arquivos, e relata o comando groff incluindo essas opções

grolbp

É um driver groff para impressoras Canon CAPSL (impressoras a laser das séries LBP-4 e LBP-8)

grolj4

É um driver para groff que produz saída no formato PCL5 adequado para uma impressora HP LaserJet 4

gropdf

Traduz a saída do GNU troff para PDF

grops

Traduz a saída do GNU troff para PostScript

grotty

Traduz a saída do GNU troff para um formato adequado para dispositivos semelhantes a máquinas de escrever

hpftodit

Cria um arquivo de fonte para uso com groff -Tlj4 a partir de um arquivo de métricas de fonte marcado com HP

indxbib

Cria um índice invertido para os bancos de dados bibliográficos com um arquivo especificado para uso com refer, lookbib e lkbib

lkbib

Pesquisa bancos de dados bibliográficos por referências que contêm chaves especificadas e relata quaisquer referências encontradas

lookbib

Imprime um prompt no erro padrão (a menos que a entrada padrão não seja um terminal), lê uma linha contendo um conjunto de palavras-chave da entrada padrão, pesquisa os bancos de dados bibliográficos em um arquivo especificado por referências que contêm essas palavras-chave, imprime quaisquer referências encontradas na saída padrão e repete este processo até o fim da entrada

mmroff

Um pré-processador simples para groff

neqn

Formata equações para saída American Standard Code for Information Interchange (ASCII)

nroff

Um script que emula o comando nroff usando groff

pdfmom

É um wrapper para groff que facilita a produção de documentos PDF a partir de arquivos formatados com as macros mom.

pdfroff

Cria documentos pdf usando groff

pfbtops

Traduz uma fonte PostScript no formato .pfb para ASCII

pic

Compila descrições de imagens incorporadas em arquivos de entrada troff ou TeX em comandos compreendidos por TeX ou troff

pic2graph

Converte um diagrama PIC em uma imagem cortada

post-grohtml

Traduz a saída do GNU troff para HTML

preconv

Converte a codificação de arquivos de entrada para algo que o GNU troff entenda

pre-grohtml

Traduz a saída do GNU troff para HTML

refer

Copia o conteúdo de um arquivo para a saída padrão, exceto que as linhas entre .[ e .] são interpretadas como citações, e as linhas entre .R1 e .R2 são interpretadas como comandos para como as citações devem ser processadas

roff2dvi

Transforma arquivos roff para o formato DVI

roff2html

Transforma arquivos roff para o formato HTML

roff2pdf

Transforma arquivos roff em PDFs

roff2ps

Transforma arquivos roff em arquivos ps

roff2text

Transforma arquivos roff em arquivos de texto

roff2x

Transforma arquivos roff em outros formatos

soelim

Lê arquivos e substitui linhas do formato .so file pelo conteúdo do arquivo mencionado

tbl

Compila descrições de tabelas incorporadas em arquivos de entrada troff em comandos que são compreendidos por troff

tfmtodit

Cria um arquivo de fonte para uso com groff -Tdvi

troff

É altamente compatível com Unix troff; geralmente deve ser invocado usando o comando groff, que também executará pré-processadores e pós-processadores na ordem apropriada e com as opções apropriadas

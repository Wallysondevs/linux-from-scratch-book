# 1.5. Help

### Nota

Caso você tenha encontrado um problema ao construir um package com as instruções do LFS, desencorajamos fortemente a postagem do problema diretamente no canal de suporte upstream antes de discuti-lo através de um canal de suporte LFS listado na [Seção 1.4, “Recursos.”](#/page/chapter01__resources). Fazer isso é frequentemente ineficiente porque os mantenedores upstream raramente estão familiarizados com o procedimento de build do LFS. Mesmo que você realmente tenha encontrado um problema upstream, a comunidade LFS ainda pode ajudar a isolar as informações desejadas pelos mantenedores upstream e fazer um relatório adequado.

Se você precisar fazer uma pergunta diretamente através de um canal de suporte upstream, você deve pelo menos notar que muitos projetos upstream têm os canais de suporte separados do bug tracker. Os relatórios de “bug” para fazer perguntas são considerados inválidos e podem irritar os desenvolvedores upstream desses projetos.

Se um problema ou uma pergunta for encontrado ao longo deste livro, por favor, verifique a página de FAQ em [https://www.linuxfromscratch.org/faq/#generalfaq](https://www.linuxfromscratch.org/faq/#generalfaq). Perguntas frequentemente já são respondidas lá. Se sua pergunta não for respondida nessa página, tente encontrar a origem do problema. A dica a seguir lhe dará alguma orientação para a resolução de problemas: [https://www.linuxfromscratch.org/hints/downloads/files/errors.txt](https://www.linuxfromscratch.org/hints/downloads/files/errors.txt).

Se você não conseguir encontrar seu problema listado no FAQ, pesquise nas mailing lists em [https://www.linuxfromscratch.org/search.html](https://www.linuxfromscratch.org/search.html).

Também temos uma maravilhosa comunidade LFS que está disposta a oferecer assistência através das mailing lists e IRC (veja a [Seção 1.4, “Recursos”](#/page/chapter01__resources) deste livro). No entanto, recebemos várias perguntas de suporte todos os dias, e muitas delas poderiam ter sido facilmente respondidas consultando o FAQ ou pesquisando nas mailing lists primeiro. Portanto, para que possamos oferecer a melhor assistência possível, você deve primeiro fazer alguma pesquisa por conta própria. Isso nos permite focar nas necessidades de suporte mais incomuns. Se suas pesquisas não produzirem uma solução, por favor, inclua todas as informações relevantes (mencionadas abaixo) em seu pedido de ajuda.

## 1.5.1. Coisas a Mencionar

Além de uma breve explicação do problema que está sendo experimentado, qualquer pedido de ajuda deve incluir estas coisas essenciais:

- A versão do livro que está sendo usada (neste caso 12.4-systemd)

- A distribuição host e a versão que estão sendo usadas para criar o LFS

- A saída do script [Requisitos do Sistema Host](#/page/chapter02__hostreqs)

- O package ou seção em que o problema foi encontrado

- A mensagem de erro exata, ou uma descrição clara do problema

- Observe se você se desviou do livro de alguma forma

### Nota

Desviar-se deste livro não significa que não vamos ajudá-lo. Afinal, o LFS é sobre preferência pessoal. Ser transparente sobre quaisquer alterações ao procedimento estabelecido nos ajuda a avaliar e determinar as possíveis causas do seu problema.

## 1.5.2. Problemas com o Script Configure

Se algo der errado ao executar o script configure, revise o arquivo config.log. Este arquivo pode conter erros encontrados durante o configure que não foram impressos na tela. Inclua as linhas relevantes se precisar pedir ajuda.

## 1.5.3. Problemas de Compilação

Tanto a saída da tela quanto o conteúdo de vários arquivos são úteis para determinar a causa dos problemas de compilação. A saída da tela do script configure e da execução do make pode ser útil. Não é necessário incluir toda a saída, mas inclua todas as informações relevantes. Aqui está um exemplo do tipo de informação a ser incluída da saída da tela do make.

```
gcc -D ALIASPATH=\"/mnt/lfs/usr/share/locale:.\"
-D LOCALEDIR=\"/mnt/lfs/usr/share/locale\"
-D LIBDIR=\"/mnt/lfs/usr/lib\"
-D INCLUDEDIR=\"/mnt/lfs/usr/include\" -D HAVE_CONFIG_H -I. -I.
-g -O2 -c getopt1.c
gcc -g -O2 -static -o make ar.o arscan.o commands.o dir.o
expand.o file.o function.o getopt.o implicit.o job.o main.o
misc.o read.o remake.o rule.o signame.o variable.o vpath.o
default.o remote-stub.o version.o opt1.o
-lutil job.o: In function `load_too_high':
/lfs/tmp/make-3.79.1/job.c:1565: undefined reference
to `getloadavg'
collect2: ld returned 1 exit status
make[2]: *** [make] Error 1
make[2]: Leaving directory `/lfs/tmp/make-3.79.1'
make[1]: *** [all-recursive] Error 1
make[1]: Leaving directory `/lfs/tmp/make-3.79.1'
make: *** [all-recursive-am] Error 2
```

Neste caso, muitas pessoas incluiriam apenas a seção inferior:

```
make [2]: *** [make] Error 1
```

Esta não é informação suficiente para diagnosticar o problema, porque apenas indica que algo deu errado, não o que deu errado. A seção inteira, como no exemplo acima, é o que deve ser salvo porque inclui o comando que foi executado e todas as mensagens de erro associadas.

Um excelente artigo sobre como pedir ajuda na Internet está disponível online em [http://catb.org/~esr/faqs/smart-questions.html](http://catb.org/~esr/faqs/smart-questions.html). Leia este documento e siga as dicas. Fazer isso aumentará a probabilidade de obter a ajuda de que você precisa.

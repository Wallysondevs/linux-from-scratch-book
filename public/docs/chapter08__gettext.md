# 8.33. Gettext-0.26

O pacote Gettext contém utilitários para internacionalização e localização. Estes permitem que programas sejam compilados com NLS (Native Language Support), possibilitando que eles exibam mensagens no idioma nativo do usuário.

## 8.33.1. Instalação do Gettext

Prepare o Gettext para compilação:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --docdir=/usr/share/doc/gettext-0.26
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
chmod -v 0755 /usr/lib/preloadable_libintl.so
```

## 8.33.2. Conteúdo do Gettext

### Descrições Breves

autopoint

Copia arquivos de infraestrutura padrão do Gettext para um pacote de código-fonte

envsubst

Substitui variáveis de ambiente em strings de formato shell

gettext

Traduz uma mensagem em linguagem natural para o idioma do usuário, procurando a tradução em um catálogo de mensagens

gettext.sh

Serve principalmente como uma biblioteca de funções shell para gettext

gettextize

Copia todos os arquivos padrão do Gettext para o diretório de nível superior especificado de um pacote para começar a internacionalizá-lo

msgattrib

Filtra as mensagens de um catálogo de tradução de acordo com seus atributos e manipula os atributos

msgcat

Concatena e mescla os arquivos .po fornecidos

msgcmp

Compara dois arquivos .po para verificar se ambos contêm o mesmo conjunto de strings msgid

msgcomm

Encontra as mensagens que são comuns aos arquivos .po fornecidos

msgconv

Converte um catálogo de tradução para uma codificação de caracteres diferente

msgen

Cria um catálogo de tradução em inglês

msgexec

Aplica um comando a todas as traduções de um catálogo de tradução

msgfilter

Aplica um filtro a todas as traduções de um catálogo de tradução

msgfmt

Gera um catálogo de mensagens binário a partir de um catálogo de tradução

msggrep

Extrai todas as mensagens de um catálogo de tradução que correspondem a um padrão fornecido ou pertencem a alguns arquivos de origem fornecidos

msginit

Cria um novo arquivo .po, inicializando as meta informações com valores do ambiente do usuário

msgmerge

Combina duas traduções brutas em um único arquivo

msgunfmt

Descompila um catálogo de mensagens binário em texto de tradução bruto

msguniq

Unifica traduções duplicadas em um catálogo de tradução

ngettext

Exibe traduções em idioma nativo de uma mensagem textual cuja forma gramatical depende de um número

recode-sr-latin

Recodifica texto sérvio do alfabeto cirílico para o latino

xgettext

Extrai as linhas de mensagem traduzíveis dos arquivos fonte fornecidos para criar o primeiro modelo de tradução

libasprintf

Define a classe autosprintf, que torna as rotinas de saída formatada em C utilizáveis em programas C++, para uso com as strings <string> e os streams <iostream>

libgettextlib

Contém rotinas comuns usadas pelos diversos programas Gettext; estas não são destinadas a uso geral

libgettextpo

Usada para escrever programas especializados que processam arquivos .po; esta biblioteca é usada quando as aplicações padrão fornecidas com Gettext (como msgcomm, msgcmp, msgattrib e msgen) não forem suficientes

libgettextsrc

Fornece rotinas comuns usadas pelos diversos programas Gettext; estas não são destinadas a uso geral

libtextstyle

Biblioteca de estilização de texto

preloadable_libintl

Uma biblioteca, destinada a ser usada por LD_PRELOAD, que ajuda libintl a registrar mensagens não traduzidas

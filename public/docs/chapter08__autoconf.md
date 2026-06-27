# 8.46. Autoconf-2.72

O pacote Autoconf contém programas para produzir scripts shell que podem configurar automaticamente o código-fonte.

## 8.46.1. Instalação do Autoconf

Prepare o Autoconf para compilação:

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

## 8.46.2. Conteúdo do Autoconf

### Descrições Breves

autoconf

Produz scripts shell que configuram automaticamente pacotes de código-fonte de software para se adaptar a muitos tipos de sistemas tipo Unix; os scripts de configuração que ele produz são independentes—executá-los não requer o programa autoconf

autoheader

Uma ferramenta para criar arquivos de modelo de declarações C #define para o configure usar

autom4te

Um wrapper para o processador de macros M4

autoreconf

Executa automaticamente autoconf, autoheader, aclocal, automake, gettextize e libtoolize na ordem correta para economizar tempo quando alterações são feitas nos arquivos de modelo do autoconf e automake

autoscan

Ajuda a criar um arquivo configure.in para um pacote de software; ele examina os arquivos-fonte em uma árvore de diretórios, procurando por problemas comuns de portabilidade, e cria um arquivo configure.scan que serve como um arquivo configure.in preliminar para o pacote

autoupdate

Modifica um arquivo configure.in que ainda chama macros do autoconf pelos seus nomes antigos para usar os nomes de macro atuais

ifnames

Ajuda ao escrever arquivos configure.in para um pacote de software; ele imprime os identificadores que o pacote usa em condicionais do pré-processador C [Se um pacote já foi configurado para ter alguma portabilidade, este programa pode ajudar a determinar o que o configure precisa verificar. Ele também pode preencher lacunas em um arquivo configure.in gerado pelo autoscan.]

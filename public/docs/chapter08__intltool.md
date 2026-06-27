# 8.45. Intltool-0.51.0

O Intltool é uma ferramenta de internacionalização usada para extrair strings traduzíveis de arquivos fonte.

## 8.45.1. Instalação do Intltool

Primeiro corrija um aviso que é causado pelo perl-5.22 e posteriores:

```bash
sed -i 's:\\\${:\\\$\\{:' intltool-update.in
```

### Nota

A expressão regular acima parece incomum por causa de todas as barras invertidas. O que ela faz é adicionar uma barra invertida antes do caractere de chave direita na sequência '\${' resultando em '\$\{'.

Prepare o Intltool para compilação:

```bash
./configure --prefix=/usr
```

Compile o package:

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
install -v -Dm644 doc/I18N-HOWTO /usr/share/doc/intltool-0.51.0/I18N-HOWTO
```

## 8.45.2. Conteúdo do Intltool

### Descrições Breves

intltoolize

Prepara um package para usar o intltool

intltool-extract

Gera arquivos de cabeçalho que podem ser lidos pelo gettext

intltool-merge

Mescla strings traduzidas em vários tipos de arquivo

intltool-prepare

Atualiza arquivos pot e os mescla com arquivos de tradução

intltool-update

Atualiza os arquivos de template po e os mescla com as traduções

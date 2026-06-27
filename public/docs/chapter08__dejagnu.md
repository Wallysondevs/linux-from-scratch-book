# 8.18. DejaGNU-1.6.3

O pacote DejaGnu contém uma estrutura para executar conjuntos de testes em ferramentas GNU. Ele é escrito em expect, que por sua vez usa Tcl (Tool Command Language).

## 8.18.1. Instalação do DejaGNU

O upstream recomenda construir o DejaGNU em um diretório build dedicado:

```bash
mkdir -v build
cd       build
```

Prepare o DejaGNU para compilação:

```bash
../configure --prefix=/usr
makeinfo --html --no-split -o doc/dejagnu.html ../doc/dejagnu.texi
makeinfo --plaintext       -o doc/dejagnu.txt  ../doc/dejagnu.texi
```

Para testar os resultados, execute:

```bash
make check
```

Instale o pacote:

```bash
make install
install -v -dm755  /usr/share/doc/dejagnu-1.6.3
install -v -m644   doc/dejagnu.{html,txt} /usr/share/doc/dejagnu-1.6.3
```

## 8.18.2. Conteúdo do DejaGNU

### Descrições Breves

dejagnu

Lançador de comando auxiliar do DejaGNU

runtest

Um script wrapper que localiza o shell expect apropriado e então executa o DejaGNU

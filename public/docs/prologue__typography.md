# vii. Tipografia

Para facilitar o acompanhamento, existem algumas convenções tipográficas usadas ao longo deste livro. Esta seção contém alguns exemplos do formato tipográfico encontrado ao longo do Linux From Scratch.

```bash
./configure --prefix=/usr
```

Esta forma de texto é projetada para ser digitada exatamente como vista, a menos que seja indicado o contrário no texto circundante. Também é usada nas seções de explicação para identificar qual dos comandos está sendo referenciado.

Em alguns casos, uma linha lógica é estendida para duas ou mais linhas físicas com uma barra invertida no final da linha.

```bash
CC="gcc -B/usr/bin/" ../binutils-2.18/configure \
  --prefix=/tools --disable-nls --disable-werror
```

Observe que a barra invertida deve ser seguida por um retorno imediato. Outros caracteres de espaço em branco, como espaços ou caracteres de tabulação, criarão resultados incorretos.

```
install-info: unknown option '--dir-file=/mnt/lfs/usr/info/dir'
```

Esta forma de texto (texto de largura fixa) mostra a saída da tela, geralmente como resultado de comandos emitidos. Se você estiver lendo o livro no formato HTML (em vez de PDF), o texto deve ser azul.

O texto de largura fixa também é usado para mostrar nomes de arquivos, como /etc/ld.so.conf.

### Nota

Por favor, configure seu navegador para exibir texto de largura fixa com uma boa fonte monoespaçada, com a qual você possa distinguir claramente os glifos de Il1 ou O0.

Ênfase

Esta forma de texto é usada para diversos propósitos no livro. Seu principal propósito é enfatizar pontos ou itens importantes.

https://www.linuxfromscratch.org/

Este formato é usado para hiperlinks tanto dentro da comunidade LFS quanto para páginas externas. Inclui HOWTOs, locais de download e websites.

```bash
cat > $LFS/etc/group << "EOF"
root:x:0:
bin:x:1:
......
EOF
```

Este formato é usado ao criar arquivos de configuração. O primeiro comando instrui o sistema a criar o arquivo $LFS/etc/group a partir do que é digitado nas linhas seguintes até que a sequência End Of File (EOF) seja encontrada. Portanto, esta seção inteira é geralmente digitada como vista.

<TEXTO SUBSTITUÍDO>

Este formato é usado para encapsular texto que não deve ser digitado como visto ou para operações de copiar e colar.

[TEXTO OPCIONAL]

Este formato é usado para encapsular texto que é opcional.

passwd(5)

Este formato é usado para se referir a uma página de manual (man) específica. O número dentro dos parênteses indica uma seção específica dentro dos manuais. Por exemplo, passwd tem duas páginas de manual. De acordo com as instruções de instalação do LFS, essas duas páginas de manual estarão localizadas em /usr/share/man/man1/passwd.1 e /usr/share/man/man5/passwd.5. Quando o livro usa passwd(5), ele está se referindo especificamente a /usr/share/man/man5/passwd.5. man passwd imprimirá a primeira página de manual que encontrar que corresponda a “passwd”, que será /usr/share/man/man1/passwd.1. Para este exemplo, você precisará executar man 5 passwd para ler a página especificada. Observe que a maioria das páginas de manual não possui nomes de página duplicados em seções diferentes. Portanto, man <nome do programa> é geralmente suficiente. No livro LFS, essas referências a páginas de manual também são hiperlinks, então clicar em tal referência abrirá a página de manual renderizada em HTML das páginas de manual do Arch Linux.

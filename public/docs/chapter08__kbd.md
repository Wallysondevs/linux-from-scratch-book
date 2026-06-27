# 8.67. Kbd-2.8.0

O pacote Kbd contém arquivos de tabela de teclas, fontes de console e utilitários de teclado.

## 8.67.1. Instalação do Kbd

O comportamento das teclas backspace e delete não é consistente entre os keymaps no pacote Kbd. O seguinte patch corrige este problema para keymaps i386:

```bash
patch -Np1 -i ../kbd-2.8.0-backspace-1.patch
```

Após o patching, a tecla backspace gera o caractere com código 127, e a tecla delete gera uma sequência de escape bem conhecida.

Remova o programa redundante resizecons (ele requer a svgalib desativada para fornecer os arquivos de modo de vídeo - para uso normal, setfont dimensiona o console apropriadamente) juntamente com sua manpage.

```bash
sed -i '/RESIZECONS_PROGS=/s/yes/no/' configure
sed -i 's/resizecons.8 //' docs/man/man8/Makefile.in
```

Prepare o Kbd para compilação:

```bash
./configure --prefix=/usr --disable-vlock
```

O significado da opção de configure:

Esta opção impede que o utilitário vlock seja construído porque ele requer a biblioteca PAM, que não está disponível no ambiente chroot.

Compile o pacote:

```bash
make
```

Os testes para este pacote falharão todos no ambiente chroot porque eles requerem valgrind. Além disso, em um sistema completo com valgrind, vários testes ainda falham em um ambiente gráfico. Os testes passam em um ambiente não-gráfico.

Instale o pacote:

```bash
make install
```

### Nota

Para algumas linguagens (por exemplo, bielorrusso), o pacote Kbd não fornece um keymap útil onde o keymap padrão “by” assume a codificação ISO-8859-5, e o keymap CP1251 é normalmente usado. Usuários de tais linguagens têm que baixar keymaps funcionais separadamente.

Se desejado, instale a documentação:

```bash
cp -R -v docs/doc -T /usr/share/doc/kbd-2.8.0
```

## 8.67.2. Conteúdo do Kbd

### Descrições Breves

chvt

Altera o terminal virtual em primeiro plano

deallocvt

Desaloca terminais virtuais não utilizados

dumpkeys

Despeja as tabelas de tradução do teclado

fgconsole

Imprime o número do terminal virtual ativo

getkeycodes

Imprime a tabela de mapeamento de scancode para keycode do kernel

kbdinfo

Obtém informações sobre o status de um console

kbd_mode

Reporta ou define o modo do teclado

kbdrate

Define as taxas de repetição e atraso do teclado

loadkeys

Carrega as tabelas de tradução do teclado

loadunimap

Carrega a tabela de mapeamento de unicode para fonte do kernel

mapscrn

Um programa obsoleto que costumava carregar uma tabela de mapeamento de caracteres de saída definida pelo usuário no driver do console; isso agora é feito por setfont

openvt

Inicia um programa em um novo terminal virtual (VT)

psfaddtable

Adiciona uma tabela de caracteres Unicode a uma fonte de console

psfgettable

Extrai a tabela de caracteres Unicode incorporada de uma fonte de console

psfstriptable

Remove a tabela de caracteres Unicode incorporada de uma fonte de console

psfxtable

Gerencia tabelas de caracteres Unicode para fontes de console

setfont

Altera as fontes do Enhanced Graphic Adapter (EGA) e Video Graphics Array (VGA) no console

setkeycodes

Carrega entradas da tabela de mapeamento de scancode para keycode do kernel; isso é útil se houver teclas incomuns no teclado

setleds

Define as flags do teclado e os Light Emitting Diodes (LEDs)

setmetamode

Define o tratamento da tecla meta do teclado

setvtrgb

Define o mapa de cores do console em todos os terminais virtuais

showconsolefont

Mostra a fonte de tela atual do console EGA/VGA

showkey

Reporta os scancodes, keycodes e códigos ASCII das teclas pressionadas no teclado

unicode_start

Coloca o teclado e o console no modo UNICODE [Não use este programa a menos que seu arquivo keymap esteja na codificação ISO-8859-1. Para outras codificações, este utilitário produz resultados incorretos.]

unicode_stop

Reverte o teclado e o console do modo UNICODE

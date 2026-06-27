# 8.73. Vim-9.1.1629

O pacote Vim contém um poderoso editor de texto.

### Alternativas ao Vim

Se você preferir outro editor—como Emacs, Joe ou Nano—consulte https://www.linuxfromscratch.org/blfs/view/12.4-systemd/postlfs/editors.html para instruções de instalação sugeridas.

## 8.73.1. Instalação do Vim

Primeiro, altere o local padrão do arquivo de configuração vimrc para /etc:

```bash
echo '#define SYS_VIMRC_FILE "/etc/vimrc"' >> src/feature.h
```

Prepare o Vim para compilação:

```bash
./configure --prefix=/usr
```

Compile o pacote:

```bash
make
```

Para preparar os testes, certifique-se de que o usuário tester possa escrever na árvore de código-fonte e exclua um arquivo contendo testes que exigem curl ou wget:

```bash
chown -R tester .
sed '/test_plugin_glvs/d' -i src/testdir/Make_all.mak
```

Agora execute os testes como usuário tester:

```bash
su tester -c "TERM=xterm-256color LANG=en_US.UTF-8 make -j1 test" \
   &> vim-test.log
```

A suíte de testes exibe muitos dados binários na tela. Isso pode causar problemas com as configurações do terminal atual (especialmente enquanto estamos sobrescrevendo a variável TERM para satisfazer algumas suposições da suíte de testes). O problema pode ser evitado redirecionando a saída para um arquivo de log, conforme mostrado acima. Um teste bem-sucedido resultará nas palavras ALL DONE no arquivo de log ao ser concluído.

Instale o pacote:

```bash
make install
```

Muitos usuários digitam vi reflexivamente em vez de vim. Para permitir a execução de vim quando os usuários digitam vi por hábito, crie um symlink tanto para o binário quanto para a página de manual nos idiomas fornecidos:

```bash
ln -sv vim /usr/bin/vi
for L in  /usr/share/man/{,*/}man1/vim.1; do
    ln -sv vim.1 $(dirname $L)/vi.1
done
```

Por padrão, a documentação do Vim é instalada em /usr/share/vim. O seguinte symlink permite que a documentação seja acessada via /usr/share/doc/vim-9.1.1629, tornando-a consistente com o local da documentação para outros pacotes:

```bash
ln -sv ../vim/vim91/doc /usr/share/doc/vim-9.1.1629
```

Se um X Window System for ser instalado no sistema LFS, pode ser necessário recompilar o Vim após instalar o X. O Vim vem com uma versão GUI do editor que requer X e algumas bibliotecas adicionais para ser instalada. Para mais informações sobre este processo, consulte a documentação do Vim e a página de instalação do Vim no livro BLFS em https://www.linuxfromscratch.org/blfs/view/12.4-systemd/postlfs/vim.html.

## 8.73.2. Configurando o Vim

Por padrão, o vim é executado no modo vi-incompatível. Isso pode ser novo para usuários que usaram outros editores no passado. A configuração “nocompatible” está incluída abaixo para destacar o fato de que um novo comportamento está sendo usado. Também lembra aqueles que mudariam para o modo “compatible” que esta deve ser a primeira configuração no arquivo de configuração. Isso é necessário porque ele altera outras configurações, e as sobrescrições devem vir depois desta configuração. Crie um arquivo de configuração padrão do vim executando o seguinte:

```bash
cat > /etc/vimrc << "EOF"
" Begin /etc/vimrc

" Ensure defaults are set before customizing settings, not after
source $VIMRUNTIME/defaults.vim
let skip_defaults_vim=1

set nocompatible
set backspace=2
set mouse=
syntax on
if (&term == "xterm") || (&term == "putty")
  set background=dark
endif

" End /etc/vimrc
EOF
```

A configuração set nocompatible faz com que o vim se comporte de uma maneira mais útil (o padrão) do que a maneira compatível com vi. Remova o “no” para manter o comportamento antigo do vi. A configuração set backspace=2 permite retroceder sobre quebras de linha, autoindentações e o início de uma inserção. O parâmetro syntax on habilita o realce de sintaxe do vim. A configuração set mouse= habilita a colagem correta de texto com o mouse ao trabalhar em chroot ou por uma conexão remota. Finalmente, a instrução if com a configuração set background=dark corrige a suposição do vim sobre a cor de fundo de alguns emuladores de terminal. Isso proporciona ao realce um esquema de cores melhor para uso no fundo preto desses programas.

A documentação para outras opções disponíveis pode ser obtida executando o seguinte comando:

```bash
vim -c ':options'
```

### Nota

Por padrão, o vim instala apenas arquivos de verificação ortográfica para o idioma inglês. Para instalar arquivos de verificação ortográfica para o seu idioma preferido, copie os arquivos .spl e, opcionalmente, os arquivos .sug para o seu idioma e codificação de caracteres de runtime/spell para /usr/share/vim/vim91/spell/.

Para usar esses arquivos de verificação ortográfica, é necessária alguma configuração em /etc/vimrc, por exemplo:

```
set spelllang=en,ru
set spell
```

Para mais informações, consulte runtime/spell/README.txt.

## 8.73.3. Conteúdo do Vim

### Descrições Breves

ex

Inicia o vim no modo ex

rview

É uma versão restrita de view; nenhum comando shell pode ser iniciado e view não pode ser suspenso

rvim

É uma versão restrita de vim; nenhum comando shell pode ser iniciado e vim não pode ser suspenso

vi

Link para vim

view

Inicia o vim no modo somente leitura

vim

É o editor

vimdiff

Edita duas ou três versões de um arquivo com vim e mostra as diferenças

vimtutor

Ensina as teclas e comandos básicos do vim

xxd

Cria um dump hexadecimal do arquivo fornecido; ele também pode realizar a operação inversa, portanto, pode ser usado para aplicação de patches binários

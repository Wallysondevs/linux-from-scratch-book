# 8.12. Readline-8.3

O pacote Readline é um conjunto de bibliotecas que oferecem recursos de edição de linha de comando e histórico.

## 8.12.1. Instalação do Readline

Reinstalar o Readline fará com que as bibliotecas antigas sejam movidas para <libraryname>.old. Embora isso normalmente não seja um problema, em alguns casos, pode acionar um bug de linkagem no ldconfig. Isso pode ser evitado emitindo os dois seds a seguir:

```bash
sed -i '/MV.*old/d' Makefile.in
sed -i '/{OLDSUFF}/c:' support/shlib-install
```

Evite codificar caminhos de busca de biblioteca (rpath) nas bibliotecas compartilhadas. Este pacote não precisa de rpath para uma instalação no local padrão, e rpath pode, às vezes, causar efeitos indesejados ou até mesmo problemas de segurança:

```bash
sed -i 's/-Wl,-rpath,[^ ]*//' support/shobj-conf
```

Prepare o Readline para compilação:

```bash
./configure --prefix=/usr    \
            --disable-static \
            --with-curses    \
            --docdir=/usr/share/doc/readline-8.3
```

O significado da nova opção de configuração:

Esta opção informa ao Readline que ele pode encontrar as funções da biblioteca termcap na biblioteca curses, não em uma biblioteca termcap separada. Isso gerará o arquivo readline.pc correto.

Compile o pacote:

```bash
make SHLIB_LIBS="-lncursesw"
```

O significado da opção make:

Esta opção força o Readline a linkar com a biblioteca libncursesw. Para detalhes, consulte a seção “Shared Libraries” no arquivo README do pacote.

Este pacote não vem com um conjunto de testes.

Instale o pacote:

```bash
make install
```

Se desejado, instale a documentação:

```bash
install -v -m644 doc/*.{ps,pdf,html,dvi} /usr/share/doc/readline-8.3
```

## 8.12.2. Conteúdo do Readline

### Descrições Breves

libhistory

Fornece uma interface de usuário consistente para recuperar linhas do histórico

libreadline

Fornece um conjunto de comandos para manipular texto inserido em uma sessão interativa de um programa

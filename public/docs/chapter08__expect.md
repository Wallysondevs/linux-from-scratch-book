# 8.17. Expect-5.45.4

O pacote Expect contém ferramentas para automatizar, via diálogos scriptados, aplicativos interativos como telnet, ftp, passwd, fsck, rlogin e tip. Expect também é útil para testar esses mesmos aplicativos, bem como para facilitar todo tipo de tarefas que são proibitivamente difíceis com qualquer outra coisa. O framework DejaGnu é escrito em Expect.

## 8.17.1. Instalação do Expect

Expect precisa de PTYs para funcionar. Verifique se os PTYs estão funcionando corretamente dentro do ambiente chroot executando um teste simples:

```bash
python3 -c 'from pty import spawn; spawn(["echo", "ok"])'
```

Este comando deve exibir ok. Se, em vez disso, a saída incluir OSError: out of pty devices, então o ambiente não está configurado para a operação correta de PTY. Você precisa sair do ambiente chroot, ler [Seção 7.3, “Preparando Sistemas de Arquivos Virtuais do Kernel”](#/page/chapter07__kernfs) novamente, e certificar-se de que o sistema de arquivos devpts (e outros sistemas de arquivos virtuais do kernel) esteja montado corretamente. Em seguida, reentre no ambiente chroot seguindo a [Seção 7.4, “Entrando no Ambiente Chroot”](#/page/chapter07__chroot). Este problema precisa ser resolvido antes de continuar, ou os conjuntos de testes que exigem Expect (por exemplo, os conjuntos de testes de Bash, Binutils, GCC, GDBM e, claro, o próprio Expect) falharão catastroficamente, e outras falhas sutis também podem ocorrer.

Agora, faça algumas alterações para permitir o pacote com gcc-15.1 ou posterior:

```bash
patch -Np1 -i ../expect-5.45.4-gcc15-1.patch
```

Prepare o Expect para compilação:

```bash
./configure --prefix=/usr           \
            --with-tcl=/usr/lib     \
            --enable-shared         \
            --disable-rpath         \
            --mandir=/usr/share/man \
            --with-tclinclude=/usr/include
```

O significado das opções do configure:

Este parâmetro é necessário para informar ao configure onde o script tclConfig.sh está localizado.

Isso informa explicitamente ao Expect onde encontrar os cabeçalhos internos do Tcl.

Construa o pacote:

```bash
make
```

Para testar os resultados, execute:

```bash
make test
```

Instale o pacote:

```bash
make install
ln -svf expect5.45.4/libexpect5.45.4.so /usr/lib
```

## 8.17.2. Conteúdo do Expect

### Descrições Breves

expect

Comunica-se com outros programas interativos de acordo com um script

libexpect-5.45.4.so

Contém funções que permitem que o Expect seja usado como uma extensão Tcl ou para ser usado diretamente de C ou C++ (sem Tcl)

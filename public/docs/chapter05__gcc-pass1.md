# 5.3. GCC-15.2.0 - Passagem 1

O pacote GCC contém a coleção de compiladores GNU, que inclui os compiladores C e C++.

## 5.3.1. Instalação do Cross GCC

O GCC requer os pacotes GMP, MPFR e MPC. Como esses pacotes podem não estar incluídos na sua distribuição host, eles serão construídos com o GCC. Descompacte cada pacote no diretório de origem do GCC e renomeie os diretórios resultantes para que os procedimentos de build do GCC os utilizem automaticamente:

### Nota

Existem mal-entendidos frequentes sobre este capítulo. Os procedimentos são os mesmos de todos os outros capítulos, conforme explicado anteriormente (instruções de build de pacotes). Primeiro, extraia o tarball gcc-15.2.0 do diretório sources e então mude para o diretório criado. Somente então você deve prosseguir com as instruções abaixo.

```bash
tar -xf ../mpfr-4.2.2.tar.xz
mv -v mpfr-4.2.2 mpfr
tar -xf ../gmp-6.3.0.tar.xz
mv -v gmp-6.3.0 gmp
tar -xf ../mpc-1.3.1.tar.gz
mv -v mpc-1.3.1 mpc
```

Em hosts x86_64, defina o nome do diretório padrão para bibliotecas de 64 bits como “lib”:

```bash
case $(uname -m) in
  x86_64)
    sed -e '/m64=/s/lib64/lib/' \
        -i.orig gcc/config/i386/t-linux64
 ;;
esac
```

### Nota

Este exemplo demonstra o uso da flag -i.orig. Ele faz o sed copiar o arquivo t-linux64 para t-linux64.orig, e então editar o arquivo t-linux64 original no local. Assim, você pode executar diff -u gcc/config/i386/t-linux64{.orig,} para visualizar a alteração feita pelo comando sed posteriormente. Nós simplesmente usaremos -i (que apenas edita o arquivo original no local sem copiá-lo) para todos os outros pacotes no livro, mas você pode alterá-lo para -i.orig em qualquer caso que deseje manter uma cópia do arquivo original.

A documentação do GCC recomenda construir o GCC em um diretório de build dedicado:

```bash
mkdir -v build
cd       build
```

Prepare o GCC para compilação:

```bash
../configure                  \
    --target=$LFS_TGT         \
    --prefix=$LFS/tools       \
    --with-glibc-version=2.42 \
    --with-sysroot=$LFS       \
    --with-newlib             \
    --without-headers         \
    --enable-default-pie      \
    --enable-default-ssp      \
    --disable-nls             \
    --disable-shared          \
    --disable-multilib        \
    --disable-threads         \
    --disable-libatomic       \
    --disable-libgomp         \
    --disable-libquadmath     \
    --disable-libssp          \
    --disable-libvtv          \
    --disable-libstdcxx       \
    --enable-languages=c,c++
```

O significado das opções do configure:

Esta opção especifica a versão do Glibc que será usada no target. Não é relevante para a libc da distro host porque tudo compilado pelo pass1 GCC será executado no ambiente chroot, que é isolado da libc da distro host.

Como uma biblioteca C funcional ainda não está disponível, isso garante que a constante inhibit_libc seja definida ao construir o libgcc. Isso impede a compilação de qualquer código que exija suporte à libc.

Ao criar um cross-compiler completo, o GCC requer cabeçalhos padrão compatíveis com o sistema target. Para nossos propósitos, esses cabeçalhos não serão necessários. Esta flag impede o GCC de procurá-los.

Essas flags permitem ao GCC compilar programas com alguns recursos de segurança de hardening (mais informações sobre eles na [nota sobre PIE e SSP](#/page/chapter08__gcc) no capítulo 8) por padrão. Eles não são estritamente necessários nesta fase, já que o compilador produzirá apenas executáveis temporários. Mas é mais limpo ter os pacotes temporários o mais próximo possível dos finais.

Esta flag força o GCC a linkar suas bibliotecas internas estaticamente. Precisamos disso porque as bibliotecas compartilhadas requerem o Glibc, que ainda não está instalado no sistema target.

Em x86_64, o LFS não suporta uma configuração multilib. Esta flag é inofensiva para x86.

Essas flags desabilitam o suporte para threading, libatomic, libgomp, libquadmath, libssp, libvtv e a biblioteca padrão C++, respectivamente. Esses recursos podem falhar ao compilar ao construir um cross-compiler e não são necessários para a tarefa de cross-compilar a libc temporária.

Esta opção garante que apenas os compiladores C e C++ sejam construídos. Estas são as únicas linguagens necessárias agora.

Compile o GCC executando:

```bash
make
```

Instale o pacote:

```bash
make install
```

Este build do GCC instalou alguns cabeçalhos de sistema internos. Normalmente um deles, limits.h, incluiria por sua vez o cabeçalho limits.h do sistema correspondente, neste caso, $LFS/usr/include/limits.h. No entanto, no momento deste build do GCC, $LFS/usr/include/limits.h não existe, então o cabeçalho interno que acabou de ser instalado é um arquivo parcial e autocontido e não inclui os recursos estendidos do cabeçalho do sistema. Isso é adequado para construir o Glibc, mas o cabeçalho interno completo será necessário mais tarde. Crie uma versão completa do cabeçalho interno usando um comando idêntico ao que o sistema de build do GCC faz em circunstâncias normais:

### Nota

O comando abaixo mostra um exemplo de substituição de comando aninhada usando dois métodos: backquotes e uma construção $(). Poderia ser reescrito usando o mesmo método para ambas as substituições, mas é mostrado desta forma para demonstrar como eles podem ser misturados. Geralmente o método $() é preferido.

```bash
cd ..
cat gcc/limitx.h gcc/glimits.h gcc/limity.h > \
  `dirname $($LFS_TGT-gcc -print-libgcc-file-name)`/include/limits.h
```

Detalhes sobre este pacote estão localizados em [Seção 8.29.2, “Conteúdo do GCC.”](#/page/chapter08__gcc)

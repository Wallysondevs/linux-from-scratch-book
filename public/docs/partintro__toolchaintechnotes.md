# ii. Notas Técnicas da Toolchain

Esta seção explica parte da fundamentação e dos detalhes técnicos por trás do método de build geral. Não tente entender imediatamente tudo nesta seção. A maior parte desta informação ficará mais clara após realizar um build real. Volte e releia este capítulo a qualquer momento durante o processo de build.

O objetivo geral do [Capítulo 5](#/page/chapter05__chapter05) e do [Capítulo 6](#/page/chapter06__chapter06) é produzir uma área temporária contendo um conjunto de ferramentas que são conhecidas por serem boas e que estão isoladas do sistema host. Ao usar o comando chroot, as compilações nos capítulos restantes serão isoladas dentro desse ambiente, garantindo um build limpo e sem problemas do sistema LFS target. O processo de build foi projetado para minimizar os riscos para novos leitores e para fornecer o maior valor educacional ao mesmo tempo.

Este processo de build é baseado em cross-compilation. Cross-compilation é normalmente usada para buildar um compilador e sua toolchain associada para uma máquina diferente daquela usada para o build. Isso não é estritamente necessário para o LFS, já que a máquina onde o novo sistema irá rodar é a mesma usada para o build. Mas a cross-compilation tem uma grande vantagem: qualquer coisa que seja cross-compiled não pode depender do ambiente host.

## Sobre Cross-Compilation

### Nota

O livro LFS não é (e não contém) um tutorial geral para buildar uma toolchain cross- (ou nativa). Não use os comandos do livro para uma cross-toolchain para outro propósito que não seja buildar o LFS, a menos que você realmente entenda o que está fazendo.

É sabido que instalar o GCC pass 2 quebrará a cross-toolchain. Não consideramos isso um bug porque o GCC pass 2 é o último package a ser cross-compiled no livro, e não o “consertaremos” até que realmente precisemos cross-compilear algum package após o GCC pass 2 no futuro.

Cross-compilation envolve alguns conceitos que merecem uma seção própria. Embora esta seção possa ser omitida em uma primeira leitura, voltar a ela mais tarde o ajudará a obter uma compreensão mais completa do processo.

Vamos primeiro definir alguns termos usados neste contexto.

é a máquina onde buildamos programas. Note que esta máquina também é referida como o “host.”

é a máquina/sistema onde os programas buildados irão rodar. Note que este uso de “host” não é o mesmo que em outras seções.

é usado apenas para compiladores. É a máquina para a qual o compilador produz código. Pode ser diferente tanto do build quanto do host.

Como exemplo, vamos imaginar o seguinte cenário (às vezes referido como “Canadian Cross”). Temos um compilador em uma máquina lenta apenas, vamos chamá-la de máquina A, e o compilador ccA. Também temos uma máquina rápida (B), mas nenhum compilador para (B), e queremos produzir código para uma terceira máquina lenta (C). Buildaremos um compilador para a máquina C em três estágios.

Então, todos os programas necessários pela máquina C podem ser compilados usando cc2 na máquina rápida B. Note que, a menos que B possa rodar programas produzidos para C, não há como testar os programas recém-buildados até que a própria máquina C esteja rodando. Por exemplo, para rodar uma test suite em ccC, podemos querer adicionar um quarto estágio:

No exemplo acima, apenas cc1 e cc2 são cross-compilers, ou seja, eles produzem código para uma máquina diferente daquela em que são executados. Os outros compiladores ccA e ccC produzem código para a máquina em que são executados. Tais compiladores são chamados de compiladores nativos.

## Implementação de Cross-Compilation para LFS

### Nota

Todos os packages cross-compiled neste livro usam um sistema de building baseado em autoconf. O sistema de building baseado em autoconf aceita tipos de sistema no formato cpu-vendor-kernel-os, referido como o system triplet. Como o campo vendor é frequentemente irrelevante, o autoconf permite omiti-lo.

Um leitor astuto pode se perguntar por que um “triplet” se refere a um nome de quatro componentes. O campo kernel e o campo os começaram como um único campo “system”. Tal forma de três campos ainda é válida hoje para alguns sistemas, por exemplo, x86_64-unknown-freebsd. Mas dois sistemas podem compartilhar o mesmo kernel e ainda serem muito diferentes para usar o mesmo triplet para descrevê-los. Por exemplo, Android rodando em um telefone celular é completamente diferente de Ubuntu rodando em um servidor ARM64, mesmo que ambos estejam rodando no mesmo tipo de CPU (ARM64) e usando o mesmo kernel (Linux).

Sem uma camada de emulação, você não pode rodar um executável para um servidor em um telefone celular ou vice-versa. Então o campo “system” foi dividido em campos kernel e os, para designar esses sistemas de forma inequívoca. Em nosso exemplo, o sistema Android é designado aarch64-unknown-linux-android, e o sistema Ubuntu é designado aarch64-unknown-linux-gnu.

A palavra “triplet” permanece incorporada ao léxico. Uma maneira simples de determinar seu system triplet é rodar o script config.guess que vem com o source de muitos packages. Descompacte os sources do binutils, rode o script ./config.guess, e anote a saída. Por exemplo, para um processador Intel de 32 bits a saída será i686-pc-linux-gnu. Em um sistema de 64 bits será x86_64-pc-linux-gnu. Na maioria dos sistemas Linux, o comando ainda mais simples gcc -dumpmachine lhe dará informações semelhantes.

Você também deve estar ciente do nome do dynamic linker da plataforma, frequentemente referido como dynamic loader (não confundir com o linker padrão ld que faz parte do binutils). O dynamic linker fornecido pelo package glibc encontra e carrega as shared libraries necessárias por um programa, prepara o programa para rodar e então o executa. O nome do dynamic linker para uma máquina Intel de 32 bits é ld-linux.so.2; é ld-linux-x86-64.so.2 em sistemas de 64 bits. Uma maneira infalível de determinar o nome do dynamic linker é inspecionar um binário aleatório do sistema host rodando: readelf -l <name of binary> | grep interpreter e anotando a saída. A referência autoritativa cobrindo todas as plataformas está em [uma página wiki do Glibc](https://sourceware.org/glibc/wiki/ABIList).

Existem dois pontos chave para uma cross-compilation:

- Ao produzir e processar o machine code suposto para ser executado no “the host,” a cross-toolchain deve ser usada. Note que a native toolchain do “the build” ainda pode ser invocada para gerar machine code suposto para ser executado no “the build.” Por exemplo, o build system pode compilar um gerador com a native toolchain, então gerar um arquivo source C com o gerador, e finalmente compilar o arquivo source C com a cross-toolchain para que o código gerado possa rodar no “the host.” Com um build system baseado em autoconf, este requisito é garantido usando o switch --host para especificar o triplet “the host.” Com este switch, o build system usará os componentes da toolchain prefixados com <the host triplet> para gerar e processar o machine code para “the host”; ex: o compiler será <the host triplet>-gcc e a ferramenta readelf será <the host triplet>-readelf.

- O build system não deve tentar rodar nenhum machine code gerado suposto para ser executado no “the host.” Por exemplo, ao buildar uma utility nativamente, sua man page pode ser gerada rodando a utility com o switch --help e processando a saída, mas geralmente não é possível fazer isso para uma cross-compilation, pois a utility pode falhar ao rodar no “the build”: é obviamente impossível rodar machine code ARM64 em uma CPU x86 (sem um emulator). Com um build system baseado em autoconf, este requisito é satisfeito no “cross-compilation mode” onde as features opcionais que exigem rodar machine code para “the host” durante o build time são desabilitadas. Quando o triplet “the host” é explicitamente especificado, o “cross-compilation mode” é habilitado se e somente se o script configure falhar ao rodar um programa dummy compilado em machine code “the host,” ou o triplet “the build” for explicitamente especificado via o switch --build e for diferente do triplet “the host.”

Para cross-compilear um package para o sistema temporário LFS, o nome do system triplet é ligeiramente ajustado alterando o campo "vendor" na variável LFS_TGT para que diga "lfs" e LFS_TGT é então especificado como o triplet “the host” via --host, para que a cross-toolchain seja usada para gerar e processar o machine code rodando como parte do sistema temporário LFS. E, também precisamos habilitar o “cross-compilation mode”: apesar do machine code “the host,” ou seja, o machine code para o sistema temporário LFS, ser capaz de executar na CPU atual, ele pode se referir a uma library não disponível no “the build” (a host distro), ou algum code ou data inexistente ou definido de forma diferente na library, mesmo que esteja disponível. Ao cross-compilear um package para o sistema temporário LFS, não podemos confiar no script configure para detectar este problema com o programa dummy: o dummy usa apenas alguns componentes em libc que a libc da host distro provavelmente fornece (a menos que, talvez, a host distro use uma implementação de libc diferente como Musl), então ele não falhará como os programas realmente úteis provavelmente fariam. Assim, devemos especificar explicitamente o triplet “the build” para habilitar o “cross-compilation mode.” O valor que usamos é apenas o default, ou seja, o system triplet original da saída do config.guess, mas o “cross-compilation mode” depende de uma especificação explícita, como discutimos.

Usamos a opção --with-sysroot ao buildar o cross-linker e o cross-compiler, para dizer a eles onde encontrar os arquivos necessários para “the host.” Isso quase garante que nenhum dos outros programas buildados no [Capítulo 6](#/page/chapter06__chapter06) possa linkar para libraries no “the build.” A palavra “quase” é usada porque o libtool, um wrapper de “compatibilidade” do compiler e do linker para build systems baseados em autoconf, pode tentar ser muito inteligente e passar opções erroneamente, permitindo que o linker encontre libraries do “the build.” Para evitar essa consequência, precisamos deletar os arquivos libtool archive (.la) e corrigir uma cópia desatualizada do libtool enviada com o code do Binutils.

Na tabela precedente, “on pc” significa que os comandos são rodados em uma máquina usando a distribuição já instalada. “On lfs” significa que os comandos são rodados em um ambiente chrooted.

Este ainda não é o fim da história. A linguagem C não é meramente um compiler; ela também define uma standard library. Neste livro, a GNU C library, chamada glibc, é usada (existe uma alternativa, "musl"). Esta library deve ser compilada para a máquina LFS; ou seja, usando o cross-compiler cc1. Mas o compiler em si usa uma internal library que fornece sub-rotinas complexas para funções não disponíveis no instruction set do assembler. Esta internal library é chamada libgcc, e deve ser linkada à library glibc para ser totalmente funcional. Além disso, a standard library para C++ (libstdc++) também deve ser linkada com glibc. A solução para este problema de ovo e galinha é primeiro buildar uma libgcc degradada baseada em cc1, faltando algumas funcionalidades como threads e exception handling, e então buildar glibc usando este compiler degradado (o próprio glibc não é degradado), e também buildar libstdc++. Esta última library terá falta de algumas das funcionalidades da libgcc.

A conclusão do parágrafo precedente é que o cc1 é incapaz de buildar uma libstdc++ totalmente funcional com a libgcc degradada, mas o cc1 é o único compiler disponível para buildar as libraries C/C++ durante o stage 2. Como discutimos, não podemos rodar cc-lfs no pc (a host distro) porque ele pode exigir alguma library, code ou data não disponível no “the build” (a host distro). Então, quando buildamos o gcc stage 2, sobrescrevemos o library search path para linkar libstdc++ contra a libgcc recém-rebuildada em vez do build antigo e degradado. Isso torna a libstdc++ rebuildada totalmente funcional.

No [Capítulo 8](#/page/chapter08__chapter08) (ou “stage 3”), todos os packages necessários para o sistema LFS são buildados. Mesmo que um package já tenha sido instalado no sistema LFS em um capítulo anterior, ainda rebuildamos o package. A principal razão para rebuildar esses packages é torná-los estáveis: se reinstalarmos um package LFS em um sistema LFS completo, o conteúdo reinstalado do package deve ser o mesmo que o conteúdo do mesmo package quando instalado pela primeira vez no [Capítulo 8](#/page/chapter08__chapter08). Os packages temporários instalados no [Capítulo 6](#/page/chapter06__chapter06) ou [Capítulo 7](#/page/chapter07__chapter07) não podem satisfazer este requisito, porque algumas features opcionais deles são desabilitadas devido a dependências ausentes ou ao “cross-compilation mode.” Adicionalmente, uma razão menor para rebuildar os packages é rodar as test suites.

## Outros Detalhes Procedurais

O cross-compiler será instalado em um diretório $LFS/tools separado, já que não fará parte do sistema final.

O Binutils é instalado primeiro porque as execuções do configure de ambos gcc e glibc realizam vários feature tests no assembler e linker para determinar quais software features habilitar ou desabilitar. Isso é mais importante do que se pode perceber à primeira vista. Um gcc ou glibc configurado incorretamente pode resultar em uma toolchain sutilmente quebrada, onde o impacto de tal quebra pode não aparecer até perto do final do build de uma distribuição inteira. Uma falha na test suite geralmente destacará este erro antes que muito trabalho adicional seja realizado.

O Binutils instala seu assembler e linker em dois locais, $LFS/tools/bin e $LFS/tools/$LFS_TGT/bin. As ferramentas em um local são hard linked para o outro. Uma faceta importante do linker é sua library search order. Informações detalhadas podem ser obtidas do ld passando a flag --verbose. Por exemplo, $LFS_TGT-ld --verbose | grep SEARCH ilustrará os search paths atuais e sua ordem. (Note que este exemplo pode ser rodado como mostrado apenas enquanto logado como usuário lfs. Se você voltar a esta página mais tarde, substitua $LFS_TGT-ld por ld).

O próximo package instalado é o gcc. Um exemplo do que pode ser visto durante sua execução do configure é:

```
checking what assembler to use... /mnt/lfs/tools/i686-lfs-linux-gnu/bin/as
checking what linker to use... /mnt/lfs/tools/i686-lfs-linux-gnu/bin/ld
```

Isso é importante pelas razões mencionadas acima. Também demonstra que o script configure do gcc não pesquisa os diretórios PATH para encontrar quais tools usar. No entanto, durante a operação real do próprio gcc, os mesmos search paths não são necessariamente usados. Para descobrir qual standard linker o gcc usará, rode: $LFS_TGT-gcc -print-prog-name=ld. (Novamente, remova o prefixo $LFS_TGT- se voltar a isso mais tarde.)

Informações detalhadas podem ser obtidas do gcc passando a opção de linha de comando -v ao compilar um programa. Por exemplo, $LFS_TGT-gcc -v example.c (ou sem $LFS_TGT- se voltar mais tarde) mostrará informações detalhadas sobre os estágios de preprocessor, compilation e assembly, incluindo os search paths do gcc para included headers e sua ordem.

A seguir: sanitized Linux API headers. Estes permitem que a standard C library (glibc) faça interface com features que o Linux kernel fornecerá.

Em seguida vem o glibc. Este é o primeiro package que cross-compileamos. Usamos a opção --host=$LFS_TGT para fazer com que o build system use as tools prefixadas com $LFS_TGT-, e a opção --build=$(../scripts/config.guess) para habilitar o “cross-compilation mode” como discutimos. A variável DESTDIR é usada para forçar a instalação no file system LFS.

Conforme mencionado acima, a biblioteca padrão C++ é compilada em seguida, seguida em [Capítulo 6](#/page/chapter06__chapter06) por outros programas que devem ser compilados de forma cruzada para quebrar dependências circulares durante o build. Os passos para esses packages são semelhantes aos passos para o glibc.

Ao final do [Capítulo 6](#/page/chapter06__chapter06) o compilador LFS nativo é instalado. Primeiro, o binutils-pass2 é construído, no mesmo diretório DESTDIR que os outros programas, então a segunda passagem do gcc é construída, omitindo algumas bibliotecas não críticas.

Ao entrar no ambiente chroot em [Capítulo 7](#/page/chapter07__chapter07), as instalações temporárias dos programas necessários para o funcionamento adequado da toolchain são realizadas. A partir deste ponto, a toolchain principal é autocontida e auto-hospedada. Em [Capítulo 8](#/page/chapter08__chapter08), versões finais de todos os packages necessários para um sistema totalmente funcional são construídas, testadas e instaladas.

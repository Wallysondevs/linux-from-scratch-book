# vi. Justificativa para os Pacotes no Livro

O objetivo do LFS é construir um sistema completo e utilizável de nível fundamental — incluindo todos os packages necessários para replicar a si mesmo — e fornecer uma base relativamente mínima a partir da qual personalizar um sistema mais completo com base nas escolhas do usuário. Isso não significa que o LFS seja o menor sistema possível. Vários packages importantes estão incluídos que não são, estritamente falando, necessários. A lista abaixo documenta as razões pelas quais cada package no livro foi incluído.

- Acl Este package contém utilitários para administrar Listas de Controle de Acesso, que são usadas para definir direitos de acesso discricionários granulares para arquivos e diretórios.

- Attr Este package contém programas para gerenciar atributos estendidos em objetos do sistema de arquivos.

- Autoconf Este package fornece programas para produzir shell scripts que podem configurar automaticamente o código-fonte a partir de um template de desenvolvedor. É frequentemente necessário para reconstruir um package após o procedimento de build ter sido atualizado.

- Automake Este package contém programas para gerar Make files a partir de um template. É frequentemente necessário para reconstruir um package após o procedimento de build ter sido atualizado.

- Bash Este package satisfaz um requisito central do LSB para fornecer uma interface Bourne Shell ao sistema. Foi escolhido em detrimento de outros shell packages devido ao seu uso comum e capacidades extensivas.

- Bc Este package fornece uma linguagem de processamento numérico de precisão arbitrária. Ele satisfaz um requisito para o build do kernel Linux.

- Binutils Este package fornece um linker, um assembler e outras ferramentas para manipular arquivos objeto. Os programas neste package são necessários para compilar a maioria dos packages em um sistema LFS.

- Bison Este package contém a versão GNU do yacc (Yet Another Compiler Compiler) necessária para o build de vários programas LFS.

- Bzip2 Este package contém programas para comprimir e descompactar arquivos. É necessário para descompactar muitos packages LFS.

- Check Este package fornece uma estrutura de teste para outros programas.

- Coreutils Este package contém vários programas essenciais para visualizar e manipular arquivos e diretórios. Esses programas são necessários para o gerenciamento de arquivos por linha de comando e são essenciais para os procedimentos de instalação de cada package no LFS.

- D-Bus Este package contém programas para implementar um sistema de barramento de mensagens, uma maneira simples para as aplicações se comunicarem entre si.

- DejaGNU Este package fornece um framework para testar outros programas.

- Diffutils Este package contém programas que mostram as diferenças entre arquivos ou diretórios. Esses programas podem ser usados para criar patches e também são utilizados nos procedimentos de build de muitos packages.

- E2fsprogs Este package fornece utilitários para manipular os sistemas de arquivos ext2, ext3 e ext4. Estes são os sistemas de arquivos mais comuns e exaustivamente testados que o Linux suporta.

- Expat Este package fornece uma biblioteca de parsing XML relativamente pequena. É requerido pelo módulo Perl XML::Parser.

- Expect Este package contém um programa para realizar diálogos scriptados com outros programas interativos. É comumente usado para testar outros packages.

- File Este package contém um utilitário para determinar o tipo de um dado arquivo ou arquivos. Alguns packages precisam dele em seus build scripts.

- Findutils Este package fornece programas para encontrar arquivos em um sistema de arquivos. É usado nos build scripts de muitos packages.

- Flex Este package contém um utilitário para gerar programas que reconhecem padrões em texto. É a versão GNU do programa lex (analisador léxico). É necessário para o build de vários packages LFS.

- Gawk Este package fornece programas para manipular arquivos de texto. É a versão GNU do awk (Aho-Weinberg-Kernighan). É usado nos build scripts de muitos outros packages.

- GCC Esta é a Gnu Compiler Collection. Ela contém os compiladores C e C++, bem como vários outros não construídos pelo LFS.

- GDBM Este package contém a biblioteca GNU Database Manager. É usado por um outro package LFS, o Man-DB.

- Gettext Este package fornece utilitários e bibliotecas para a internacionalização e localização de muitos packages.

- Glibc Este package contém a principal biblioteca C. Programas Linux não funcionarão sem ela.

- GMP Este package fornece bibliotecas matemáticas que fornecem funções úteis para aritmética de precisão arbitrária. É necessário para o build do GCC.

- Gperf Este package produz um programa que gera uma função hash perfeita a partir de um conjunto de chaves. É requerido pelo Systemd.

- Grep Este package contém programas para pesquisar em arquivos. Esses programas são usados nos build scripts da maioria dos packages.

- Groff Este package contribui com programas para processar e formatar texto. Uma função importante desses programas é formatar páginas man.

- GRUB Este é o Grand Unified Boot Loader. É o mais flexível de vários boot loaders disponíveis.

- Gzip Este package contém programas para comprimir e descompactar arquivos. É necessário para descompactar muitos packages no LFS.

- Iana-etc Este package fornece dados para serviços e protocolos de rede. É necessário para habilitar capacidades de rede adequadas.

- Inetutils Este package fornece programas para administração básica de rede.

- Intltool Este package contribui com ferramentas para extrair strings traduzíveis de arquivos-fonte.

- IProute2 Este package contém programas para rede IPv4 e IPv6 básica e avançada. Foi escolhido em detrimento do outro package comum de ferramentas de rede (net-tools) por suas capacidades IPv6.

- Jinja2 Este package é um módulo Python para templating de texto. É requerido para o build do Systemd.

- Kbd Este package produz arquivos de tabela de teclas, utilitários de teclado para teclados não-americanos e várias fontes de console.

- Kmod Este package fornece programas necessários para administrar módulos do kernel Linux.

- Less Este package contém um visualizador de arquivos de texto muito bom que permite rolar para cima ou para baixo ao visualizar um arquivo. Muitos packages o utilizam para paginar a saída.

- Libcap Este pacote implementa as interfaces de userspace para as capacidades POSIX 1003.1e disponíveis em kernels Linux.

- Libelf O projeto elfutils fornece bibliotecas e ferramentas para arquivos ELF e dados DWARF. A maioria das utilidades neste pacote está disponível em outros packages, mas a biblioteca é necessária para build o Linux kernel usando a configuração padrão (e mais eficiente).

- Libffi Este pacote implementa uma interface de programação portátil e de alto nível para várias convenções de chamada. Alguns programas podem não saber no momento da compilação quais argumentos devem ser passados para uma função. Por exemplo, um interpretador pode ser informado em tempo de execução sobre o número e os tipos de argumentos usados para chamar uma determinada função. Libffi pode ser usado em tais programas para fornecer uma ponte do programa interpretador para código compilado.

- Libpipeline O package Libpipeline fornece uma biblioteca para manipular pipelines de subprocessos de uma forma flexível e conveniente. É requerido pelo package Man-DB.

- Libtool Este pacote contém o script de suporte de biblioteca genérico GNU. Ele encapsula a complexidade do uso de bibliotecas compartilhadas em uma interface consistente e portátil. É necessário pelas test suites em outros packages LFS.

- Libxcrypt Este pacote fornece a biblioteca libcrypt necessária por vários packages (notavelmente, Shadow) para hashing de senhas. Ele substitui a implementação obsoleta de libcrypt no Glibc.

- Linux Kernel Este pacote é o Sistema Operacional. É o Linux no ambiente GNU/Linux.

- M4 Este pacote fornece um processador de macro de texto geral útil como uma build tool para outros programas.

- Make Este pacote contém um programa para direcionar o build de packages. É requerido por quase todo package no LFS.

- MarkupSafe Este pacote é um módulo Python para processar strings em HTML/XHTML/XML de forma segura. Jinja2 requer este pacote.

- Man-DB Este pacote contém programas para encontrar e visualizar man pages. Foi escolhido em vez do package man devido às suas capacidades superiores de internacionalização. Ele fornece o programa man.

- Man-pages Este pacote fornece o conteúdo real das man pages básicas do Linux.

- Meson Este pacote fornece uma ferramenta de software para automatizar o build de software. O principal objetivo do Meson é minimizar a quantidade de tempo que os desenvolvedores de software precisam gastar configurando um build system. É requerido para build Systemd, assim como muitos packages BLFS.

- MPC Este pacote fornece funções aritméticas para números complexos. É requerido pelo GCC.

- MPFR Este pacote contém funções para aritmética de precisão múltipla. É requerido pelo GCC.

- Ninja Este pacote fornece um pequeno build system com foco em velocidade. Ele é projetado para ter seus arquivos de entrada gerados por um build system de nível superior e para executar builds o mais rápido possível. Este pacote é requerido pelo Meson.

- Ncurses Este pacote contém bibliotecas para manipulação de telas de caracteres independente de terminal. É frequentemente usado para fornecer controle de cursor para um sistema de menu. É necessário por vários dos packages no LFS.

- Openssl Este pacote fornece ferramentas de gerenciamento e bibliotecas relacionadas à criptografia. Estas fornecem funções criptográficas para outros packages, incluindo o Linux kernel.

- Patch Este pacote contém um programa para modificar ou criar arquivos aplicando um patch file tipicamente criado pelo programa diff. É necessário pelo build procedure para vários packages LFS.

- Perl Este pacote é um interpretador para a linguagem de runtime PERL. É necessário para a instalação e as test suites de vários packages LFS.

- Pkgconf Este pacote contém um programa que ajuda a configurar flags de compilador e linker para bibliotecas de desenvolvimento. O programa pode ser usado como um substituto direto de pkg-config, que é necessário pelo building system de muitos packages. É mantido mais ativamente e ligeiramente mais rápido que o package Pkg-config original.

- Procps-NG Este pacote contém programas para monitorar processos. Estes programas são úteis para administração de sistema e também são usados pelos LFS Bootscripts.

- Psmisc Este pacote produz programas para exibir informações sobre processos em execução. Estes programas são úteis para administração de sistema.

- Python 3 Este pacote fornece uma linguagem interpretada que possui uma filosofia de design que enfatiza a legibilidade do código.

- Readline Este pacote é um conjunto de bibliotecas que oferecem capacidades de edição de linha de comando e histórico. É usado pelo Bash.

- Sed Este pacote permite a edição de texto sem abri-lo em um editor de texto. Também é necessário por muitos configure scripts de packages LFS.

- Shadow Este pacote contém programas para lidar com senhas de forma segura.

- Systemd Este pacote fornece um programa init e várias capacidades adicionais de boot e controle de sistema como uma alternativa ao SysVinit. É usado por muitas distribuições Linux.

- Tar Este pacote fornece capacidades de arquivamento e extração de praticamente todos os packages usados no LFS.

- Tcl Este pacote contém a Tool Command Language usada em muitas test suites.

- Texinfo Este pacote fornece programas para ler, escrever e converter info pages. É usado nos procedimentos de instalação de muitos packages LFS.

- Util-linux Este pacote contém programas de utilidade diversos. Entre eles estão utilidades para lidar com file systems, consoles, partições e mensagens.

- Vim Este pacote fornece um editor. Foi escolhido devido à sua compatibilidade com o editor vi clássico e seu grande número de capacidades poderosas. Um editor é uma escolha muito pessoal para muitos usuários. Qualquer outro editor pode ser substituído, se desejar.

- Wheel Este pacote fornece um módulo Python que é a implementação de referência do padrão de packaging Python wheel.

- XML::Parser Este pacote é um módulo Perl que faz interface com o Expat.

- XZ Utils Este pacote contém programas para comprimir e descomprimir arquivos. Ele fornece a maior compressão geralmente disponível e é útil para descomprimir packages no formato XZ ou LZMA.

- Zlib Este pacote contém rotinas de compressão e descompressão usadas por alguns programas.

- Zstd Este pacote fornece rotinas de compressão e descompressão usadas por alguns programas. Ele fornece altas taxas de compressão e uma ampla gama de trade-offs de compressão / velocidade.

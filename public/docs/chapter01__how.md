# 1.1. Como Construir um Sistema LFS

O sistema LFS será construído usando uma distribuição Linux já instalada (como Debian, OpenMandriva, Fedora ou openSUSE). Este sistema Linux existente (o host) será usado como ponto de partida para fornecer os programas necessários, incluindo um compilador, linker e shell, para construir o novo sistema. Selecione a opção “development” durante a instalação da distribuição para incluir essas ferramentas.

### Nota

Existem muitas maneiras de instalar uma distribuição Linux e as configurações padrão geralmente não são ideais para construir um sistema LFS. Para sugestões sobre como configurar uma distribuição comercial, consulte: https://www.linuxfromscratch.org/hints/downloads/files/partitioning-for-lfs.txt.

Como alternativa à instalação de uma distribuição separada em sua máquina, você pode querer usar um LiveCD de uma distribuição comercial.

O Capítulo 2 deste livro descreve como criar uma nova partição nativa Linux e sistema de arquivos, onde o novo sistema LFS será compilado e instalado. O Capítulo 3 explica quais packages e patches devem ser baixados para construir um sistema LFS, e como armazená-los no novo sistema de arquivos. O Capítulo 4 discute a configuração de um ambiente de trabalho apropriado. Por favor, leia o Capítulo 4 cuidadosamente, pois ele explica várias questões importantes das quais você deve estar ciente antes de começar a trabalhar nos Capítulos 5 e seguintes.

O Capítulo 5 explica a instalação da toolchain inicial, (binutils, gcc e glibc) usando técnicas de cross-compilation para isolar as novas ferramentas do sistema host.

O Capítulo 6 mostra como cross-compilar utilitários básicos usando a cross-toolchain recém-construída.

O Capítulo 7 então entra em um ambiente "chroot", onde usamos as novas ferramentas para construir todas as outras ferramentas necessárias para criar o sistema LFS.

Este esforço para isolar o novo sistema da distribuição host pode parecer excessivo. Uma explicação técnica completa sobre o porquê isso é feito é fornecida em Toolchain Technical Notes.

No Capítulo 8, o sistema LFS completo é construído. Outra vantagem proporcionada pelo ambiente chroot é que ele permite que você continue usando o sistema host enquanto o LFS está sendo construído. Enquanto espera as compilações dos packages serem concluídas, você pode continuar usando seu computador normalmente.

Para finalizar a instalação, a configuração básica do sistema é estabelecida no Capítulo 9, e o kernel e o boot loader são criados no Capítulo 10. O Capítulo 11 contém informações sobre como continuar a experiência LFS além deste livro. Após os passos deste capítulo terem sido implementados, o computador está pronto para inicializar no novo sistema LFS.

Este é o processo em poucas palavras. Informações detalhadas sobre cada passo são apresentadas nos capítulos seguintes. Itens que parecem complicados agora serão esclarecidos, e tudo se encaixará à medida que você iniciar sua aventura LFS.

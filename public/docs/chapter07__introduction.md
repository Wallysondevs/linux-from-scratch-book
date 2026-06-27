# 7.1. Introdução

Este capítulo mostra como construir as últimas partes que faltam do sistema temporário: as ferramentas necessárias para construir os vários packages. Agora que todas as dependências circulares foram resolvidas, um ambiente chroot, completamente isolado do sistema operacional host (exceto pelo kernel em execução), pode ser usado para o build.

Para o funcionamento adequado do ambiente isolado, alguma comunicação com o kernel em execução deve ser estabelecida. Isso é feito através dos chamados Virtual Kernel File Systems, que serão montados antes de entrar no ambiente chroot. Você pode querer verificar se eles estão montados executando o comando findmnt.

Até a Seção 7.4, “Entrando no Ambiente Chroot”, os comandos devem ser executados como root, com a variável LFS definida. Após entrar no chroot, todos os comandos são executados como root, felizmente sem acesso ao OS do computador no qual você construiu o LFS. Tenha cuidado de qualquer forma, pois é fácil destruir todo o sistema LFS com comandos ruins.

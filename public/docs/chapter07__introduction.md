# 7.1. Introduction

Este capítulo mostra como construir os últimos componentes restantes do sistema temporário: as ferramentas necessárias para construir os vários packages. Agora que todas as dependências circulares foram resolvidas, um ambiente “chroot”, completamente isolado do sistema operacional host (exceto pelo kernel em execução), pode ser usado para o build.

Para o funcionamento adequado do ambiente isolado, alguma comunicação com o kernel em execução deve ser estabelecida. Isso é feito através dos chamados Sistemas de Arquivos Virtuais do Kernel, que serão montados antes de entrar no ambiente chroot. Você pode querer verificar se eles estão montados executando o comando findmnt.

Até [Seção 7.4, “Entrando no Ambiente Chroot”](#/page/chapter07__chroot), os comandos devem ser executados como root, com a variável LFS definida. Após entrar no chroot, todos os comandos são executados como root, felizmente sem acesso ao SO do computador no qual você construiu o LFS. Tenha cuidado de qualquer forma, pois é fácil destruir todo o sistema LFS com comandos ruins.

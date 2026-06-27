# 2.3. Building LFS in Stages

O LFS é projetado para ser construído em uma única sessão. Ou seja, as instruções assumem que o sistema não será desligado durante o processo. Isso não significa que o sistema precise ser construído de uma só vez. A questão é que certos procedimentos devem ser repetidos após uma reinicialização ao retomar o LFS em diferentes pontos.

## 2.3.1. Capítulos 1–4

Estes capítulos executam comandos no sistema host. Ao reiniciar, certifique-se de uma coisa:

- Procedimentos executados como o usuário root após a Seção 2.4 devem ter a variável de ambiente LFS definida PARA O USUÁRIO ROOT.

## 2.3.2. Capítulos 5–6

- A partição /mnt/lfs deve ser montada.

- Estes dois capítulos devem ser feitos como o usuário lfs. Um comando su - lfs deve ser emitido antes de executar qualquer tarefa nestes capítulos. Se você não fizer isso, corre o risco de instalar packages no host e, potencialmente, torná-lo inutilizável.

- Os procedimentos nas Instruções Gerais de Compilação são críticos. Se houver qualquer dúvida de que um package foi instalado corretamente, certifique-se de que o tarball previamente expandido foi removido, então re-extraia o package e complete todas as instruções naquela seção.

## 2.3.3. Capítulos 7–10

- A partição /mnt/lfs deve ser montada.

- Algumas operações, de “Preparando Sistemas de Arquivos Virtuais do Kernel” a “Entrando no Ambiente Chroot,” devem ser feitas como o usuário root, com a variável de ambiente LFS definida para o usuário root.

- Ao entrar no chroot, a variável de ambiente LFS deve ser definida para root. A variável LFS não é usada depois que o ambiente chroot foi acessado.

- Os sistemas de arquivos virtuais devem ser montados. Isso pode ser feito antes ou depois de entrar no chroot mudando para um terminal virtual host e, como root, executando os comandos em [Seção 7.3.1, “Montando e Preenchendo /dev”](#/page/chapter07__kernfs) e [Seção 7.3.2, “Montando Sistemas de Arquivos Virtuais do Kernel.”](#/page/chapter07__kernfs)

# 2.3. Construindo o LFS em Estágios

O LFS é projetado para ser construído em uma única sessão. Ou seja, as instruções assumem que o sistema não será desligado durante o processo. Isso não significa que o sistema precise ser construído de uma só vez. A questão é que certos procedimentos devem ser repetidos após uma reinicialização ao retomar o LFS em diferentes pontos.

## 2.3.1. Capítulos 1–4

Estes capítulos executam comandos no sistema host. Ao reiniciar, certifique-se de uma coisa:

- Procedimentos realizados como usuário root após a Seção 2.4 devem ter a variável de ambiente LFS definida PARA O USUÁRIO ROOT.

## 2.3.2. Capítulos 5–6

- A partição /mnt/lfs deve ser montada.

- Estes dois capítulos devem ser feitos como usuário lfs. Um comando su - lfs deve ser emitido antes de realizar qualquer tarefa nestes capítulos. Se você não fizer isso, corre o risco de instalar packages no host e, potencialmente, torná-lo inutilizável.

- Os procedimentos em General Compilation Instructions são críticos. Se houver qualquer dúvida de que um package foi instalado corretamente, certifique-se de que o tarball previamente expandido foi removido, então re-extraia o package e complete todas as instruções naquela seção.

## 2.3.3. Capítulos 7–10

- A partição /mnt/lfs deve ser montada.

- Algumas operações, de “Preparing Virtual Kernel File Systems” a “Entering the Chroot Environment,” devem ser feitas como usuário root, com a variável de ambiente LFS definida para o usuário root.

- Ao entrar no chroot, a variável de ambiente LFS deve ser definida para root. A variável LFS não é usada depois que o ambiente chroot foi acessado.

- Os sistemas de arquivos virtuais devem ser montados. Isso pode ser feito antes ou depois de entrar no chroot, mudando para um terminal virtual host e, como root, executando os comandos na Seção 7.3.1, “Mounting and Populating /dev” e na Seção 7.3.2, “Mounting Virtual Kernel File Systems.”

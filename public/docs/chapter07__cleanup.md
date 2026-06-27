# 7.13. Limpando e Salvando o Sistema Temporário

## 7.13.1. Limpeza

Primeiro, remova os arquivos de documentação atualmente instalados para evitar que acabem no sistema final, e para economizar cerca de 35 MB:

```bash
rm -rf /usr/share/{info,man,doc}/*
```

Segundo, em um sistema Linux moderno, os arquivos .la do libtool são úteis apenas para libltdl. Nenhuma biblioteca no LFS é carregada por libltdl, e é sabido que alguns arquivos .la podem causar falhas em pacotes BLFS. Remova esses arquivos agora:

```bash
find /usr/{lib,libexec} -name \*.la -delete
```

O tamanho atual do sistema é agora de cerca de 3 GB, no entanto, o diretório /tools não é mais necessário. Ele usa cerca de 1 GB de espaço em disco. Exclua-o agora:

```bash
rm -rf /tools
```

## 7.13.2. Backup

Neste ponto, os programas e bibliotecas essenciais foram criados e seu sistema LFS atual está em bom estado. Seu sistema pode agora ser feito backup para reutilização posterior. Em caso de falhas fatais nos capítulos subsequentes, muitas vezes verifica-se que remover tudo e começar de novo (com mais cuidado) é a melhor forma de recuperar. Infelizmente, todos os arquivos temporários também serão removidos. Para evitar gastar tempo extra para refazer algo que foi feito com sucesso, criar um backup do sistema LFS atual pode ser útil.

### Nota

Todos os passos restantes nesta seção são opcionais. No entanto, assim que você começar a instalar pacotes no Capítulo 8, os arquivos temporários serão sobrescritos. Portanto, pode ser uma boa ideia fazer um backup do sistema atual conforme descrito abaixo.

Os passos seguintes são realizados de fora do ambiente chroot. Isso significa que você deve sair do ambiente chroot primeiro antes de continuar. A razão para isso é obter acesso a locais do sistema de arquivos fora do ambiente chroot para armazenar/ler o arquivo de backup, que não deve ser colocado dentro da hierarquia $LFS.

Se você decidiu fazer um backup, saia do ambiente chroot:

```bash
exit
```

### Importante

Todas as instruções a seguir são executadas como root em seu sistema host. Tenha cuidado extra com os comandos que você vai executar, pois erros cometidos aqui podem modificar seu sistema host. Esteja ciente de que a variável de ambiente LFS é definida para o usuário lfs por padrão, mas pode não estar definida para root.

Sempre que comandos forem executados como root, certifique-se de ter definido LFS.

Isso foi discutido em [Seção 2.6, “Definindo a Variável $LFS e o Umask.”](#/page/chapter02__aboutlfs)

Antes de fazer um backup, desmonte os sistemas de arquivos virtuais:

```bash
mountpoint -q $LFS/dev/shm && umount $LFS/dev/shm
umount $LFS/dev/pts
umount $LFS/{sys,proc,run,dev}
```

Certifique-se de ter pelo menos 1 GB de espaço livre em disco (os tarballs de origem serão incluídos no arquivo de backup) no sistema de arquivos que contém o diretório onde você cria o arquivo de backup.

Observe que as instruções abaixo especificam o diretório home do usuário root do sistema host, que é tipicamente encontrado no sistema de arquivos root. Substitua $HOME por um diretório de sua escolha se você não quiser que o backup seja armazenado no diretório home do root.

Crie o arquivo de backup executando o seguinte comando:

### Nota

Como o arquivo de backup é compactado, leva um tempo relativamente longo (mais de 10 minutos) mesmo em um sistema razoavelmente rápido.

```bash
cd $LFS
tar -cJpf $HOME/lfs-temp-tools-12.4-systemd.tar.xz .
```

### Nota

Se for continuar para o capítulo 8, não se esqueça de reentrar no ambiente chroot conforme explicado na caixa “Importante” abaixo.

## 7.13.3. Restauração

Caso alguns erros tenham sido cometidos e você precise começar de novo, você pode usar este backup para restaurar o sistema e economizar tempo de recuperação. Como as fontes estão localizadas em $LFS, elas estão incluídas no arquivo de backup também, então não precisam ser baixadas novamente. Depois de verificar se $LFS está definido corretamente, você pode restaurar o backup executando os seguintes comandos:

### Aviso

Os seguintes comandos são extremamente perigosos. Se você executar rm -rf ./* como o usuário root e você não mudar para o diretório $LFS ou a variável de ambiente LFS não estiver definida para o usuário root, isso destruirá todo o seu sistema host. VOCÊ ESTÁ AVISADO.

```
cd $LFS
rm -rf ./*
tar -xpf $HOME/lfs-temp-tools-12.4-systemd.tar.xz
```

Novamente, verifique novamente se o ambiente foi configurado corretamente e continue a construir o resto do sistema.

### Importante

Se você saiu do ambiente chroot para criar um backup ou reiniciar a construção usando uma restauração, lembre-se de verificar se os sistemas de arquivos virtuais ainda estão montados (findmnt | grep $LFS). Se não estiverem montados, remonte-os agora conforme descrito em [Seção 7.3, “Preparando Sistemas de Arquivos Virtuais do Kernel”](#/page/chapter07__kernfs) e reentre no ambiente chroot (veja [Seção 7.4, “Entrando no Ambiente Chroot”](#/page/chapter07__chroot)) antes de continuar.

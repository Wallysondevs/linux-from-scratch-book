# 7.3. Preparando Sistemas de Arquivos Virtuais do Kernel

Aplicações executando no userspace utilizam vários sistemas de arquivos criados pelo kernel para se comunicar com o próprio kernel. Esses sistemas de arquivos são virtuais: nenhum espaço em disco é usado para eles. O conteúdo desses sistemas de arquivos reside na memória. Esses sistemas de arquivos devem ser montados na árvore de diretórios $LFS para que as aplicações possam encontrá-los no ambiente chroot.

Comece criando os diretórios nos quais esses sistemas de arquivos virtuais serão montados:

```bash
mkdir -pv $LFS/{dev,proc,sys,run}
```

## 7.3.1. Montando e Preenchendo /dev

Durante uma inicialização normal de um sistema LFS, o kernel monta automaticamente o sistema de arquivos devtmpfs no diretório /dev; o kernel cria nós de dispositivo nesse sistema de arquivos virtual durante o processo de inicialização, ou quando um dispositivo é detectado ou acessado pela primeira vez. O daemon udev pode alterar a propriedade ou as permissões dos nós de dispositivo criados pelo kernel, e criar novos nós de dispositivo ou symlinks, para facilitar o trabalho dos mantenedores de distro e administradores de sistema. (Consulte a Seção 9.3.2.2, “Criação de Nós de Dispositivo” para detalhes.) Se o kernel host suportar devtmpfs, podemos simplesmente montar um devtmpfs em $LFS/dev e confiar no kernel para preenchê-lo.

Mas alguns kernels host não possuem suporte a devtmpfs; essas distros host usam métodos diferentes para criar o conteúdo de /dev. Portanto, a única maneira host-agnostic de preencher o diretório $LFS/dev é montando por bind o diretório /dev do sistema host. Uma montagem por bind é um tipo especial de montagem que torna uma subárvore de diretório ou um arquivo visível em outro local. Use o seguinte comando para fazer isso.

```bash
mount -v --bind /dev $LFS/dev
```

## 7.3.2. Montando Sistemas de Arquivos Virtuais do Kernel

Agora monte os sistemas de arquivos virtuais do kernel restantes:

```bash
mount -vt devpts devpts -o gid=5,mode=0620 $LFS/dev/pts
mount -vt proc proc $LFS/proc
mount -vt sysfs sysfs $LFS/sys
mount -vt tmpfs tmpfs $LFS/run
```

O significado das opções de montagem para devpts:

Isso garante que todos os nós de dispositivo criados por devpts sejam de propriedade do ID de grupo 5. Este é o ID que usaremos mais tarde para o grupo tty. Usamos o ID de grupo em vez de um nome, já que o sistema host pode usar um ID diferente para seu grupo tty.

Isso garante que todos os nós de dispositivo criados por devpts tenham modo 0620 (leitura e escrita para o usuário, escrita para o grupo). Juntamente com a opção acima, isso garante que o devpts criará nós de dispositivo que atendem aos requisitos de grantpt(), o que significa que o binário auxiliar Glibc pt_chown (que não é instalado por padrão) não é necessário.

Em alguns sistemas host, /dev/shm é um link simbólico para um diretório, tipicamente /run/shm. O tmpfs /run foi montado acima, então, neste caso, apenas um diretório precisa ser criado com as permissões corretas.

Em outros sistemas host, /dev/shm é um ponto de montagem para um tmpfs. Nesse caso, a montagem de /dev acima apenas criará /dev/shm como um diretório no ambiente chroot. Nesta situação, devemos montar explicitamente um tmpfs:

```bash
if [ -h $LFS/dev/shm ]; then
  install -v -d -m 1777 $LFS$(realpath /dev/shm)
else
  mount -vt tmpfs -o nosuid,nodev tmpfs $LFS/dev/shm
fi
```

import{j as s}from"./index-CGptwfLb.js";import{P as e}from"./PageContainer-DhWxB77g.js";import{C as o}from"./CodeBlock-DiEVa7fR.js";function t(){return s.jsxs(e,{title:"Comandos Essenciais",subtitle:"Tabela de referência rápida com os comandos mais usados no livro.",difficulty:"iniciante",timeToRead:"5 min",children:[s.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),s.jsx("h2",{children:"Glossário rápido"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"cd"})," "," — "," ","muda dir."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"ls"})," "," — "," ","lista."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"tar"})," "," — "," ","extrai."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"make"})," "," — "," ","build."]})]}),s.jsx("h2",{children:"Setup inicial"}),s.jsx(o,{language:"bash",code:`# Definir variável LFS
export LFS=/mnt/lfs

# Montar partição do LFS
sudo mount /dev/sdb1 $LFS

# Logar como usuário lfs
su - lfs

# Atualizar ambiente
source ~/.bash_profile`}),s.jsx("h2",{children:"Construindo um pacote (padrão)"}),s.jsx(o,{language:"bash",code:`cd $LFS/sources
tar -xf pacote-X.Y.tar.xz
cd pacote-X.Y

# Configurar
./configure --prefix=/usr [opções]

# Compilar
make -j$(nproc)

# Testar (opcional)
make check

# Instalar
make install            # se for sistema final / chroot
make DESTDIR=$LFS install   # se for toolchain temporária

# Limpar
cd .. && rm -rf pacote-X.Y`}),s.jsx("h2",{children:"Bind-mount filesystems virtuais (antes do chroot)"}),s.jsx(o,{language:"bash",code:`mount -v --bind /dev $LFS/dev
mount -vt devpts devpts -o gid=5,mode=0620 $LFS/dev/pts
mount -vt proc proc $LFS/proc
mount -vt sysfs sysfs $LFS/sys
mount -vt tmpfs tmpfs $LFS/run`}),s.jsx("h2",{children:"Entrar no chroot"}),s.jsx(o,{language:"bash",code:`chroot "$LFS" /usr/bin/env -i \\
    HOME=/root TERM="$TERM" \\
    PS1='(lfs chroot) \\u:\\w\\$ ' \\
    PATH=/usr/bin:/usr/sbin \\
    MAKEFLAGS="-j$(nproc)" \\
    /bin/bash --login`}),s.jsx("h2",{children:"Sair limpo do chroot"}),s.jsx(o,{language:"bash",code:`# dentro do chroot:
exit

# como root no host:
umount $LFS/dev/pts
umount $LFS/{sys,proc,run,dev}`}),s.jsx("h2",{children:"Backup e restauração"}),s.jsx(o,{language:"bash",code:`# backup
cd $LFS
tar -cJpf $HOME/lfs-AAAA-MM-DD.tar.xz --exclude=sources .

# restaurar
cd $LFS && rm -rf ./*
tar -xpf $HOME/lfs-AAAA-MM-DD.tar.xz`}),s.jsx("h2",{children:"Diagnóstico rápido"}),s.jsx(o,{language:"bash",code:`lsblk                # discos e partições
df -h                # uso por filesystem
free -h              # memória
ps -aux              # processos
journalctl -xe       # logs (systemd)
dmesg | tail         # mensagens do kernel
ip a                 # interfaces de rede
ss -tulpn            # portas abertas
mount                # filesystems montados`})]})}export{t as default};

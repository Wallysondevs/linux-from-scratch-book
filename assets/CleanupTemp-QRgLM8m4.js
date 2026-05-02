import{j as e}from"./index-K1a8hxkV.js";import{P as r}from"./PageContainer-BFvVnrCN.js";import{C as o}from"./CodeBlock-DvB8XoAE.js";import{A as s}from"./AlertBox-C_JmkQL6.js";function d(){return e.jsxs(r,{title:"Limpeza & Backup",subtitle:"Antes de iniciar a build do sistema final, faça backup. Se algo der errado, você não recomeça do zero.",difficulty:"iniciante",timeToRead:"4 min",children:[e.jsx("h2",{children:"Limpeza de arquivos de debug e libtool archives"}),e.jsx(o,{language:"bash",code:`# Strip de debug symbols dos binários
strip --strip-debug /usr/lib/* 2>/dev/null || true
strip --strip-unneeded /usr/{,s}bin/* 2>/dev/null || true
strip --strip-unneeded /tools/{,s}bin/* 2>/dev/null || true

# Remove documentação que não vamos usar agora
rm -rf /usr/share/{info,man,doc}/*

# Remove libtool archives (serão regerados se necessário)
find /usr/{lib,libexec} -name \\*.la -delete`}),e.jsx("h2",{children:"Saindo do chroot e desmontando"}),e.jsx(o,{language:"bash",code:`# dentro do chroot:
exit

# como root no host:
mountpoint -q $LFS/dev/shm && umount $LFS/dev/shm
umount $LFS/dev/pts
umount $LFS/{sys,proc,run,dev}`}),e.jsx("h2",{children:"Backup com tar"}),e.jsx(o,{language:"bash",code:`# como root no host:
cd $LFS
tar -cJpf $HOME/lfs-temp-tools-$(date +%F).tar.xz \\
  --exclude=sources .

ls -lh $HOME/lfs-temp-tools-*.tar.xz
# uns 600-900 MB`}),e.jsxs(s,{type:"success",title:"Por quê fazer backup AGORA?",children:["Você acabou de gastar várias horas construindo a toolchain temporária. Se erro futuro destruir ",e.jsx("code",{children:"$LFS"}),", basta restaurar o tarball e retomar — sem precisar refazer a toolchain."]}),e.jsx("h2",{children:"Restaurando (se necessário)"}),e.jsx(o,{language:"bash",code:`cd $LFS
rm -rf ./*
tar -xpf $HOME/lfs-temp-tools-AAAA-MM-DD.tar.xz`}),e.jsxs("p",{children:["Pronto. Para entrar no chroot novamente, refaça os bind-mounts (capítulo"," ",e.jsx("a",{href:"#/preparing-vfs",children:"Preparando Filesystems Virtuais"}),") e o",e.jsx("code",{children:" chroot"}),"."]})]})}export{d as default};

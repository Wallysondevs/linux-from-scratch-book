import{j as e}from"./index-CGptwfLb.js";import{P as s}from"./PageContainer-DhWxB77g.js";import{C as o}from"./CodeBlock-DiEVa7fR.js";import{A as r}from"./AlertBox-DblzR--W.js";function d(){return e.jsxs(s,{title:"Limpeza & Backup",subtitle:"Antes de iniciar a build do sistema final, faça backup. Se algo der errado, você não recomeça do zero.",difficulty:"iniciante",timeToRead:"4 min",children:[e.jsx(r,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Cleanup"})," "," — "," ","remove docs/info."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"strip"})," "," — "," ","debug symbols."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Disk space"})," "," — "," ","economiza GB."]})]}),e.jsx("h2",{children:"Limpeza de arquivos de debug e libtool archives"}),e.jsx(o,{language:"bash",code:`# Strip de debug symbols dos binários
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
# uns 600-900 MB`}),e.jsxs(r,{type:"success",title:"Por quê fazer backup AGORA?",children:["Você acabou de gastar várias horas construindo a toolchain temporária. Se erro futuro destruir ",e.jsx("code",{children:"$LFS"}),", basta restaurar o tarball e retomar — sem precisar refazer a toolchain."]}),e.jsx("h2",{children:"Restaurando (se necessário)"}),e.jsx(o,{language:"bash",code:`cd $LFS
rm -rf ./*
tar -xpf $HOME/lfs-temp-tools-AAAA-MM-DD.tar.xz`}),e.jsxs("p",{children:["Pronto. Para entrar no chroot novamente, refaça os bind-mounts (capítulo"," ",e.jsx("a",{href:"#/preparing-vfs",children:"Preparando Filesystems Virtuais"}),") e o",e.jsx("code",{children:" chroot"}),"."]})]})}export{d as default};

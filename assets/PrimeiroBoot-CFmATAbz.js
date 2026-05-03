import{j as o}from"./index-ZrM6Gh7j.js";import{P as s}from"./PageContainer-jOSfeH0u.js";import{C as e}from"./CodeBlock-cFXLaLiU.js";import{A as i}from"./AlertBox-D3Y0IUPD.js";function d(){return o.jsxs(s,{title:"O Primeiro Boot",subtitle:"O grande momento. Saia do chroot, desmonte tudo, e dê boot no SEU Linux.",difficulty:"intermediario",timeToRead:"5 min",children:[o.jsx("h2",{children:"Saindo limpo do chroot"}),o.jsx(e,{language:"bash",code:`# dentro do chroot:
exit

# como root no host:
umount -v $LFS/dev/pts
mountpoint -q $LFS/dev/shm && umount -v $LFS/dev/shm
umount -v $LFS/{sys,proc,run,dev}
umount -v $LFS`}),o.jsx("h2",{children:"Reiniciando para o LFS"}),o.jsx("p",{children:"Se for VM, mude o boot para o disco do LFS no setup. Se for hardware real, entre na BIOS/UEFI e selecione o disco do LFS como primário."}),o.jsx(e,{language:"bash",code:`shutdown -h now
# ou: poweroff
# ou: reboot, e ajuste a ordem de boot na BIOS`}),o.jsx("h2",{children:"O que esperar no primeiro boot"}),o.jsxs("ol",{children:[o.jsx("li",{children:"BIOS/UEFI passa para o GRUB."}),o.jsx("li",{children:"GRUB mostra o menu (5 segundos timeout)."}),o.jsxs("li",{children:["Kernel inicia, descompacta, monta ",o.jsx("code",{children:"/"})," ext4."]}),o.jsx("li",{children:"Init (systemd ou SysV) toma controle."}),o.jsx("li",{children:'Mensagens de "Started ..." piscam.'}),o.jsxs("li",{children:["Prompt de login: ",o.jsx("code",{children:"lfs login:"})]})]}),o.jsx(e,{language:"text",code:`lfs login: root
Password: ********

[root@lfs ~]# uname -a
Linux lfs 6.10.5-lfs #1 SMP ... x86_64 GNU/Linux

[root@lfs ~]# echo "É MEU PRÓPRIO LINUX!!!"
É MEU PRÓPRIO LINUX!!!`}),o.jsx(i,{type:"success",title:"Parabéns!",children:"Você acabou de bootar uma distribuição Linux que VOCÊ construiu. Cada binário, cada lib, cada syscall — você sabe de onde veio. Esse é o verdadeiro propósito do LFS."}),o.jsx("h2",{children:"Próximos passos"}),o.jsxs("ul",{children:[o.jsxs("li",{children:["Compile e instale software adicional via ",o.jsx("a",{href:"#/intro-blfs",children:"BLFS"})," (Xorg, browsers, ferramentas de desenvolvimento)."]}),o.jsxs("li",{children:["Estude o ",o.jsx("a",{href:"#/package-management",children:"gerenciamento de pacotes"})," manual."]}),o.jsx("li",{children:"Refaça o livro com versões mais novas conforme elas saírem."}),o.jsx("li",{children:"Compartilhe seu tarball de build com a comunidade!"})]})]})}export{d as default};

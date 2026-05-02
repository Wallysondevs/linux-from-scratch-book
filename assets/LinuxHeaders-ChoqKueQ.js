import{j as e}from"./index-K1a8hxkV.js";import{P as s}from"./PageContainer-BFvVnrCN.js";import{C as r}from"./CodeBlock-DvB8XoAE.js";import{A as a}from"./AlertBox-C_JmkQL6.js";function d(){return e.jsxs(s,{title:"Linux API Headers",subtitle:"Os headers que a Glibc usa para conversar com o kernel. Não é o kernel inteiro — só as 'interfaces'.",difficulty:"intermediario",timeToRead:"4 min",children:[e.jsx("h2",{children:"O que estamos instalando?"}),e.jsxs("p",{children:["A Glibc precisa saber a interface de syscalls do kernel (números de syscall, structs como ",e.jsx("code",{children:"stat"}),", ioctls, flags). Isso vem de arquivos ",e.jsx("code",{children:".h"})," no kernel — que extraímos sem compilar nada."]}),e.jsx("h2",{children:"Extraindo e limpando"}),e.jsx(r,{language:"bash",code:`cd $LFS/sources
tar -xf linux-6.16.1.tar.xz
cd linux-6.16.1

make mrproper        # limpa qualquer resíduo`}),e.jsx("h2",{children:"Instalando os headers"}),e.jsx(r,{language:"bash",code:`make headers
find usr/include -type f ! -name '*.h' -delete
cp -rv usr/include $LFS/usr`}),e.jsx("h2",{children:"Limpando"}),e.jsx(r,{language:"bash",code:`cd $LFS/sources
rm -rf linux-6.16.1`}),e.jsxs(a,{type:"info",title:"O kernel real virá depois",children:["Estes são só os ",e.jsx("em",{children:"headers"}),". O kernel real (vmlinuz) vai ser compilado bem mais para frente, dentro do chroot, no capítulo de",e.jsx("a",{href:"#/kernel",children:" Kernel"}),"."]})]})}export{d as default};

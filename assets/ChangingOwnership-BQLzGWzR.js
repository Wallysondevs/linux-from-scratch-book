import{j as o}from"./index-K1a8hxkV.js";import{P as r}from"./PageContainer-BFvVnrCN.js";import{C as e}from"./CodeBlock-DvB8XoAE.js";import{A as s}from"./AlertBox-C_JmkQL6.js";function d(){return o.jsxs(r,{title:"Mudando o Dono dos Arquivos",subtitle:"Antes do chroot, todos os arquivos do LFS precisam pertencer ao root.",difficulty:"intermediario",timeToRead:"3 min",children:[o.jsx("h2",{children:"Por quê?"}),o.jsxs("p",{children:["Até agora, tudo em ",o.jsx("code",{children:"$LFS"})," pertence ao usuário ",o.jsx("code",{children:"lfs"})," ","(UID 1001 ou similar). Dentro do chroot, esse UID não existe — vai dar erros e arquivos órfãos. Convertemos tudo para ",o.jsx("code",{children:"root:root"}),"."]}),o.jsx("h2",{children:"Comando"}),o.jsx(e,{language:"bash",code:`# saia do shell do usuário lfs:
exit

# como root no host:
chown -R root:root $LFS/{usr,lib,var,etc,bin,sbin,tools}
case $(uname -m) in
  x86_64) chown -R root:root $LFS/lib64 ;;
esac`}),o.jsxs(s,{type:"warning",title:"Use o usuário lfs apenas para a toolchain",children:["Após este chown, NÃO faça mais nada como ",o.jsx("code",{children:"lfs"}),". Todo o trabalho subsequente é como root (no host) ou no chroot (também como root, mas isolado)."]})]})}export{d as default};

import{j as s}from"./index-Dq2pq_L0.js";import{P as i}from"./PageContainer-CRFAuOt2.js";import{C as o}from"./CodeBlock-DfTRrP6d.js";import{A as e}from"./AlertBox-DFdNRTyW.js";function c(){return s.jsxs(i,{title:"Introdução à Toolchain Cross-Compilada",subtitle:"Por que construir o GCC duas vezes (Pass 1 e Pass 2) e o que cada uma significa.",difficulty:"avancado",timeToRead:"8 min",children:[s.jsx("h2",{children:"O problema que estamos resolvendo"}),s.jsx("p",{children:"Queremos um sistema final 100% independente do host. Mas o único compilador disponível no início é o do host. Se compilássemos a Glibc diretamente com o GCC do host, ela ficaria ligada às bibliotecas do host. Quando déssemos boot no LFS, nada funcionaria."}),s.jsx("h2",{children:"A solução: cross-compilation"}),s.jsxs("p",{children:["Construímos primeiro uma toolchain ",s.jsx("strong",{children:"cross"}),": um GCC que"," ",s.jsx("em",{children:"roda"})," no host, mas que ",s.jsx("em",{children:"gera binários"})," para um alvo chamado ",s.jsx("code",{children:"x86_64-lfs-linux-gnu"}),'. Esse alvo é "fictício" — sintaticamente diferente do host (',s.jsx("code",{children:"x86_64-pc-linux-gnu"}),"), mas binariamente idêntico."]}),s.jsx(o,{language:"text",code:`HOST: x86_64-pc-linux-gnu
ALVO: x86_64-lfs-linux-gnu

Mesmas instruções de CPU, mesmo formato ELF.
Mas o linker é diferente, o specs é diferente:
binários do alvo NÃO veem libs do host.`}),s.jsx("h2",{children:"Pass 1 (cross-compiler)"}),s.jsx("p",{children:"Aqui construímos:"}),s.jsxs("ol",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Binutils Pass 1"})," — assembler/linker para o alvo."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"GCC Pass 1"})," — compilador C que cria binários para o alvo."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Linux API Headers"})," — headers do kernel para o alvo."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Glibc"})," — a libc do alvo. ",s.jsx("em",{children:"Esta"})," é a Glibc que vai sobreviver."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Libstdc++ from GCC"})," — biblioteca C++ ligada à nova Glibc."]})]}),s.jsx("h2",{children:"Pass 2 (native cross-compiler)"}),s.jsxs("p",{children:["Com o GCC Pass 1 funcional, construímos as ",s.jsx("strong",{children:"ferramentas temporárias"})," (m4, ncurses, bash, coreutils, etc.) — todas compiladas ",s.jsx("em",{children:"contra a Glibc nova"}),". Em seguida:"]}),s.jsxs("ol",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Binutils Pass 2"})," — agora compilado pelo GCC Pass 1."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"GCC Pass 2"})," — também recompilado."]})]}),s.jsxs("p",{children:['O resultado é uma toolchain "nativa do alvo" rodando dentro de'," ",s.jsx("code",{children:"/mnt/lfs/tools"}),", capaz de compilar tudo o que vem dentro do chroot sem nenhum vestígio do host."]}),s.jsx(e,{type:"info",title:"Resumo intuitivo",children:'Pass 1 = "GCC do host fala uma língua nova". Pass 2 = "GCC fala a língua nova nativamente". Depois, dentro do chroot, esquecemos o host completamente.'}),s.jsx("h2",{children:"Diretório de instalação"}),s.jsxs("p",{children:["Toda a toolchain temporária vai para ",s.jsx("code",{children:"$LFS/tools"}),":"]}),s.jsx(o,{language:"bash",code:`# como root no host:
mkdir -pv $LFS/{etc,var} $LFS/usr/{bin,lib,sbin}
for i in bin lib sbin; do
  ln -sv usr/$i $LFS/$i
done
case $(uname -m) in
  x86_64) mkdir -pv $LFS/lib64 ;;
esac
mkdir -pv $LFS/tools
chown -v lfs $LFS/{usr{,/*},lib,var,etc,bin,sbin,tools}
case $(uname -m) in
  x86_64) chown -v lfs $LFS/lib64 ;;
esac

# volta para o usuário lfs:
su - lfs`}),s.jsxs("p",{children:["Pronto para começar. Vá para"," ",s.jsx("a",{href:"#/binutils-pass1",children:"Binutils — Pass 1"}),"."]})]})}export{c as default};

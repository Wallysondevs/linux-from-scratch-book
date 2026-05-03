import{j as o}from"./index-Dq2pq_L0.js";import{P as e}from"./PageContainer-CRFAuOt2.js";import{C as s}from"./CodeBlock-DfTRrP6d.js";import{A as i}from"./AlertBox-DFdNRTyW.js";function c(){return o.jsxs(e,{title:"Criando o Usuário lfs",subtitle:"Construir a toolchain temporária como root é arriscado. Vamos criar um usuário dedicado e não-privilegiado.",difficulty:"iniciante",timeToRead:"4 min",children:[o.jsx("h2",{children:"Criando o usuário"}),o.jsx(s,{language:"bash",code:`sudo groupadd lfs
sudo useradd -s /bin/bash -g lfs -m -k /dev/null lfs
sudo passwd lfs   # define uma senha`}),o.jsx("p",{children:"Explicação dos flags:"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("code",{children:"-s /bin/bash"})," — shell padrão."]}),o.jsxs("li",{children:[o.jsx("code",{children:"-g lfs"})," — grupo primário ",o.jsx("code",{children:"lfs"}),"."]}),o.jsxs("li",{children:[o.jsx("code",{children:"-m"})," — cria ",o.jsx("code",{children:"/home/lfs"}),"."]}),o.jsxs("li",{children:[o.jsx("code",{children:"-k /dev/null"})," — não copia arquivos de skel (nada de ",o.jsx("code",{children:"~/.bashrc"})," herdado do host)."]})]}),o.jsxs("h2",{children:["Dando posse de ",o.jsx("code",{children:"$LFS"})," ao usuário"]}),o.jsx(s,{language:"bash",code:`sudo chown -v lfs $LFS/sources
sudo chown -v lfs $LFS

# se você criou /tools antes (alguns capítulos pedem):
# sudo mkdir -pv $LFS/tools
# sudo chown -v lfs $LFS/tools`}),o.jsxs("h2",{children:["Logando como usuário ",o.jsx("code",{children:"lfs"})]}),o.jsx(s,{language:"bash",code:`su - lfs

# o "-" garante shell de login limpo (sem variáveis herdadas do root)`}),o.jsxs(i,{type:"warning",title:"A partir de agora, fique como lfs",children:["Toda a construção da toolchain temporária é feita como ",o.jsx("code",{children:"lfs"}),". Só volte a ser root quando o livro mandar (chown final, chroot etc.)."]}),o.jsxs("h2",{children:["Verificando que está mesmo como ",o.jsx("code",{children:"lfs"})]}),o.jsx(s,{language:"bash",code:`whoami
# lfs

id
# uid=1001(lfs) gid=1001(lfs) groups=1001(lfs)`}),o.jsxs("p",{children:["Vá agora para ",o.jsx("a",{href:"#/ambiente-lfs",children:"Variáveis de Ambiente"})," e configure o ",o.jsx("code",{children:"~/.bash_profile"})," e ",o.jsx("code",{children:"~/.bashrc"})," do usuário ",o.jsx("code",{children:"lfs"}),"."]})]})}export{c as default};

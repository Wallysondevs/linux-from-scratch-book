import{j as e}from"./index-K1a8hxkV.js";import{P as o}from"./PageContainer-BFvVnrCN.js";import{C as s}from"./CodeBlock-DvB8XoAE.js";import{A as a}from"./AlertBox-C_JmkQL6.js";function i(){return e.jsxs(o,{title:"Baixando Pacotes & Patches",subtitle:"Cerca de 700 MB de código-fonte. Tudo vem de servidores oficiais — sem mistério.",difficulty:"iniciante",timeToRead:"6 min",children:[e.jsxs("h2",{children:["O arquivo ",e.jsx("code",{children:"wget-list-sysv"})]}),e.jsx("p",{children:"O LFS publica uma lista pronta com URLs de TODOS os pacotes. Baixe a lista correspondente à sua versão (substitua 12.x pela versão real):"}),e.jsx(s,{language:"bash",code:`mkdir -pv $LFS/sources
chmod -v a+wt $LFS/sources

cd $LFS/sources
wget https://www.linuxfromscratch.org/lfs/downloads/stable/wget-list-sysv
# para a edição systemd:
# wget https://www.linuxfromscratch.org/lfs/downloads/stable/wget-list-systemd`}),e.jsx("h2",{children:"Baixando tudo de uma vez"}),e.jsx(s,{language:"bash",code:`cd $LFS/sources
wget --input-file=wget-list-sysv --continue --directory-prefix=$LFS/sources`}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"--continue"})," permite retomar downloads interrompidos. Tome um café — pode levar de 10 minutos a algumas horas, dependendo da banda."]}),e.jsx("h2",{children:"Verificando os checksums"}),e.jsxs("p",{children:["Sempre baixe o ",e.jsx("code",{children:"md5sums"})," oficial e confira:"]}),e.jsx(s,{language:"bash",code:`cd $LFS/sources
wget https://www.linuxfromscratch.org/lfs/downloads/stable/md5sums
md5sum -c md5sums | grep -v ': OK$'
# esperado: nenhuma linha de saída (todos OK)`}),e.jsxs(a,{type:"warning",title:"Algum FAILED?",children:["Re-baixe somente o pacote afetado: apague o arquivo, rode"," ",e.jsx("code",{children:"wget URL_DO_PACOTE"})," e refaça o ",e.jsx("code",{children:"md5sum -c"}),"."]}),e.jsx("h2",{children:"Patches"}),e.jsxs("p",{children:["Alguns pacotes precisam de patches publicados pela equipe LFS (correções de bugs, ajustes de paths). Eles já estão na ",e.jsx("code",{children:"wget-list"}),". Confira que vieram:"]}),e.jsx(s,{language:"bash",code:`ls $LFS/sources/*.patch | head
# devem aparecer patches como bash-*-fixes-*.patch, gcc-*.patch etc.`}),e.jsxs("h2",{children:["Estrutura do diretório ",e.jsx("code",{children:"/sources"})]}),e.jsx(s,{language:"bash",code:`ls $LFS/sources/ | head -20
# binutils-2.45.tar.xz
# gcc-15.2.0.tar.xz
# glibc-2.42.tar.xz
# kernel-6.10.x.tar.xz
# bash-5.3.tar.gz
# coreutils-9.7.tar.xz
# ... e dezenas de outros`}),e.jsxs(a,{type:"success",title:"Tudo certo?",children:["Tem ~80 pacotes, ~700 MB? checksums todos OK? Pode ir para o capítulo de"," ",e.jsx("a",{href:"#/usuario-lfs",children:"Usuário LFS"}),"."]})]})}export{i as default};

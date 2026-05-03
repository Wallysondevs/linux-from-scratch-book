import{j as e}from"./index-CGptwfLb.js";import{P as i}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";import{A as o}from"./AlertBox-DblzR--W.js";function c(){return e.jsxs(i,{title:"Variáveis de Ambiente do Usuário lfs",subtitle:"Configure ~/.bash_profile e ~/.bashrc para um shell limpo, previsível e isolado do host.",difficulty:"intermediario",timeToRead:"6 min",children:[e.jsx(o,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"LFS_TGT"})," "," — "," ","triplet de cross-compile."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"$LFS"})," "," — "," ","/mnt/lfs."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"/sources"})," "," — "," ","tarballs."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"/tools"})," "," — "," ","toolchain temporária."]})]}),e.jsx("h2",{children:"Por que isolar o ambiente?"}),e.jsxs("p",{children:["Variáveis como ",e.jsx("code",{children:"CFLAGS"}),", ",e.jsx("code",{children:"LDFLAGS"}),", ",e.jsx("code",{children:"PATH"})," ","herdadas do host podem contaminar a build da toolchain — resultando em binários que não funcionam fora do host. Vamos zerar tudo."]}),e.jsx("h2",{children:e.jsx("code",{children:"~/.bash_profile"})}),e.jsx(s,{language:"bash",code:`cat > ~/.bash_profile << "EOF"
exec env -i HOME=$HOME TERM=$TERM PS1='\\u:\\w\\$ ' /bin/bash
EOF`}),e.jsxs("p",{children:["O ",e.jsx("code",{children:"env -i"})," apaga todas as variáveis e chama bash de novo, garantindo um shell completamente vazio."]}),e.jsx("h2",{children:e.jsx("code",{children:"~/.bashrc"})}),e.jsx(s,{language:"bash",code:`cat > ~/.bashrc << "EOF"
set +h
umask 022
LFS=/mnt/lfs
LC_ALL=POSIX
LFS_TGT=$(uname -m)-lfs-linux-gnu
PATH=/usr/bin
if [ ! -L /bin ]; then PATH=/bin:$PATH; fi
PATH=$LFS/tools/bin:$PATH
CONFIG_SITE=$LFS/usr/share/config.site
export LFS LC_ALL LFS_TGT PATH CONFIG_SITE
EOF`}),e.jsx("h3",{children:"Linha por linha"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"set +h"}),' — desliga o cache de comandos do bash, evitando que ele "lembre" de binários antigos do host.']}),e.jsxs("li",{children:[e.jsx("code",{children:"umask 022"})," — arquivos novos saem como ",e.jsx("code",{children:"644"}),", diretórios ",e.jsx("code",{children:"755"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"LFS=/mnt/lfs"})," — atalho onipresente."]}),e.jsxs("li",{children:[e.jsx("code",{children:"LC_ALL=POSIX"})," — locale padronizado, evita warnings de tradução."]}),e.jsxs("li",{children:[e.jsx("code",{children:"LFS_TGT=$(uname -m)-lfs-linux-gnu"})," — triplet alvo da toolchain. Em x86_64 vira ",e.jsx("code",{children:"x86_64-lfs-linux-gnu"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"PATH=/usr/bin"})," + ajustes — só os binários estritamente necessários, com a toolchain LFS na frente assim que ela existir."]}),e.jsxs("li",{children:[e.jsx("code",{children:"CONFIG_SITE"})," — desliga arquivos site-config do host."]})]}),e.jsx("h2",{children:"Aplicando"}),e.jsx(s,{language:"bash",code:`source ~/.bash_profile

# verificando:
echo $LFS $LFS_TGT
# /mnt/lfs x86_64-lfs-linux-gnu

echo $PATH
# /mnt/lfs/tools/bin:/bin:/usr/bin (mais ou menos)`}),e.jsxs(o,{type:"warning",title:"Sempre source antes de continuar",children:["Toda vez que abrir um novo terminal como ",e.jsx("code",{children:"lfs"}),", faça"," ",e.jsx("code",{children:"source ~/.bash_profile"}),". Sem isso, comandos vão pegar binários do host."]}),e.jsx("h2",{children:"Make paralelo (opcional, mas recomendado)"}),e.jsxs("p",{children:["Para acelerar drasticamente as builds, configure ",e.jsx("code",{children:"MAKEFLAGS"})," ","para usar todos os cores da CPU:"]}),e.jsx(s,{language:"bash",code:`echo "export MAKEFLAGS=-j$(nproc)" >> ~/.bashrc

# ou um número específico, ex.: -j4
# echo "export MAKEFLAGS=-j4" >> ~/.bashrc`}),e.jsxs(o,{type:"info",title:"Cuidado: alguns make tests não toleram -j",children:["Para test suites, o livro vai pedir para forçar ",e.jsx("code",{children:"make -j1 check"})," ","em alguns casos. Quando aparecer no livro, obedeça."]})]})}export{c as default};

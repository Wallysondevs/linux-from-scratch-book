import{j as r}from"./index-CGptwfLb.js";import{P as e}from"./PageContainer-DhWxB77g.js";import{C as a}from"./CodeBlock-DiEVa7fR.js";function l(){return r.jsxs(e,{title:"Patch, Tar (final)",subtitle:"Versões finais. Tar é fundamental para qualquer manipulação de pacotes futuros.",difficulty:"iniciante",timeToRead:"3 min",children:[r.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),r.jsx("h2",{children:"Glossário rápido"}),r.jsxs("ul",{children:[r.jsxs("li",{children:[r.jsx("strong",{children:"Make"})," "," — "," ","GNU make."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Patch"})," "," — "," ","aplica diff."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Tar"})," "," — "," ","arquivamento."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Tools temp"})," "," — "," ","para build."]})]}),r.jsx("h2",{children:"Patch"}),r.jsx(a,{language:"bash",code:`cd /sources
tar -xf patch-2.8.tar.xz && cd patch-2.8
./configure --prefix=/usr
make && make install
cd .. && rm -rf patch-2.8`}),r.jsx("h2",{children:"Tar"}),r.jsx(a,{language:"bash",code:`tar -xf tar-1.35.tar.xz && cd tar-1.35
FORCE_UNSAFE_CONFIGURE=1 ./configure --prefix=/usr
make
make install
make -C doc install-html docdir=/usr/share/doc/tar-1.35
cd .. && rm -rf tar-1.35`})]})}export{l as default};

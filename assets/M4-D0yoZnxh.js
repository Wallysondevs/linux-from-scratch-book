import{j as o}from"./index-CGptwfLb.js";import{P as e}from"./PageContainer-DhWxB77g.js";import{C as r}from"./CodeBlock-DiEVa7fR.js";function l(){return o.jsxs(e,{title:"M4",subtitle:"Processador de macros usado por autoconf, bison e outros. Pacote pequeno e rápido.",difficulty:"intermediario",timeToRead:"3 min",children:[o.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),o.jsx("h2",{children:"Glossário rápido"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"M4"})," "," — "," ","macro processor."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"GNU M4"})," "," — "," ","padrão."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"Build"})," "," — "," ","autotools."]})]}),o.jsx("h2",{children:"Build"}),o.jsx(r,{language:"bash",code:`cd $LFS/sources
tar -xf m4-1.4.20.tar.xz
cd m4-1.4.20

./configure --prefix=/usr   \\
            --host=$LFS_TGT \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd $LFS/sources
rm -rf m4-1.4.20`}),o.jsx("p",{className:"text-sm text-muted-foreground mt-4",children:"⏱ Aproximadamente 0.1 SBU. Talvez o pacote mais rápido do livro."})]})}export{l as default};

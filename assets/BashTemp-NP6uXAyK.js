import{j as s}from"./index-CGptwfLb.js";import{P as r}from"./PageContainer-DhWxB77g.js";import{C as i}from"./CodeBlock-DiEVa7fR.js";function a(){return s.jsxs(r,{title:"Bash",subtitle:"O shell padrão do LFS. Vamos compilar uma versão temporária.",difficulty:"intermediario",timeToRead:"3 min",children:[s.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),s.jsx("h2",{children:"Glossário rápido"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Bash temp"})," "," — "," ","readline link."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"LFS_TGT"})," "," — "," ","prefix."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Cross"})," "," — "," ","do host para LFS."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Stage"})," "," — "," ","toolchain."]})]}),s.jsx("h2",{children:"Build"}),s.jsx(i,{language:"bash",code:`cd $LFS/sources
tar -xf bash-5.3.tar.gz
cd bash-5.3

./configure --prefix=/usr                      \\
            --build=$(sh support/config.guess) \\
            --host=$LFS_TGT                    \\
            --without-bash-malloc

make
make DESTDIR=$LFS install

# Symlink padrão sh -> bash
ln -sv bash $LFS/bin/sh

cd $LFS/sources
rm -rf bash-5.3`})]})}export{a as default};

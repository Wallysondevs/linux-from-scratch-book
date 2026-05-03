import{j as e}from"./index-CGptwfLb.js";import{P as s}from"./PageContainer-DhWxB77g.js";import{C as r}from"./CodeBlock-DiEVa7fR.js";function c(){return e.jsxs(s,{title:"Patch, Sed, Tar, Xz",subtitle:"Os últimos pacotes da fase de ferramentas temporárias antes do Pass 2.",difficulty:"intermediario",timeToRead:"5 min",children:[e.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Patch temp"})," "," — "," ","para build."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"GNU patch"})," "," — "," ","aplica diffs."]})]}),e.jsx("h2",{children:"Patch"}),e.jsx(r,{language:"bash",code:`cd $LFS/sources
tar -xf patch-2.8.tar.xz && cd patch-2.8
./configure --prefix=/usr --host=$LFS_TGT --build=$(build-aux/config.guess)
make && make DESTDIR=$LFS install
cd .. && rm -rf patch-2.8`}),e.jsx("h2",{children:"Sed"}),e.jsx(r,{language:"bash",code:`tar -xf sed-4.9.tar.xz && cd sed-4.9
./configure --prefix=/usr --host=$LFS_TGT
make && make DESTDIR=$LFS install
cd .. && rm -rf sed-4.9`}),e.jsx("h2",{children:"Tar"}),e.jsx(r,{language:"bash",code:`tar -xf tar-1.35.tar.xz && cd tar-1.35
./configure --prefix=/usr                   \\
            --host=$LFS_TGT                 \\
            --build=$(build-aux/config.guess)
make && make DESTDIR=$LFS install
cd .. && rm -rf tar-1.35`}),e.jsx("h2",{children:"Xz"}),e.jsx(r,{language:"bash",code:`tar -xf xz-5.6.2.tar.xz && cd xz-5.6.2

./configure --prefix=/usr                     \\
            --host=$LFS_TGT                   \\
            --build=$(build-aux/config.guess) \\
            --disable-static                  \\
            --docdir=/usr/share/doc/xz-5.6.2

make && make DESTDIR=$LFS install
rm -v $LFS/usr/lib/liblzma.la
cd .. && rm -rf xz-5.6.2`})]})}export{c as default};

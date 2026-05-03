import{j as i}from"./index-CGptwfLb.js";import{P as r}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";function t(){return i.jsxs(r,{title:"Diffutils, Gawk, Findutils (final)",subtitle:"Versões finais dos três pacotes.",difficulty:"iniciante",timeToRead:"3 min",children:[i.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),i.jsx("h2",{children:"Glossário rápido"}),i.jsxs("ul",{children:[i.jsxs("li",{children:[i.jsx("strong",{children:"Diffutils"})," "," — "," ","diff, cmp."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Final"})," "," — "," ","chroot rebuild."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Useful"})," "," — "," ","patches."]})]}),i.jsx("h2",{children:"Diffutils"}),i.jsx(s,{language:"bash",code:`cd /sources
tar -xf diffutils-3.10.tar.xz && cd diffutils-3.10
./configure --prefix=/usr
make && make install
cd .. && rm -rf diffutils-3.10`}),i.jsx("h2",{children:"Gawk"}),i.jsx(s,{language:"bash",code:`tar -xf gawk-5.3.2.tar.xz && cd gawk-5.3.2
sed -i 's/extras//' Makefile.in
./configure --prefix=/usr
make && make install
ln -sv gawk.1 /usr/share/man/man1/awk.1
mkdir -pv                                   /usr/share/doc/gawk-5.3.2
cp    -v doc/{awkforai.txt,*.{eps,pdf,jpg}} /usr/share/doc/gawk-5.3.2
cd .. && rm -rf gawk-5.3.2`}),i.jsx("h2",{children:"Findutils"}),i.jsx(s,{language:"bash",code:`tar -xf findutils-4.10.0.tar.xz && cd findutils-4.10.0
./configure --prefix=/usr --localstatedir=/var/lib/locate
make && make install
cd .. && rm -rf findutils-4.10.0`})]})}export{t as default};

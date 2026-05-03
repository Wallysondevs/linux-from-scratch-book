import{j as e}from"./index-CGptwfLb.js";import{P as r}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";function t(){return e.jsxs(r,{title:"Flex, Tcl, Expect, DejaGNU",subtitle:"Lex/yacc-like, scripting Tcl, automação Expect e suporte a testes do GCC.",difficulty:"intermediario",timeToRead:"5 min",children:[e.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Flex"})," "," — "," ","lex generator."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tcl"})," "," — "," ","linguagem."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Expect"})," "," — "," ","automação."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Build"})," "," — "," ","dependências do test."]})]}),e.jsx("h2",{children:"Flex"}),e.jsx(s,{language:"bash",code:`cd /sources
tar -xf flex-2.6.4.tar.gz && cd flex-2.6.4
./configure --prefix=/usr --docdir=/usr/share/doc/flex-2.6.4 --disable-static
make && make install
ln -sv flex   /usr/bin/lex
ln -sv flex.1 /usr/share/man/man1/lex.1
cd .. && rm -rf flex-2.6.4`}),e.jsx("h2",{children:"Tcl"}),e.jsx(s,{language:"bash",code:`tar -xf tcl8.6.16-src.tar.gz && cd tcl8.6.16
SRCDIR=$(pwd)
cd unix
./configure --prefix=/usr --mandir=/usr/share/man
make
sed -e "s|$SRCDIR/unix|/usr/lib|" -e "s|$SRCDIR|/usr/include|" -i tclConfig.sh
make install
chmod -v u+w /usr/lib/libtcl8.6.so
make install-private-headers
ln -sfv tclsh8.6 /usr/bin/tclsh
mv /usr/share/man/man3/{Thread,Tcl_Thread}.3
cd ../.. && rm -rf tcl8.6.16`}),e.jsx("h2",{children:"Expect"}),e.jsx(s,{language:"bash",code:`tar -xf expect5.45.4.tar.gz && cd expect5.45.4
./configure --prefix=/usr --with-tcl=/usr/lib --enable-shared \\
            --mandir=/usr/share/man --with-tclinclude=/usr/include
make && make install
ln -svf expect5.45.4/libexpect5.45.4.so /usr/lib
cd .. && rm -rf expect5.45.4`}),e.jsx("h2",{children:"DejaGNU"}),e.jsx(s,{language:"bash",code:`tar -xf dejagnu-1.6.3.tar.gz && cd dejagnu-1.6.3
mkdir -v build && cd build
../configure --prefix=/usr
makeinfo --html --no-split -o doc/dejagnu.html ../doc/dejagnu.texi
makeinfo --plaintext       -o doc/dejagnu.txt  ../doc/dejagnu.texi
make install
install -v -dm755 /usr/share/doc/dejagnu-1.6.3
install -v -m644  doc/dejagnu.{html,txt} /usr/share/doc/dejagnu-1.6.3
cd ../.. && rm -rf dejagnu-1.6.3`})]})}export{t as default};

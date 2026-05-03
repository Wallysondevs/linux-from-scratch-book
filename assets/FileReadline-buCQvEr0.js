import{j as e}from"./index-CGptwfLb.js";import{P as r}from"./PageContainer-DhWxB77g.js";import{C as i}from"./CodeBlock-DiEVa7fR.js";function n(){return e.jsxs(r,{title:"File, Readline, M4 (final), Bc",subtitle:"Mais utilitários básicos. Bc é necessário para configurar o kernel depois.",difficulty:"intermediario",timeToRead:"4 min",children:[e.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"file"})," "," — "," ","tipo de arquivo."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Readline"})," "," — "," ","linha de comando."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Build"})," "," — "," ","autotools."]})]}),e.jsx("h2",{children:"File (final)"}),e.jsx(i,{language:"bash",code:`cd /sources
tar -xf file-5.46.tar.gz && cd file-5.46
./configure --prefix=/usr
make && make install
cd .. && rm -rf file-5.46`}),e.jsx("h2",{children:"Readline"}),e.jsx(i,{language:"bash",code:`tar -xf readline-8.3.tar.gz && cd readline-8.3

sed -i '/MV.*old/d' Makefile.in
sed -i '/{OLDSUFF}/c:' support/shlib-install
sed -i 's/-Wl,-rpath,[^ ]*//' support/shobj-conf

./configure --prefix=/usr      \\
            --disable-static   \\
            --with-curses      \\
            --docdir=/usr/share/doc/readline-8.3

make SHLIB_LIBS="-lncursesw"
make SHLIB_LIBS="-lncursesw" install
install -v -m644 doc/*.{ps,pdf,html,dvi} /usr/share/doc/readline-8.3 || true
cd .. && rm -rf readline-8.3`}),e.jsx("h2",{children:"M4 (final)"}),e.jsx(i,{language:"bash",code:`tar -xf m4-1.4.20.tar.xz && cd m4-1.4.20
./configure --prefix=/usr
make && make install
cd .. && rm -rf m4-1.4.20`}),e.jsx("h2",{children:"Bc"}),e.jsx(i,{language:"bash",code:`tar -xf bc-7.0.3.tar.xz && cd bc-7.0.3
CC=gcc ./configure --prefix=/usr -G -O3 -r
make && make install
cd .. && rm -rf bc-7.0.3`})]})}export{n as default};

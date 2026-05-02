import{j as e}from"./index-K1a8hxkV.js";import{P as i}from"./PageContainer-BFvVnrCN.js";import{C as r}from"./CodeBlock-DvB8XoAE.js";function c(){return e.jsxs(i,{title:"File, Readline, M4 (final), Bc",subtitle:"Mais utilitários básicos. Bc é necessário para configurar o kernel depois.",difficulty:"intermediario",timeToRead:"4 min",children:[e.jsx("h2",{children:"File (final)"}),e.jsx(r,{language:"bash",code:`cd /sources
tar -xf file-5.46.tar.gz && cd file-5.46
./configure --prefix=/usr
make && make install
cd .. && rm -rf file-5.46`}),e.jsx("h2",{children:"Readline"}),e.jsx(r,{language:"bash",code:`tar -xf readline-8.3.tar.gz && cd readline-8.3

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
cd .. && rm -rf readline-8.3`}),e.jsx("h2",{children:"M4 (final)"}),e.jsx(r,{language:"bash",code:`tar -xf m4-1.4.20.tar.xz && cd m4-1.4.20
./configure --prefix=/usr
make && make install
cd .. && rm -rf m4-1.4.20`}),e.jsx("h2",{children:"Bc"}),e.jsx(r,{language:"bash",code:`tar -xf bc-7.0.3.tar.xz && cd bc-7.0.3
CC=gcc ./configure --prefix=/usr -G -O3 -r
make && make install
cd .. && rm -rf bc-7.0.3`})]})}export{c as default};

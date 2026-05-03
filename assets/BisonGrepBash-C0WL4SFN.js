import{j as s}from"./index-CGptwfLb.js";import{P as r}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";function l(){return s.jsxs(r,{title:"Bison, Grep, Bash, Libtool",subtitle:"Versões finais desses pacotes, agora linkadas à Glibc final.",difficulty:"intermediario",timeToRead:"5 min",children:[s.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),s.jsx("h2",{children:"Glossário rápido"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Bison"})," "," — "," ","parser generator."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Grep"})," "," — "," ","busca."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Bash"})," "," — "," ","shell."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Build temp"})," "," — "," ","toolchain."]})]}),s.jsx("h2",{children:"Bison"}),s.jsx(e,{language:"bash",code:`cd /sources
tar -xf bison-3.8.2.tar.xz && cd bison-3.8.2
./configure --prefix=/usr --docdir=/usr/share/doc/bison-3.8.2
make && make install
cd .. && rm -rf bison-3.8.2`}),s.jsx("h2",{children:"Grep"}),s.jsx(e,{language:"bash",code:`tar -xf grep-3.11.tar.xz && cd grep-3.11
sed -i "s/echo/#echo/" src/egrep.sh
./configure --prefix=/usr
make && make install
cd .. && rm -rf grep-3.11`}),s.jsx("h2",{children:"Bash (final)"}),s.jsx(e,{language:"bash",code:`tar -xf bash-5.3.tar.gz && cd bash-5.3

./configure --prefix=/usr        \\
            --without-bash-malloc \\
            --with-installed-readline \\
            --docdir=/usr/share/doc/bash-5.3

make
chown -Rv tester .
su -s /usr/bin/expect tester << "EOF"
set timeout -1
spawn make tests
expect eof
lassign [wait] _ _ _ value
exit $value
EOF

make install
exec /usr/bin/bash --login
cd /sources && rm -rf bash-5.3`}),s.jsx("h2",{children:"Libtool"}),s.jsx(e,{language:"bash",code:`tar -xf libtool-2.5.4.tar.xz && cd libtool-2.5.4
./configure --prefix=/usr
make && make install
rm -fv /usr/lib/libltdl.a
cd .. && rm -rf libtool-2.5.4`})]})}export{l as default};

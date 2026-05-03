import{j as e}from"./index-CGptwfLb.js";import{P as o}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";function t(){return e.jsxs(o,{title:"Autoconf, Automake, OpenSSL",subtitle:"As ferramentas Autotools (autoconf/automake) e a biblioteca de criptografia OpenSSL.",difficulty:"intermediario",timeToRead:"5 min",children:[e.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Autoconf"})," "," — "," ","gera configure."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Automake"})," "," — "," ","gera Makefile.in."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Libtool"})," "," — "," ","wrapper."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Build"})," "," — "," ","clássico."]})]}),e.jsx("h2",{children:"Autoconf"}),e.jsx(s,{language:"bash",code:`cd /sources
tar -xf autoconf-2.72.tar.xz && cd autoconf-2.72
./configure --prefix=/usr
make && make install
cd .. && rm -rf autoconf-2.72`}),e.jsx("h2",{children:"Automake"}),e.jsx(s,{language:"bash",code:`tar -xf automake-1.18.1.tar.xz && cd automake-1.18.1
./configure --prefix=/usr --docdir=/usr/share/doc/automake-1.18.1
make && make install
cd .. && rm -rf automake-1.18.1`}),e.jsx("h2",{children:"OpenSSL"}),e.jsx(s,{language:"bash",code:`tar -xf openssl-3.5.2.tar.gz && cd openssl-3.5.2

./config --prefix=/usr         \\
         --openssldir=/etc/ssl \\
         --libdir=lib          \\
         shared                \\
         zlib-dynamic

make
HARNESS_JOBS=$(nproc) make test
sed -i '/INSTALL_LIBS/s/libcrypto.a libssl.a//' Makefile
make MANSUFFIX=ssl install
mv -v /usr/share/doc/openssl /usr/share/doc/openssl-3.5.2
cp -vfr doc/* /usr/share/doc/openssl-3.5.2
cd .. && rm -rf openssl-3.5.2`})]})}export{t as default};

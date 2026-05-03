import{j as e}from"./index-ZrM6Gh7j.js";import{P as o}from"./PageContainer-jOSfeH0u.js";import{C as a}from"./CodeBlock-cFXLaLiU.js";function i(){return e.jsxs(o,{title:"Autoconf, Automake, OpenSSL",subtitle:"As ferramentas Autotools (autoconf/automake) e a biblioteca de criptografia OpenSSL.",difficulty:"intermediario",timeToRead:"5 min",children:[e.jsx("h2",{children:"Autoconf"}),e.jsx(a,{language:"bash",code:`cd /sources
tar -xf autoconf-2.72.tar.xz && cd autoconf-2.72
./configure --prefix=/usr
make && make install
cd .. && rm -rf autoconf-2.72`}),e.jsx("h2",{children:"Automake"}),e.jsx(a,{language:"bash",code:`tar -xf automake-1.18.1.tar.xz && cd automake-1.18.1
./configure --prefix=/usr --docdir=/usr/share/doc/automake-1.18.1
make && make install
cd .. && rm -rf automake-1.18.1`}),e.jsx("h2",{children:"OpenSSL"}),e.jsx(a,{language:"bash",code:`tar -xf openssl-3.5.2.tar.gz && cd openssl-3.5.2

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
cd .. && rm -rf openssl-3.5.2`})]})}export{i as default};

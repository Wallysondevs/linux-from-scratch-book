import{j as e}from"./index-ZrM6Gh7j.js";import{P as r}from"./PageContainer-jOSfeH0u.js";import{C as s}from"./CodeBlock-cFXLaLiU.js";function t(){return e.jsxs(r,{title:"Bison, Grep, Bash, Libtool",subtitle:"Versões finais desses pacotes, agora linkadas à Glibc final.",difficulty:"intermediario",timeToRead:"5 min",children:[e.jsx("h2",{children:"Bison"}),e.jsx(s,{language:"bash",code:`cd /sources
tar -xf bison-3.8.2.tar.xz && cd bison-3.8.2
./configure --prefix=/usr --docdir=/usr/share/doc/bison-3.8.2
make && make install
cd .. && rm -rf bison-3.8.2`}),e.jsx("h2",{children:"Grep"}),e.jsx(s,{language:"bash",code:`tar -xf grep-3.11.tar.xz && cd grep-3.11
sed -i "s/echo/#echo/" src/egrep.sh
./configure --prefix=/usr
make && make install
cd .. && rm -rf grep-3.11`}),e.jsx("h2",{children:"Bash (final)"}),e.jsx(s,{language:"bash",code:`tar -xf bash-5.3.tar.gz && cd bash-5.3

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
cd /sources && rm -rf bash-5.3`}),e.jsx("h2",{children:"Libtool"}),e.jsx(s,{language:"bash",code:`tar -xf libtool-2.5.4.tar.xz && cd libtool-2.5.4
./configure --prefix=/usr
make && make install
rm -fv /usr/lib/libltdl.a
cd .. && rm -rf libtool-2.5.4`})]})}export{t as default};

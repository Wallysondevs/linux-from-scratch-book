import{j as e}from"./index-K1a8hxkV.js";import{P as s}from"./PageContainer-BFvVnrCN.js";import{C as r}from"./CodeBlock-DvB8XoAE.js";function d(){return e.jsxs(s,{title:"GDBM, Gperf, Expat, Inetutils, Less",subtitle:"Bibliotecas de banco-de-dados embutido, perfect-hash, parser XML e ferramentas de rede.",difficulty:"intermediario",timeToRead:"6 min",children:[e.jsx("h2",{children:"GDBM"}),e.jsx(r,{language:"bash",code:`cd /sources
tar -xf gdbm-1.26.tar.gz && cd gdbm-1.26
./configure --prefix=/usr --disable-static --enable-libgdbm-compat
make && make install
cd .. && rm -rf gdbm-1.26`}),e.jsx("h2",{children:"Gperf"}),e.jsx(r,{language:"bash",code:`tar -xf gperf-3.3.tar.gz && cd gperf-3.3
./configure --prefix=/usr --docdir=/usr/share/doc/gperf-3.3
make && make install
cd .. && rm -rf gperf-3.3`}),e.jsx("h2",{children:"Expat"}),e.jsx(r,{language:"bash",code:`tar -xf expat-2.7.1.tar.xz && cd expat-2.7.1
./configure --prefix=/usr --disable-static --docdir=/usr/share/doc/expat-2.7.1
make && make install
install -v -m644 doc/*.{html,css} /usr/share/doc/expat-2.7.1 || true
cd .. && rm -rf expat-2.7.1`}),e.jsx("h2",{children:"Inetutils"}),e.jsx(r,{language:"bash",code:`tar -xf inetutils-2.6.tar.xz && cd inetutils-2.6

./configure --prefix=/usr        \\
            --bindir=/usr/bin    \\
            --localstatedir=/var \\
            --disable-logger     \\
            --disable-whois      \\
            --disable-rcp        \\
            --disable-rexec      \\
            --disable-rlogin     \\
            --disable-rsh        \\
            --disable-servers
make && make install
mv -v /usr/{,s}bin/ifconfig
cd .. && rm -rf inetutils-2.6`}),e.jsx("h2",{children:"Less"}),e.jsx(r,{language:"bash",code:`tar -xf less-661.tar.gz && cd less-661
./configure --prefix=/usr --sysconfdir=/etc
make && make install
cd .. && rm -rf less-661`})]})}export{d as default};

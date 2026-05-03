import{j as e}from"./index-Dq2pq_L0.js";import{P as i}from"./PageContainer-CRFAuOt2.js";import{C as a}from"./CodeBlock-DfTRrP6d.js";function n(){return e.jsxs(i,{title:"Gzip, IPRoute2, Kbd, Libpipeline, Make (final)",subtitle:"Compressão, ferramentas de rede modernas, mapas de teclado e libpipeline (usada por man-db).",difficulty:"intermediario",timeToRead:"5 min",children:[e.jsx("h2",{children:"Gzip"}),e.jsx(a,{language:"bash",code:`cd /sources
tar -xf gzip-1.14.tar.xz && cd gzip-1.14
./configure --prefix=/usr
make && make install
cd .. && rm -rf gzip-1.14`}),e.jsx("h2",{children:"IPRoute2"}),e.jsx(a,{language:"bash",code:`tar -xf iproute2-6.16.0.tar.xz && cd iproute2-6.16.0
sed -i /ARPD/d Makefile
rm -fv man/man8/arpd.8
make NETNS_RUN_DIR=/run/netns
make SBINDIR=/usr/sbin install
mkdir -pv             /usr/share/doc/iproute2-6.16.0
cp -v COPYING README* /usr/share/doc/iproute2-6.16.0
cd .. && rm -rf iproute2-6.16.0`}),e.jsx("h2",{children:"Kbd"}),e.jsx(a,{language:"bash",code:`tar -xf kbd-2.8.0.tar.xz && cd kbd-2.8.0
patch -Np1 -i ../kbd-2.8.0-backspace-1.patch
sed -i '/RESIZECONS_PROGS=/s/yes/no/' configure
sed -i 's/resizecons.8 //' docs/man/man8/Makefile.in
./configure --prefix=/usr --disable-vlock
make && make install
cd .. && rm -rf kbd-2.8.0`}),e.jsx("h2",{children:"Libpipeline"}),e.jsx(a,{language:"bash",code:`tar -xf libpipeline-1.5.8.tar.gz && cd libpipeline-1.5.8
./configure --prefix=/usr
make && make install
cd .. && rm -rf libpipeline-1.5.8`}),e.jsx("h2",{children:"Make (final)"}),e.jsx(a,{language:"bash",code:`tar -xf make-4.4.1.tar.gz && cd make-4.4.1
./configure --prefix=/usr
make && make install
cd .. && rm -rf make-4.4.1`})]})}export{n as default};

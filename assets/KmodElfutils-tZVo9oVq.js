import{j as i}from"./index-CGptwfLb.js";import{P as s}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";function d(){return i.jsxs(s,{title:"Kmod, Elfutils, Libffi",subtitle:"Carregamento de módulos do kernel, leitura de binários ELF e foreign function interface.",difficulty:"intermediario",timeToRead:"5 min",children:[i.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),i.jsx("h2",{children:"Glossário rápido"}),i.jsxs("ul",{children:[i.jsxs("li",{children:[i.jsx("strong",{children:"Kmod"})," "," — "," ","module utils."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Elfutils"})," "," — "," ","libelf, eu-readelf."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Build"})," "," — "," ","clássico."]})]}),i.jsx("h2",{children:"Libffi"}),i.jsx(e,{language:"bash",code:`cd /sources
tar -xf libffi-3.5.2.tar.gz && cd libffi-3.5.2
./configure --prefix=/usr          \\
            --disable-static       \\
            --with-gcc-arch=native
make && make install
cd .. && rm -rf libffi-3.5.2`}),i.jsx("h2",{children:"Kmod"}),i.jsx(e,{language:"bash",code:`tar -xf kmod-32.tar.xz && cd kmod-32
./configure --prefix=/usr     \\
            --sysconfdir=/etc \\
            --with-openssl    \\
            --with-xz         \\
            --with-zstd       \\
            --with-zlib

make && make install

for target in depmod insmod modinfo modprobe rmmod; do
  ln -sfv ../bin/kmod /usr/sbin/$target
done
ln -sfv kmod /usr/bin/lsmod
cd .. && rm -rf kmod-32`}),i.jsx("h2",{children:"Elfutils"}),i.jsx(e,{language:"bash",code:`tar -xf elfutils-0.193.tar.bz2 && cd elfutils-0.193
./configure --prefix=/usr                 \\
            --disable-debuginfod          \\
            --enable-libdebuginfod=dummy

make && make install
rm /usr/lib/lib{asm,debuginfod,dw,elf}.a
cd .. && rm -rf elfutils-0.193`})]})}export{d as default};

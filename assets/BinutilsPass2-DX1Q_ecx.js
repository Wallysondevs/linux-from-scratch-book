import{j as s}from"./index-CGptwfLb.js";import{P as i}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";function t(){return s.jsxs(i,{title:"Binutils — Pass 2",subtitle:"Recompilando o Binutils com a toolchain temporária recém-criada.",difficulty:"avancado",timeToRead:"5 min",children:[s.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),s.jsx("h2",{children:"Glossário rápido"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Pass 2"})," "," — "," ","rebuild com glibc."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"cross"})," "," — "," ","com /tools."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Sysroot"})," "," — "," ","--with-sysroot=$LFS."]})]}),s.jsx("h2",{children:"Build"}),s.jsx(e,{language:"bash",code:`cd $LFS/sources
tar -xf binutils-2.45.tar.xz && cd binutils-2.45

# Patch para evitar problema com tooldir
sed '6009s/$add_dir//' -i ltmain.sh

mkdir -v build
cd build

../configure                   \\
    --prefix=/usr              \\
    --build=$(../config.guess) \\
    --host=$LFS_TGT            \\
    --disable-nls              \\
    --enable-shared            \\
    --enable-gprofng=no        \\
    --disable-werror           \\
    --enable-64-bit-bfd        \\
    --enable-new-dtags         \\
    --enable-default-hash-style=gnu

make
make DESTDIR=$LFS install

# Removendo libtool archives:
rm -v $LFS/usr/lib/lib{bfd,ctf,ctf-nobfd,opcodes,sframe}.{a,la}

cd $LFS/sources
rm -rf binutils-2.45`})]})}export{t as default};

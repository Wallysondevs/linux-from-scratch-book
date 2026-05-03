import{j as i}from"./index-CGptwfLb.js";import{P as e}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";function t(){return i.jsxs(e,{title:"Diffutils, File, Findutils, Gawk",subtitle:"Quatro pacotes pequenos compilados em sequência.",difficulty:"intermediario",timeToRead:"5 min",children:[i.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),i.jsx("h2",{children:"Glossário rápido"}),i.jsxs("ul",{children:[i.jsxs("li",{children:[i.jsx("strong",{children:"Diffutils temp"})," "," — "," ","para chroot."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Cross"})," "," — "," ","LFS_TGT."]})]}),i.jsx("h2",{children:"Diffutils"}),i.jsx(s,{language:"bash",code:`cd $LFS/sources
tar -xf diffutils-3.10.tar.xz && cd diffutils-3.10

./configure --prefix=/usr   \\
            --host=$LFS_TGT \\
            --build=$(./build-aux/config.guess)

make
make DESTDIR=$LFS install

cd .. && rm -rf diffutils-3.10`}),i.jsx("h2",{children:"File"}),i.jsx(s,{language:"bash",code:`tar -xf file-5.46.tar.gz && cd file-5.46

mkdir build
pushd build
  ../configure --disable-bzlib      \\
               --disable-libseccomp \\
               --disable-xzlib      \\
               --disable-zlib
  make
popd

./configure --prefix=/usr --host=$LFS_TGT --build=$(./config.guess)
make FILE_COMPILE=$(pwd)/build/src/file
make DESTDIR=$LFS install
rm -v $LFS/usr/lib/libmagic.la

cd .. && rm -rf file-5.46`}),i.jsx("h2",{children:"Findutils"}),i.jsx(s,{language:"bash",code:`tar -xf findutils-4.10.0.tar.xz && cd findutils-4.10.0

./configure --prefix=/usr                   \\
            --localstatedir=/var/lib/locate \\
            --host=$LFS_TGT                 \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd .. && rm -rf findutils-4.10.0`}),i.jsx("h2",{children:"Gawk"}),i.jsx(s,{language:"bash",code:`tar -xf gawk-5.3.2.tar.xz && cd gawk-5.3.2

# Não tentamos compilar a extensão para o host:
sed -i 's/extras//' Makefile.in

./configure --prefix=/usr   \\
            --host=$LFS_TGT \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd .. && rm -rf gawk-5.3.2`})]})}export{t as default};

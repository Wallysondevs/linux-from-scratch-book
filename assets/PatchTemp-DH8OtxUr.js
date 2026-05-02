import{j as a}from"./index-K1a8hxkV.js";import{P as r}from"./PageContainer-BFvVnrCN.js";import{C as e}from"./CodeBlock-DvB8XoAE.js";function d(){return a.jsxs(r,{title:"Patch, Sed, Tar, Xz",subtitle:"Os últimos pacotes da fase de ferramentas temporárias antes do Pass 2.",difficulty:"intermediario",timeToRead:"5 min",children:[a.jsx("h2",{children:"Patch"}),a.jsx(e,{language:"bash",code:`cd $LFS/sources
tar -xf patch-2.8.tar.xz && cd patch-2.8
./configure --prefix=/usr --host=$LFS_TGT --build=$(build-aux/config.guess)
make && make DESTDIR=$LFS install
cd .. && rm -rf patch-2.8`}),a.jsx("h2",{children:"Sed"}),a.jsx(e,{language:"bash",code:`tar -xf sed-4.9.tar.xz && cd sed-4.9
./configure --prefix=/usr --host=$LFS_TGT
make && make DESTDIR=$LFS install
cd .. && rm -rf sed-4.9`}),a.jsx("h2",{children:"Tar"}),a.jsx(e,{language:"bash",code:`tar -xf tar-1.35.tar.xz && cd tar-1.35
./configure --prefix=/usr                   \\
            --host=$LFS_TGT                 \\
            --build=$(build-aux/config.guess)
make && make DESTDIR=$LFS install
cd .. && rm -rf tar-1.35`}),a.jsx("h2",{children:"Xz"}),a.jsx(e,{language:"bash",code:`tar -xf xz-5.6.2.tar.xz && cd xz-5.6.2

./configure --prefix=/usr                     \\
            --host=$LFS_TGT                   \\
            --build=$(build-aux/config.guess) \\
            --disable-static                  \\
            --docdir=/usr/share/doc/xz-5.6.2

make && make DESTDIR=$LFS install
rm -v $LFS/usr/lib/liblzma.la
cd .. && rm -rf xz-5.6.2`})]})}export{d as default};

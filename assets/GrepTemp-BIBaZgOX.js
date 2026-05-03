import{j as e}from"./index-ZrM6Gh7j.js";import{P as i}from"./PageContainer-jOSfeH0u.js";import{C as r}from"./CodeBlock-cFXLaLiU.js";function o(){return e.jsxs(i,{title:"Grep, Gzip, Make",subtitle:"Mais três utilitários da toolchain temporária.",difficulty:"intermediario",timeToRead:"4 min",children:[e.jsx("h2",{children:"Grep"}),e.jsx(r,{language:"bash",code:`cd $LFS/sources
tar -xf grep-3.11.tar.xz && cd grep-3.11

./configure --prefix=/usr   \\
            --host=$LFS_TGT \\
            --build=$(./build-aux/config.guess)

make
make DESTDIR=$LFS install
cd .. && rm -rf grep-3.11`}),e.jsx("h2",{children:"Gzip"}),e.jsx(r,{language:"bash",code:`tar -xf gzip-1.14.tar.xz && cd gzip-1.14

./configure --prefix=/usr --host=$LFS_TGT
make
make DESTDIR=$LFS install
cd .. && rm -rf gzip-1.14`}),e.jsx("h2",{children:"Make"}),e.jsx(r,{language:"bash",code:`tar -xf make-4.4.1.tar.gz && cd make-4.4.1

./configure --prefix=/usr   \\
            --without-guile \\
            --host=$LFS_TGT \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install
cd .. && rm -rf make-4.4.1`})]})}export{o as default};

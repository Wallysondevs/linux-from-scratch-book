import{j as i}from"./index-Dq2pq_L0.js";import{P as a}from"./PageContainer-CRFAuOt2.js";import{C as s}from"./CodeBlock-DfTRrP6d.js";function t(){return i.jsxs(a,{title:"Zlib, Bzip2, Xz, Zstd",subtitle:"Bibliotecas de compressão. Vários pacotes mais à frente vão exigi-las.",difficulty:"intermediario",timeToRead:"5 min",children:[i.jsx("h2",{children:"Zlib"}),i.jsx(s,{language:"bash",code:`cd /sources
tar -xf zlib-1.3.1.tar.xz && cd zlib-1.3.1
./configure --prefix=/usr
make && make install
rm -fv /usr/lib/libz.a
cd .. && rm -rf zlib-1.3.1`}),i.jsx("h2",{children:"Bzip2"}),i.jsx(s,{language:"bash",code:`tar -xf bzip2-1.0.8.tar.gz && cd bzip2-1.0.8

patch -Np1 -i ../bzip2-1.0.8-install_docs-1.patch
sed -i 's@\\(ln -s -f \\)$(PREFIX)/bin/@\\1@' Makefile
sed -i "s@(PREFIX)/man@(PREFIX)/share/man@g" Makefile

make -f Makefile-libbz2_so
make clean
make
make PREFIX=/usr install

cp -av libbz2.so.* /usr/lib
ln -sv libbz2.so.1.0.8 /usr/lib/libbz2.so

cp -v bzip2-shared /usr/bin/bzip2
for i in /usr/bin/{bzcat,bunzip2}; do
  ln -sfv bzip2 $i
done
rm -fv /usr/lib/libbz2.a
cd .. && rm -rf bzip2-1.0.8`}),i.jsx("h2",{children:"Xz (final)"}),i.jsx(s,{language:"bash",code:`tar -xf xz-5.6.2.tar.xz && cd xz-5.6.2
./configure --prefix=/usr --disable-static --docdir=/usr/share/doc/xz-5.6.2
make && make install
cd .. && rm -rf xz-5.6.2`}),i.jsx("h2",{children:"Zstd"}),i.jsx(s,{language:"bash",code:`tar -xf zstd-1.5.7.tar.gz && cd zstd-1.5.7
make prefix=/usr
make prefix=/usr install
rm -v /usr/lib/libzstd.a
cd .. && rm -rf zstd-1.5.7`})]})}export{t as default};

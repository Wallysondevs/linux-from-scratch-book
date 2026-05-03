import{j as i}from"./index-ZrM6Gh7j.js";import{P as s}from"./PageContainer-jOSfeH0u.js";import{C as a}from"./CodeBlock-cFXLaLiU.js";function f(){return i.jsxs(s,{title:"Diffutils, Gawk, Findutils (final)",subtitle:"Versões finais dos três pacotes.",difficulty:"iniciante",timeToRead:"3 min",children:[i.jsx("h2",{children:"Diffutils"}),i.jsx(a,{language:"bash",code:`cd /sources
tar -xf diffutils-3.10.tar.xz && cd diffutils-3.10
./configure --prefix=/usr
make && make install
cd .. && rm -rf diffutils-3.10`}),i.jsx("h2",{children:"Gawk"}),i.jsx(a,{language:"bash",code:`tar -xf gawk-5.3.2.tar.xz && cd gawk-5.3.2
sed -i 's/extras//' Makefile.in
./configure --prefix=/usr
make && make install
ln -sv gawk.1 /usr/share/man/man1/awk.1
mkdir -pv                                   /usr/share/doc/gawk-5.3.2
cp    -v doc/{awkforai.txt,*.{eps,pdf,jpg}} /usr/share/doc/gawk-5.3.2
cd .. && rm -rf gawk-5.3.2`}),i.jsx("h2",{children:"Findutils"}),i.jsx(a,{language:"bash",code:`tar -xf findutils-4.10.0.tar.xz && cd findutils-4.10.0
./configure --prefix=/usr --localstatedir=/var/lib/locate
make && make install
cd .. && rm -rf findutils-4.10.0`})]})}export{f as default};

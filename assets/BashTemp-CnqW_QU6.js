import{j as s}from"./index-K1a8hxkV.js";import{P as a}from"./PageContainer-BFvVnrCN.js";import{C as r}from"./CodeBlock-DvB8XoAE.js";function t(){return s.jsxs(a,{title:"Bash",subtitle:"O shell padrão do LFS. Vamos compilar uma versão temporária.",difficulty:"intermediario",timeToRead:"3 min",children:[s.jsx("h2",{children:"Build"}),s.jsx(r,{language:"bash",code:`cd $LFS/sources
tar -xf bash-5.3.tar.gz
cd bash-5.3

./configure --prefix=/usr                      \\
            --build=$(sh support/config.guess) \\
            --host=$LFS_TGT                    \\
            --without-bash-malloc

make
make DESTDIR=$LFS install

# Symlink padrão sh -> bash
ln -sv bash $LFS/bin/sh

cd $LFS/sources
rm -rf bash-5.3`})]})}export{t as default};

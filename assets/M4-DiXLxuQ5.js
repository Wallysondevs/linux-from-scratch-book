import{j as e}from"./index-ZrM6Gh7j.js";import{P as o}from"./PageContainer-jOSfeH0u.js";import{C as r}from"./CodeBlock-cFXLaLiU.js";function a(){return e.jsxs(o,{title:"M4",subtitle:"Processador de macros usado por autoconf, bison e outros. Pacote pequeno e rápido.",difficulty:"intermediario",timeToRead:"3 min",children:[e.jsx("h2",{children:"Build"}),e.jsx(r,{language:"bash",code:`cd $LFS/sources
tar -xf m4-1.4.20.tar.xz
cd m4-1.4.20

./configure --prefix=/usr   \\
            --host=$LFS_TGT \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd $LFS/sources
rm -rf m4-1.4.20`}),e.jsx("p",{className:"text-sm text-muted-foreground mt-4",children:"⏱ Aproximadamente 0.1 SBU. Talvez o pacote mais rápido do livro."})]})}export{a as default};

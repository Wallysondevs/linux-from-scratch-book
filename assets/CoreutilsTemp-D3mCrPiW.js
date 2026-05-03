import{j as r}from"./index-CGptwfLb.js";import{P as s}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";function n(){return r.jsxs(s,{title:"Coreutils",subtitle:"ls, cp, mv, cat, mkdir, rm, chmod, uname... os comandos básicos do shell.",difficulty:"intermediario",timeToRead:"4 min",children:[r.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),r.jsx("h2",{children:"Glossário rápido"}),r.jsxs("ul",{children:[r.jsxs("li",{children:[r.jsx("strong",{children:"Coreutils temp"})," "," — "," ","para chroot."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"LFS_TGT"})," "," — "," ","cross."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"/tools"})," "," — "," ","prefix."]})]}),r.jsx("h2",{children:"Build"}),r.jsx(e,{language:"bash",code:`cd $LFS/sources
tar -xf coreutils-9.7.tar.xz
cd coreutils-9.7

./configure --prefix=/usr                     \\
            --host=$LFS_TGT                   \\
            --build=$(build-aux/config.guess) \\
            --enable-install-program=hostname \\
            --enable-no-install-program=kill,uptime

make
make DESTDIR=$LFS install

# Reorganização padrão FHS
mv -v $LFS/usr/bin/chroot              $LFS/usr/sbin
mkdir -pv $LFS/usr/share/man/man8
mv -v $LFS/usr/share/man/man1/chroot.1 $LFS/usr/share/man/man8/chroot.8
sed -i 's/"1"/"8"/'                    $LFS/usr/share/man/man8/chroot.8

cd $LFS/sources
rm -rf coreutils-9.7`})]})}export{n as default};

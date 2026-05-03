import{j as i}from"./index-CGptwfLb.js";import{P as s}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";function o(){return i.jsxs(s,{title:"Libstdc++ from GCC",subtitle:"A biblioteca C++. Compilada separadamente, ligada à Glibc nova.",difficulty:"avancado",timeToRead:"4 min",children:[i.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),i.jsx("h2",{children:"Glossário rápido"}),i.jsxs("ul",{children:[i.jsxs("li",{children:[i.jsx("strong",{children:"libstdc++"})," "," — "," ","C++ runtime."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Pass 1"})," "," — "," ","sem glibc completo."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Cross"})," "," — "," ","target."]})]}),i.jsx("h2",{children:"Por que separado?"}),i.jsxs("p",{children:["O GCC vem com a libstdc++, mas ela ",i.jsx("strong",{children:"precisa"})," da Glibc para funcionar. Como a Glibc só nasceu agora, recompilamos a libstdc++ contra ela."]}),i.jsx("h2",{children:"Build"}),i.jsx(e,{language:"bash",code:`cd $LFS/sources
tar -xf gcc-15.2.0.tar.xz
cd gcc-15.2.0

mkdir -v build
cd build

../libstdc++-v3/configure           \\
    --host=$LFS_TGT                 \\
    --build=$(../config.guess)      \\
    --prefix=/usr                   \\
    --disable-multilib              \\
    --disable-nls                   \\
    --disable-libstdcxx-pch         \\
    --with-gxx-include-dir=/tools/$LFS_TGT/include/c++/14.2.0

make
make DESTDIR=$LFS install

# Removendo libtool archives inúteis:
rm -v $LFS/usr/lib/lib{stdc++{,exp,fs},supc++}.la

cd $LFS/sources
rm -rf gcc-15.2.0`})]})}export{o as default};

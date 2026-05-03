import{j as i}from"./index-CGptwfLb.js";import{P as s}from"./PageContainer-DhWxB77g.js";import{C as r}from"./CodeBlock-DiEVa7fR.js";import{A as e}from"./AlertBox-DblzR--W.js";function t(){return i.jsxs(s,{title:"GCC — Pass 2",subtitle:"Reconstruindo o GCC com a toolchain temporária. Agora ele será mais 'completo'.",difficulty:"avancado",timeToRead:"6 min",children:[i.jsx(e,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),i.jsx("h2",{children:"Glossário rápido"}),i.jsxs("ul",{children:[i.jsxs("li",{children:[i.jsx("strong",{children:"GCC pass 2"})," "," — "," ","cross com glibc."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"libstdc++"})," "," — "," ","rebuild."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Test compile"})," "," — "," ","header check."]})]}),i.jsx("h2",{children:"Build"}),i.jsx(r,{language:"bash",code:`cd $LFS/sources
tar -xf gcc-15.2.0.tar.xz && cd gcc-15.2.0

# Bibliotecas internas como antes
tar -xf ../mpfr-4.2.2.tar.xz && mv -v mpfr-4.2.2 mpfr
tar -xf ../gmp-6.3.0.tar.xz  && mv -v gmp-6.3.0 gmp
tar -xf ../mpc-1.3.1.tar.gz  && mv -v mpc-1.3.1 mpc

# Multilib em x86_64
case $(uname -m) in
  x86_64)
    sed -e '/m64=/s/lib64/lib/' -i.orig gcc/config/i386/t-linux64
  ;;
esac

# Limita pesquisas a /usr/include do alvo:
sed '/thread_header =/s/@.*@/gthr-posix.h/' \\
    -i libgcc/Makefile.in libstdc++-v3/include/Makefile.in

mkdir -v build
cd build

../configure                                       \\
    --build=$(../config.guess)                     \\
    --host=$LFS_TGT                                \\
    --target=$LFS_TGT                              \\
    LDFLAGS_FOR_TARGET=-L$PWD/$LFS_TGT/libgcc      \\
    --prefix=/usr                                  \\
    --with-build-sysroot=$LFS                      \\
    --enable-default-pie                           \\
    --enable-default-ssp                           \\
    --disable-nls                                  \\
    --disable-multilib                             \\
    --disable-libatomic                            \\
    --disable-libgomp                              \\
    --disable-libquadmath                          \\
    --disable-libsanitizer                         \\
    --disable-libssp                               \\
    --disable-libvtv                               \\
    --enable-languages=c,c++

make
make DESTDIR=$LFS install

ln -sv gcc $LFS/usr/bin/cc

cd $LFS/sources
rm -rf gcc-15.2.0`}),i.jsxs(e,{type:"success",title:"Toolchain temporária 100% pronta",children:["Agora ",i.jsx("code",{children:"$LFS/tools"})," tem tudo o que é necessário para entrar no chroot e construir o sistema final. Próximo capítulo: configurar a propriedade dos arquivos para o root."]})]})}export{t as default};

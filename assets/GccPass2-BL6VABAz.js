import{j as i}from"./index-ZrM6Gh7j.js";import{P as e}from"./PageContainer-jOSfeH0u.js";import{C as a}from"./CodeBlock-cFXLaLiU.js";import{A as s}from"./AlertBox-D3Y0IUPD.js";function c(){return i.jsxs(e,{title:"GCC — Pass 2",subtitle:"Reconstruindo o GCC com a toolchain temporária. Agora ele será mais 'completo'.",difficulty:"avancado",timeToRead:"6 min",children:[i.jsx("h2",{children:"Build"}),i.jsx(a,{language:"bash",code:`cd $LFS/sources
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
rm -rf gcc-15.2.0`}),i.jsxs(s,{type:"success",title:"Toolchain temporária 100% pronta",children:["Agora ",i.jsx("code",{children:"$LFS/tools"})," tem tudo o que é necessário para entrar no chroot e construir o sistema final. Próximo capítulo: configurar a propriedade dos arquivos para o root."]})]})}export{c as default};

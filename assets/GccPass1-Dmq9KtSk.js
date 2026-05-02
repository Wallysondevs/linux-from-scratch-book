import{j as e}from"./index-K1a8hxkV.js";import{P as s}from"./PageContainer-BFvVnrCN.js";import{C as i}from"./CodeBlock-DvB8XoAE.js";import{A as a}from"./AlertBox-C_JmkQL6.js";function o(){return e.jsxs(s,{title:"GCC — Pass 1",subtitle:"O compilador cross. Agora o host consegue gerar binários para o alvo LFS.",difficulty:"avancado",timeToRead:"8 min",children:[e.jsx("h2",{children:"Dependências internas: GMP, MPFR, MPC, ISL"}),e.jsx("p",{children:"O GCC precisa de bibliotecas matemáticas (GMP, MPFR, MPC) e ISL. Em vez de instalá-las separadamente, copiamos para dentro da árvore do GCC e ele compila tudo junto:"}),e.jsx(i,{language:"bash",code:`cd $LFS/sources
tar -xf gcc-15.2.0.tar.xz
cd gcc-15.2.0

tar -xf ../mpfr-4.2.2.tar.xz
mv -v mpfr-4.2.2 mpfr
tar -xf ../gmp-6.3.0.tar.xz
mv -v gmp-6.3.0 gmp
tar -xf ../mpc-1.3.1.tar.gz
mv -v mpc-1.3.1 mpc`}),e.jsx("h2",{children:"Ajuste para multilib em x86_64"}),e.jsx(i,{language:"bash",code:`case $(uname -m) in
  x86_64)
    sed -e '/m64=/s/lib64/lib/' \\
        -i.orig gcc/config/i386/t-linux64
  ;;
esac`}),e.jsx("h2",{children:"Build em diretório separado"}),e.jsx(i,{language:"bash",code:`mkdir -v build
cd build`}),e.jsx("h2",{children:"Configurando"}),e.jsx(i,{language:"bash",code:`../configure                  \\
    --target=$LFS_TGT         \\
    --prefix=$LFS/tools       \\
    --with-glibc-version=2.40 \\
    --with-sysroot=$LFS       \\
    --with-newlib             \\
    --without-headers         \\
    --enable-default-pie      \\
    --enable-default-ssp      \\
    --disable-nls             \\
    --disable-shared          \\
    --disable-multilib        \\
    --disable-threads         \\
    --disable-libatomic       \\
    --disable-libgomp         \\
    --disable-libquadmath     \\
    --disable-libssp          \\
    --disable-libvtv          \\
    --disable-libstdcxx       \\
    --enable-languages=c,c++`}),e.jsx("h3",{children:"Por que tantos --disable?"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"--without-headers"})," — Glibc ainda não existe no alvo."]}),e.jsxs("li",{children:[e.jsx("code",{children:"--with-newlib"}),' — usa "stubs" no lugar da libc (que não existe).']}),e.jsxs("li",{children:[e.jsx("code",{children:"--disable-shared"})," — só libs estáticas; shared libs precisam de Glibc."]}),e.jsxs("li",{children:[e.jsx("code",{children:"--disable-threads/multilib/libatomic/..."})," — features que dependem de Glibc, ainda não disponíveis."]}),e.jsxs("li",{children:[e.jsx("code",{children:"--enable-default-pie/ssp"})," — flags de segurança modernas."]})]}),e.jsx("h2",{children:"Compilando"}),e.jsx(i,{language:"bash",code:`make
# Aproximadamente 4-5 SBU.`}),e.jsx("h2",{children:"Instalando"}),e.jsx(i,{language:"bash",code:"make install"}),e.jsx("h2",{children:"Gerando o limits.h temporário"}),e.jsxs("p",{children:["Sem Glibc, o GCC não consegue gerar um ",e.jsx("code",{children:"limits.h"})," definitivo. O LFS pede para construir um intermediário:"]}),e.jsx(i,{language:"bash",code:`cd ..
cat gcc/limitx.h gcc/glimits.h gcc/limity.h > \\
  $(dirname $($LFS_TGT-gcc -print-libgcc-file-name))/include/limits.h`}),e.jsx("h2",{children:"Limpando"}),e.jsx(i,{language:"bash",code:`cd $LFS/sources
rm -rf gcc-15.2.0`}),e.jsxs(a,{type:"success",title:"Cross-compiler pronto!",children:["Agora você tem ",e.jsx("code",{children:"x86_64-lfs-linux-gnu-gcc"})," em"," ",e.jsx("code",{children:"$LFS/tools/bin"}),". Ele gera binários para o alvo, mas ainda não consegue linkar nada útil (sem Glibc). Vamos resolver isso."]})]})}export{o as default};

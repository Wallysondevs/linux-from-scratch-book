import{j as e}from"./index-ZrM6Gh7j.js";import{P as i}from"./PageContainer-jOSfeH0u.js";import{C as s}from"./CodeBlock-cFXLaLiU.js";import{A as a}from"./AlertBox-D3Y0IUPD.js";function n(){return e.jsxs(i,{title:"Glibc (na Toolchain)",subtitle:"A biblioteca C do GNU. Esta versão sobrevive até o sistema final — não é descartada.",difficulty:"avancado",timeToRead:"8 min",children:[e.jsx("h2",{children:"Por que a Glibc é tão importante?"}),e.jsxs("p",{children:["Praticamente todo programa em C/C++ no Linux depende dela. Define"," ",e.jsx("code",{children:"printf"}),", ",e.jsx("code",{children:"open"}),", ",e.jsx("code",{children:"malloc"}),", e implementa as syscalls de forma portável. É o coração do espaço de usuário."]}),e.jsx("h2",{children:"Preparando"}),e.jsx(s,{language:"bash",code:`cd $LFS/sources
tar -xf glibc-2.42.tar.xz
cd glibc-2.42

# Symlinks para LSB compliance:
case $(uname -m) in
    i?86)   ln -sfv ld-linux.so.2 $LFS/lib/ld-lsb.so.3
    ;;
    x86_64) ln -sfv ../lib/ld-linux-x86-64.so.2 $LFS/lib64
            ln -sfv ../lib/ld-linux-x86-64.so.2 $LFS/lib64/ld-lsb-x86-64.so.3
    ;;
esac

patch -Np1 -i ../glibc-2.42-fhs-1.patch

mkdir -v build
cd build

echo "rootsbindir=/usr/sbin" > configparms`}),e.jsx("h2",{children:"Configurando"}),e.jsx(s,{language:"bash",code:`../configure                             \\
      --prefix=/usr                      \\
      --host=$LFS_TGT                    \\
      --build=$(../scripts/config.guess) \\
      --enable-kernel=4.19               \\
      --with-headers=$LFS/usr/include    \\
      --disable-nscd                     \\
      libc_cv_slibdir=/usr/lib`}),e.jsx("h3",{children:"Flags-chave"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"--prefix=/usr"})," — vai para ",e.jsx("code",{children:"/usr/lib"})," dentro do ",e.jsx("code",{children:"$LFS"})," via DESTDIR."]}),e.jsxs("li",{children:[e.jsx("code",{children:"--host=$LFS_TGT"})," — alvo cross."]}),e.jsxs("li",{children:[e.jsx("code",{children:"--with-headers=$LFS/usr/include"})," — usa os headers do kernel que acabamos de instalar."]}),e.jsxs("li",{children:[e.jsx("code",{children:"--enable-kernel=4.19"})," — versão mínima de kernel que esta Glibc suporta."]})]}),e.jsx("h2",{children:"Compilando e instalando"}),e.jsx(s,{language:"bash",code:`make
make DESTDIR=$LFS install`}),e.jsx("h2",{children:"Correção do path do interpretador"}),e.jsx(s,{language:"bash",code:"sed '/RTLDLIST=/s@/usr@@g' -i $LFS/usr/bin/ldd"}),e.jsx("h2",{children:"Teste de sanidade"}),e.jsxs("p",{children:["Depois de instalar, vamos verificar que o cross-compiler está realmente produzindo binários ligados à ",e.jsx("em",{children:"Glibc nova"}),", não à do host:"]}),e.jsx(s,{language:"bash",code:`echo 'int main(){}' | $LFS_TGT-gcc -xc -
readelf -l a.out | grep ld-linux

# saída esperada:
# [Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]

rm -v a.out`}),e.jsxs(a,{type:"warning",title:"Saída diferente?",children:["Se aparecer ",e.jsx("code",{children:"/lib/ld-linux.so"})," apontando para o host, algo está errado. Pare. Releia os passos de Binutils Pass 1 e GCC Pass 1."]}),e.jsx("h2",{children:"Limpando"}),e.jsx(s,{language:"bash",code:`cd $LFS/sources
rm -rf glibc-2.42`})]})}export{n as default};

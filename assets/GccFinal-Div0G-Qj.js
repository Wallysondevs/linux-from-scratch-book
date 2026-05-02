import{j as e}from"./index-K1a8hxkV.js";import{P as a}from"./PageContainer-BFvVnrCN.js";import{C as i}from"./CodeBlock-DvB8XoAE.js";import{A as s}from"./AlertBox-C_JmkQL6.js";function t(){return e.jsxs(a,{title:"GCC (final)",subtitle:"A versão definitiva do GCC. Vai compilar tudo de agora em diante e do sistema futuro.",difficulty:"avancado",timeToRead:"10 min",children:[e.jsx("h2",{children:"Build"}),e.jsx(i,{language:"bash",code:`cd /sources
tar -xf gcc-15.2.0.tar.xz && cd gcc-15.2.0

case $(uname -m) in
  x86_64)
    sed -e '/m64=/s/lib64/lib/' -i.orig gcc/config/i386/t-linux64
  ;;
esac

mkdir -v build && cd build

../configure --prefix=/usr            \\
             LD=ld                    \\
             --enable-languages=c,c++ \\
             --enable-default-pie     \\
             --enable-default-ssp     \\
             --enable-host-pie        \\
             --disable-multilib       \\
             --disable-bootstrap      \\
             --disable-fixincludes    \\
             --with-system-zlib

make
ulimit -s -H unlimited

sed -e '/lfunc_args_alignment/d' \\
    -i ../gcc/testsuite/gcc.target/i386/pr105730.c

chown -R tester .
su tester -c "PATH=$PATH make -k check" || true
../contrib/test_summary
make install

# Limpando
rm -rf /usr/lib/gcc/$(gcc -dumpmachine)/14.2.0/include-fixed/bits/

# Symlinks padrão
chown -v -R root:root \\
  /usr/lib/gcc/*linux-gnu/14.2.0/include{,-fixed}

ln -svr /usr/bin/cpp /usr/lib
ln -sv gcc.1 /usr/share/man/man1/cc.1
ln -sfv ../../libexec/gcc/$(gcc -dumpmachine)/14.2.0/liblto_plugin.so \\
        /usr/lib/bfd-plugins/

mkdir -pv /usr/share/gdb/auto-load/usr/lib
mv -v /usr/lib/*gdb.py /usr/share/gdb/auto-load/usr/lib

cd ../.. && rm -rf gcc-15.2.0`}),e.jsx("h2",{children:"Sanity check pós-instalação"}),e.jsx(i,{language:"bash",code:`echo 'int main(){}' | cc -v -Wl,--verbose &> dummy.log
readelf -l a.out | grep ': /lib'
# saída esperada:
# [Requesting program interpreter: /lib64/ld-linux-x86-64.so.2]

grep -E -o '/usr/lib.*/S?crt[1in].*succeeded' dummy.log
# /usr/lib/gcc/x86_64-pc-linux-gnu/14.2.0/../../../../lib/Scrt1.o succeeded
# ...

rm -v dummy.c a.out dummy.log`}),e.jsxs(s,{type:"warning",title:"Saídas com /tools? PARE.",children:["Se aparecer algum caminho com ",e.jsx("code",{children:"/tools"})," ou referência ao host, a Glibc final não está sendo usada. Refaça os passos da Glibc final."]})]})}export{t as default};

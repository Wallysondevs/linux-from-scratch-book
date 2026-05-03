import{j as e}from"./index-CGptwfLb.js";import{P as o}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";import{A as i}from"./AlertBox-DblzR--W.js";function d(){return e.jsxs(o,{title:"Strip & Cleanup do Sistema",subtitle:"Reduza o tamanho do sistema final removendo símbolos de debug e arquivos desnecessários.",difficulty:"intermediario",timeToRead:"4 min",children:[e.jsx(i,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"strip"})," "," — "," ","remove debug symbols."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"/usr/lib"})," "," — "," ","strip libraries."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Disk savings"})," "," — "," ","GBs."]})]}),e.jsx("h2",{children:"Removendo /tools"}),e.jsxs("p",{children:["A toolchain temporária em ",e.jsx("code",{children:"/tools"})," não é mais necessária — tudo já foi recompilado no sistema final. Hora de limpar:"]}),e.jsx(s,{language:"bash",code:"rm -rf /tools"}),e.jsx("h2",{children:"Removendo arquivos de teste"}),e.jsx(s,{language:"bash",code:`find /usr/lib /usr/libexec -name \\*.la -delete
find /usr -depth -name $(uname -m)-lfs-linux-gnu\\* | xargs rm -rf

userdel -r tester  # se ainda existir`}),e.jsx("h2",{children:"Strip de binários"}),e.jsx("p",{children:"Salve o estado dos arquivos antes — strip pode quebrar se feito errado:"}),e.jsx(s,{language:"bash",code:`save_usrlib="$(cd /usr/lib; ls ld-linux*.so* libc.so* libthread_db.so* libquadmath.so.* \\
                            libstdc++.so* libitm.so* libatomic.so*)"

cd /usr/lib
for LIB in $save_usrlib; do
    objcopy --only-keep-debug --compress-debug-sections=zlib $LIB $LIB.dbg
    cp $LIB /tmp/$LIB
    strip --strip-unneeded /tmp/$LIB
    objcopy --add-gnu-debuglink=$LIB.dbg /tmp/$LIB
    install -vm755 /tmp/$LIB /usr/lib
    rm /tmp/$LIB
done

# Strip de tudo o que não está marcado
find /usr/lib -type f -name \\*.so* ! -name \\*dbg \\
    -exec strip --strip-unneeded {} ';'
find /usr/{bin,sbin,libexec} -type f \\
    -exec strip --strip-all {} ';'

unset LIB save_usrlib`}),e.jsx(i,{type:"success",title:"Sistema enxuto",children:"Após o strip, você economiza centenas de MB. Próxima fase: configuração do sistema (rede, locale, fstab) e finalmente o kernel + GRUB."})]})}export{d as default};

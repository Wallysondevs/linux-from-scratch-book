import{j as e}from"./index-ZrM6Gh7j.js";import{P as i}from"./PageContainer-jOSfeH0u.js";import{C as s}from"./CodeBlock-cFXLaLiU.js";import{A as o}from"./AlertBox-D3Y0IUPD.js";function n(){return e.jsxs(i,{title:"Strip & Cleanup do Sistema",subtitle:"Reduza o tamanho do sistema final removendo símbolos de debug e arquivos desnecessários.",difficulty:"intermediario",timeToRead:"4 min",children:[e.jsx("h2",{children:"Removendo /tools"}),e.jsxs("p",{children:["A toolchain temporária em ",e.jsx("code",{children:"/tools"})," não é mais necessária — tudo já foi recompilado no sistema final. Hora de limpar:"]}),e.jsx(s,{language:"bash",code:"rm -rf /tools"}),e.jsx("h2",{children:"Removendo arquivos de teste"}),e.jsx(s,{language:"bash",code:`find /usr/lib /usr/libexec -name \\*.la -delete
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

unset LIB save_usrlib`}),e.jsx(o,{type:"success",title:"Sistema enxuto",children:"Após o strip, você economiza centenas de MB. Próxima fase: configuração do sistema (rede, locale, fstab) e finalmente o kernel + GRUB."})]})}export{n as default};

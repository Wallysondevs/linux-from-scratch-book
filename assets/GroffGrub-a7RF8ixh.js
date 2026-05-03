import{j as r}from"./index-Dq2pq_L0.js";import{P as o}from"./PageContainer-CRFAuOt2.js";import{C as e}from"./CodeBlock-DfTRrP6d.js";import{A as a}from"./AlertBox-DFdNRTyW.js";function c(){return r.jsxs(o,{title:"Groff & GRUB",subtitle:"Groff formata as man-pages. GRUB é o bootloader que carrega o kernel — peça crítica.",difficulty:"intermediario",timeToRead:"4 min",children:[r.jsx("h2",{children:"Groff"}),r.jsx(e,{language:"bash",code:`cd /sources
tar -xf groff-1.23.0.tar.gz && cd groff-1.23.0
PAGE=A4 ./configure --prefix=/usr   # ou PAGE=letter
make
make install
cd .. && rm -rf groff-1.23.0`}),r.jsx("h2",{children:"GRUB"}),r.jsx(e,{language:"bash",code:`tar -xf grub-2.12.tar.xz && cd grub-2.12

unset {C,CPP,CXX,LD}FLAGS

echo depends bli part_gpt > grub-core/extra_deps.lst
./configure --prefix=/usr        \\
            --sysconfdir=/etc    \\
            --disable-efiemu     \\
            --disable-werror

make
make install
mv -v /etc/bash_completion.d/grub /usr/share/bash-completion/completions
cd .. && rm -rf grub-2.12`}),r.jsxs(a,{type:"info",title:"GRUB para EFI?",children:["Para sistemas UEFI, adicione ",r.jsx("code",{children:"--with-platform=efi"})," ao"," ",r.jsx("code",{children:"./configure"})," e instale também ",r.jsx("code",{children:"efibootmgr"})," via BLFS. A configuração final virá no capítulo ",r.jsx("a",{href:"#/grub",children:"Configurando o GRUB"}),"."]})]})}export{c as default};

import{j as s}from"./index-Dq2pq_L0.js";import{P as i}from"./PageContainer-CRFAuOt2.js";import{C as o}from"./CodeBlock-DfTRrP6d.js";import{A as e}from"./AlertBox-DFdNRTyW.js";import{P as r}from"./PracticeBox-BXFoiNe5.js";function l(){return s.jsxs(i,{title:"Bash — Pacote temporário",subtitle:"O shell padrão do LFS. Aqui montamos a versão cross-compilada que será usada dentro do chroot até o build final.",difficulty:"intermediario",timeToRead:"7 min",children:[s.jsx("h2",{children:"Por que Bash temporário?"}),s.jsxs("p",{children:["Quando entrarmos no chroot, o sistema não terá mais acesso aos binários do host. Precisamos de um shell funcional que rode com a Glibc temporária recém-instalada — caso contrário, nem",s.jsx("code",{children:" ./configure "})," nem ",s.jsx("code",{children:"make"})," conseguem ser executados. Bash 5.3 é a versão coberta no LFS 12.4."]}),s.jsxs(e,{type:"info",title:"Bash vs Dash vs Ash",children:["Algumas distros (Debian) usam ",s.jsx("code",{children:"dash"})," como",s.jsx("code",{children:" /bin/sh"})," por velocidade. O LFS exige bash em ambos os caminhos (",s.jsx("code",{children:"/bin/sh"})," e ",s.jsx("code",{children:"/bin/bash"}),") porque muitos scripts ",s.jsx("code",{children:"configure"})," dependem de bashismos sutis (arrays associativos, ",s.jsx("code",{children:"[[ ]]"}),", etc.)."]}),s.jsx("h2",{children:"Build"}),s.jsx(o,{language:"bash",code:`cd $LFS/sources
tar -xf bash-5.3.tar.gz
cd bash-5.3

./configure --prefix=/usr                      \\
            --build=$(sh support/config.guess) \\
            --host=$LFS_TGT                    \\
            --without-bash-malloc

make
make DESTDIR=$LFS install

# Symlink padrão sh -> bash (POSIX)
ln -sv bash $LFS/bin/sh

cd $LFS/sources
rm -rf bash-5.3`}),s.jsx("h2",{children:"Anatomia das flags"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("code",{children:"--without-bash-malloc"})," — desabilita o alocador interno do bash. O alocador do bash é antigo e tem bugs de alinhamento em x86_64; usar o malloc da Glibc é mais seguro e rápido."]}),s.jsxs("li",{children:[s.jsx("code",{children:"--host=$LFS_TGT"})," — cross-compilação: o binário roda na tripla LFS, não no host."]}),s.jsxs("li",{children:[s.jsx("code",{children:"ln -sv bash sh"})," — POSIX exige ",s.jsx("code",{children:"/bin/sh"}),". Sem o symlink, scripts ",s.jsx("code",{children:"#!/bin/sh"})," falham no chroot."]})]}),s.jsx("h2",{children:"Casos práticos"}),s.jsx(o,{language:"bash",code:`# Confirmar arquitetura cross:
file $LFS/usr/bin/bash
# ELF 64-bit LSB executable, x86-64 ... dynamically linked,
# interpreter /lib64/ld-linux-x86-64.so.2

# Listar símbolos não-resolvidos (devem todos vir da Glibc temporária):
$LFS_TGT-readelf -d $LFS/usr/bin/bash | grep NEEDED

# Verificar versão dentro do chroot (depois):
bash --version
echo $BASH_VERSION`}),s.jsx(r,{title:"Garantir o /bin/sh apontando para bash",children:s.jsxs("ol",{className:"list-decimal ml-5 space-y-1",children:[s.jsxs("li",{children:["Rode ",s.jsx("code",{children:"ls -la $LFS/bin/sh"})," — deve ser symlink ",s.jsx("code",{children:"sh -> bash"}),"."]}),s.jsxs("li",{children:["Se faltar, recrie: ",s.jsx("code",{children:"ln -sfv bash $LFS/bin/sh"}),"."]}),s.jsxs("li",{children:["Teste com um script POSIX simples: ",s.jsxs("code",{children:["echo '#!/bin/sh",`
`,"echo ok' > /tmp/t.sh && chmod +x /tmp/t.sh && chroot $LFS /tmp/t.sh"]})," (depois do chroot estar preparado)."]})]})}),s.jsx("h2",{children:"Armadilhas comuns"}),s.jsxs(e,{type:"warning",title:"Esquecer o symlink sh",children:["Sem ",s.jsx("code",{children:"/bin/sh"}),", o primeiro ",s.jsx("code",{children:"./configure"}),"no chroot trava com ",s.jsx("code",{children:"/bin/sh: No such file or directory"}),". É o erro mais comum — sempre cheque depois do install."]}),s.jsxs(e,{type:"danger",title:"Misturar bash do host com Glibc do alvo",children:["Se você acidentalmente rodar ",s.jsx("code",{children:"/usr/bin/bash"})," do host dentro do chroot (via PATH errado), ele vai linkar contra a Glibc temporária e segfaultar imediatamente. Sintoma:",s.jsx("code",{children:" Segmentation fault (core dumped) "})," no segundo comando depois do ",s.jsx("code",{children:"chroot"}),"."]}),s.jsxs(e,{type:"success",title:"Histórico desabilitado no chroot",children:["Por padrão o bash do chroot não tem ",s.jsx("code",{children:"~/.bash_history"}),"persistente. Para depurar, exporte",s.jsx("code",{children:" HISTFILE=/tmp/lfs-history "})," antes de cada sessão."]}),s.jsx("h2",{children:"Cheat sheet"}),s.jsx(o,{language:"bash",code:`# Tempo: ~0.5 SBU (~30s)
# Tarball: bash-5.3.tar.gz (~11 MB)
# Pós-instalação obrigatória: ln -sv bash $LFS/bin/sh
# Validação: $LFS/usr/bin/bash --version | head -1
#            file $LFS/usr/bin/bash | grep "ELF 64-bit"`})]})}export{l as default};

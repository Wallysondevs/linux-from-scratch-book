import{j as e}from"./index-Dq2pq_L0.js";import{P as r}from"./PageContainer-CRFAuOt2.js";import{C as s}from"./CodeBlock-DfTRrP6d.js";import{A as a}from"./AlertBox-DFdNRTyW.js";import{P as t}from"./PracticeBox-BXFoiNe5.js";function l(){return e.jsxs(r,{title:"Make, Patch e Tar — Trio essencial",subtitle:"Os três utilitários que tornam todo o LFS possível: orquestrar builds, aplicar correções e desempacotar fontes.",difficulty:"intermediario",timeToRead:"6 min",children:[e.jsx("h2",{children:"Por que esses três juntos?"}),e.jsxs("p",{children:["São pequenos, rápidos e completamente independentes — perfeitos para serem construídos em sequência. Sem qualquer um deles, nenhum outro pacote do LFS sequer começa a ser construído:",e.jsx("code",{children:" tar "})," extrai os fontes, ",e.jsx("code",{children:"patch"})," aplica correções pontuais e ",e.jsx("code",{children:"make"})," orquestra a compilação."]}),e.jsxs(a,{type:"info",title:"GNU make vs BSD make",children:["Os ",e.jsx("code",{children:"Makefile"}),"s do GNU usam extensões (",e.jsx("code",{children:"$(shell)"}),",",e.jsx("code",{children:" ifeq"}),", padrões com ",e.jsx("code",{children:"%"}),") que o",e.jsx("code",{children:" bmake "})," do BSD não entende. LFS exige",e.jsx("code",{children:" GNU make"}),"."]}),e.jsx("h2",{children:"Make"}),e.jsx(s,{language:"bash",code:`cd $LFS/sources
tar -xf make-4.4.1.tar.gz
cd make-4.4.1

./configure --prefix=/usr   \\
            --without-guile \\
            --host=$LFS_TGT \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd $LFS/sources
rm -rf make-4.4.1`}),e.jsx("ul",{children:e.jsxs("li",{children:[e.jsx("code",{children:"--without-guile"})," — desabilita extensões em Guile (Scheme). LFS não usa, e Guile não está disponível ainda."]})}),e.jsx("h2",{children:"Patch"}),e.jsx(s,{language:"bash",code:`cd $LFS/sources
tar -xf patch-2.8.tar.xz
cd patch-2.8

./configure --prefix=/usr   \\
            --host=$LFS_TGT \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd $LFS/sources
rm -rf patch-2.8`}),e.jsx("h2",{children:"Tar"}),e.jsx(s,{language:"bash",code:`cd $LFS/sources
tar -xf tar-1.35.tar.xz
cd tar-1.35

./configure --prefix=/usr                     \\
            --host=$LFS_TGT                   \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd $LFS/sources
rm -rf tar-1.35`}),e.jsx("h2",{children:"Casos práticos"}),e.jsx(s,{language:"bash",code:`# Verificar versões cruzadas:
$LFS/usr/bin/make --version | head -1
$LFS/usr/bin/patch --version | head -1
$LFS/usr/bin/tar --version | head -1

# Smoke test do tar:
echo "ola" > /tmp/lfs.txt
$LFS/usr/bin/tar -czf /tmp/lfs.tar.gz -C /tmp lfs.txt
$LFS/usr/bin/tar -tzf /tmp/lfs.tar.gz   # → lfs.txt

# Smoke test do patch:
cat > /tmp/a <<EOF
linha 1
linha 2
EOF
cp /tmp/a /tmp/b && sed -i 's/linha 2/LINHA 2/' /tmp/b
diff -u /tmp/a /tmp/b > /tmp/p.diff
$LFS/usr/bin/patch /tmp/a < /tmp/p.diff
cat /tmp/a   # → linha 1 / LINHA 2`}),e.jsx(t,{title:"Validar o trio antes de prosseguir",children:e.jsxs("ol",{className:"list-decimal ml-5 space-y-1",children:[e.jsx("li",{children:"Os três binários devem ser ELF 64-bit linkados à Glibc temporária."}),e.jsxs("li",{children:[e.jsx("code",{children:"make -j$(nproc) --version"})," roda sem erros."]}),e.jsxs("li",{children:[e.jsx("code",{children:"tar --help | head"})," mostra opções ",e.jsx("code",{children:"-c -x -t -z -j -J --xz"}),"."]})]})}),e.jsx("h2",{children:"Armadilhas comuns"}),e.jsxs(a,{type:"warning",title:"Tar sem suporte a XZ/Zstd",children:["Se a libxz não estava presente no host quando você compilou o tar, ele não consegue extrair ",e.jsx("code",{children:".tar.xz"})," nem",e.jsx("code",{children:" .tar.zst"}),". Sintoma:",e.jsx("code",{children:" tar: Cannot use compressed or remote archives "}),"no próximo pacote. Solução: instale ",e.jsx("code",{children:"xz-utils"})," no host antes do build."]}),e.jsx(a,{type:"danger",title:'"Hunk #1 FAILED at 23"',children:"Patches do BLFS frequentemente falham se você baixou o tarball de uma versão diferente. Sempre confira o checksum SHA256 dos sources contra o livro antes de aplicar patches."}),e.jsx("h2",{children:"Cheat sheet"}),e.jsx(s,{language:"bash",code:`# Tempo total dos três: ~0.7 SBU
# Tarballs: make-4.4.1.tar.gz, patch-2.8.tar.xz, tar-1.35.tar.xz
# Validação: make/patch/tar --version, todos linkados a Glibc temp
# Próximo passo: Xz e Binutils Pass 2`})]})}export{l as default};

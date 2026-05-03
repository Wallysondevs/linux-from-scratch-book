import{j as e}from"./index-Dq2pq_L0.js";import{P as r}from"./PageContainer-CRFAuOt2.js";import{C as i}from"./CodeBlock-DfTRrP6d.js";import{A as o}from"./AlertBox-DFdNRTyW.js";function n(){return e.jsxs(r,{title:"Configurando Xorg",subtitle:"Visão geral de como instalar o servidor gráfico X.org no LFS via BLFS.",difficulty:"avancado",timeToRead:"6 min",children:[e.jsx("h2",{children:"Pré-requisitos enormes"}),e.jsx("p",{children:"Xorg precisa de muitas bibliotecas: libpng, libjpeg, freetype, fontconfig, pixman, mesa, libdrm, libxcb, dezenas de protocolos XML/XCB, e outros. Cada um é um capítulo no BLFS."}),e.jsxs("h2",{children:["Definindo a variável ",e.jsx("code",{children:"$XORG_PREFIX"})]}),e.jsx(i,{language:"bash",code:`export XORG_PREFIX=/usr
export XORG_CONFIG="--prefix=$XORG_PREFIX --sysconfdir=/etc \\
                    --localstatedir=/var --disable-static"

# torne persistente:
cat > /etc/profile.d/xorg.sh << "EOF"
export XORG_PREFIX=/usr
export XORG_CONFIG="--prefix=$XORG_PREFIX --sysconfdir=/etc --localstatedir=/var --disable-static"
EOF`}),e.jsx("h2",{children:"Sequência geral (BLFS)"}),e.jsxs("ol",{children:[e.jsx("li",{children:"util-macros, xorgproto"}),e.jsx("li",{children:"libXau, libXdmcp"}),e.jsx("li",{children:"xcb-proto, libxcb"}),e.jsx("li",{children:"libX11, libXext, libXrender"}),e.jsx("li",{children:"mesa (com llvm), libdrm"}),e.jsx("li",{children:"xkeyboard-config"}),e.jsx("li",{children:"xorg-server"}),e.jsx("li",{children:"xinit, drivers (xf86-input-libinput, xf86-video-*)"})]}),e.jsx(i,{language:"bash",code:`# Exemplo de wrapper para configurar pacotes Xorg:
./configure $XORG_CONFIG
make
make install`}),e.jsx("h2",{children:"Testando"}),e.jsx(i,{language:"bash",code:`# Após instalar tudo, instale um WM mínimo (twm/icewm):
echo "exec icewm" > ~/.xinitrc
startx`}),e.jsxs(o,{type:"warning",title:"Esta página é só um mapa",children:["Xorg sozinho são ~50 pacotes do BLFS. Use o livro oficial em"," ",e.jsx("a",{href:"https://www.linuxfromscratch.org/blfs/view/stable/x/installing.html",target:"_blank",rel:"noopener noreferrer",children:"BLFS Installing X"})," ","para a sequência detalhada e dependências."]})]})}export{n as default};

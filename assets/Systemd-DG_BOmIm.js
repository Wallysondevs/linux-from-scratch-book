import{j as s}from"./index-ZrM6Gh7j.js";import{P as t}from"./PageContainer-jOSfeH0u.js";import{C as e}from"./CodeBlock-cFXLaLiU.js";import{A as i}from"./AlertBox-D3Y0IUPD.js";function d(){return s.jsxs(t,{title:"Systemd (ou SysV-Init)",subtitle:"Sistema de init. Escolha um dos dois — não use os dois ao mesmo tempo.",difficulty:"avancado",timeToRead:"8 min",children:[s.jsxs(i,{type:"warning",title:"Decisão importante",children:["Você está construindo a edição ",s.jsx("strong",{children:"LFS-systemd"})," ou"," ",s.jsx("strong",{children:"LFS-SysV"}),"? A escolha foi feita lá no início (capítulo"," ",s.jsx("a",{href:"#/versao-lfs",children:"Versão LFS"}),"). Cada caminho usa um sistema de init diferente."]}),s.jsx("h2",{children:"Caminho A — Systemd (recomendado para uso moderno)"}),s.jsx(e,{language:"bash",code:`cd /sources
tar -xf systemd-257.8.tar.gz && cd systemd-257.8

sed -i -e 's/GROUP="render"/GROUP="video"/' \\
       -e 's/GROUP="sgx", //' rules.d/50-udev-default.rules.in

mkdir -p build && cd build

meson setup ..                              \\
      --prefix=/usr                         \\
      --buildtype=release                   \\
      -D default-dnssec=no                  \\
      -D firstboot=false                    \\
      -D install-tests=false                \\
      -D ldconfig=false                     \\
      -D mode=release                       \\
      -D pamconfdir=no                      \\
      -D rpmmacrosdir=no                    \\
      -D sysusers=false                     \\
      -D man=disabled                       \\
      -D nss-systemd=true

ninja
ninja install

tar -xf ../../systemd-man-pages-6.15.tar.xz \\
  --no-same-owner --strip-components=1 \\
  -C /usr/share/man

systemd-machine-id-setup
systemctl preset-all

cd ../.. && rm -rf systemd-257.8`}),s.jsx("h2",{children:"Caminho B — SysV-Init (didático e minimalista)"}),s.jsx(e,{language:"bash",code:`cd /sources
tar -xf sysvinit-3.14.tar.xz && cd sysvinit-3.14
patch -Np1 -i ../sysvinit-3.14-consolidated-1.patch
make
make install
cd .. && rm -rf sysvinit-3.14`}),s.jsxs("p",{children:["Para a edição SysV, os bootscripts oficiais do LFS (",s.jsx("code",{children:"lfs-bootscripts"}),") entrarão no capítulo ",s.jsx("a",{href:"#/bootscripts",children:"Bootscripts"}),"."]}),s.jsx(i,{type:"info",title:"Resumindo",children:s.jsxs("ul",{className:"m-0",children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Systemd"})," — moderno, padrão das distros, usa unit files."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"SysVinit"})," — clássico, scripts shell em ",s.jsx("code",{children:"/etc/rc.d/"}),", fácil de inspecionar."]})]})})]})}export{d as default};

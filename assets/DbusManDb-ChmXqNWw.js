import{j as s}from"./index-CGptwfLb.js";import{P as r}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";function a(){return s.jsxs(r,{title:"D-Bus, Man-DB, Procps-ng",subtitle:"IPC para systemd, banco de páginas de manual e ferramentas de processos (ps, top, free).",difficulty:"intermediario",timeToRead:"5 min",children:[s.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),s.jsx("h2",{children:"Glossário rápido"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"D-Bus"})," "," — "," ","IPC bus."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Man-DB"})," "," — "," ","índice de man pages."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Build"})," "," — "," ","clássico."]})]}),s.jsx("h2",{children:"D-Bus"}),s.jsx(e,{language:"bash",code:`cd /sources
tar -xf dbus-1.14.10.tar.xz && cd dbus-1.14.10

./configure --prefix=/usr                     \\
            --sysconfdir=/etc                 \\
            --localstatedir=/var              \\
            --runstatedir=/run                \\
            --enable-user-session             \\
            --disable-static                  \\
            --disable-doxygen-docs            \\
            --disable-xml-docs                \\
            --docdir=/usr/share/doc/dbus-1.14.10 \\
            --with-system-socket=/run/dbus/system_bus_socket

make && make install

ln -sfv /etc/machine-id /var/lib/dbus
cd .. && rm -rf dbus-1.14.10`}),s.jsx("h2",{children:"Man-DB"}),s.jsx(e,{language:"bash",code:`tar -xf man-db-2.13.1.tar.xz && cd man-db-2.13.1

./configure --prefix=/usr                         \\
            --docdir=/usr/share/doc/man-db-2.13.1 \\
            --sysconfdir=/etc                     \\
            --disable-setuid                      \\
            --enable-cache-owner=bin              \\
            --with-browser=/usr/bin/lynx          \\
            --with-vgrind=/usr/bin/vgrind         \\
            --with-grap=/usr/bin/grap             \\
            --with-systemdtmpfilesdir=            \\
            --with-systemdsystemunitdir=

make && make install
cd .. && rm -rf man-db-2.13.1`}),s.jsx("h2",{children:"Procps-ng"}),s.jsx(e,{language:"bash",code:`tar -xf procps-ng-4.0.4.tar.xz && cd procps-ng-4.0.4

./configure --prefix=/usr                            \\
            --docdir=/usr/share/doc/procps-ng-4.0.4 \\
            --disable-static                         \\
            --disable-kill

make && make install
cd .. && rm -rf procps-ng-4.0.4`})]})}export{a as default};

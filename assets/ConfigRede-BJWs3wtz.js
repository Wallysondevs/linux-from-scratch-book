import{j as e}from"./index-CGptwfLb.js";import{P as t}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";function a(){return e.jsxs(t,{title:"Configuração de Rede",subtitle:"Configurando hostname, /etc/hosts e a interface de rede para systemd ou SysV.",difficulty:"intermediario",timeToRead:"6 min",children:[e.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Static IP"})," "," — "," ","ifconfig/ip."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"DHCP"})," "," — "," ","dhcpcd."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"/etc/resolv.conf"})," "," — "," ","DNS."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"hostname"})," "," — "," ","/etc/hostname."]})]}),e.jsx("h2",{children:"Hostname"}),e.jsx(s,{language:"bash",code:`echo "lfs" > /etc/hostname
# ou: hostnamectl set-hostname lfs (em sistema com systemd em runtime)`}),e.jsx("h2",{children:"/etc/hosts"}),e.jsx(s,{language:"bash",code:`cat > /etc/hosts << "EOF"
127.0.0.1  localhost.localdomain localhost lfs
::1        localhost ip6-localhost ip6-loopback
ff02::1    ip6-allnodes
ff02::2    ip6-allrouters
EOF`}),e.jsx("h2",{children:"Caminho A — Systemd-networkd"}),e.jsx(s,{language:"bash",code:`# DHCP em todas as interfaces ethernet:
cat > /etc/systemd/network/10-eth-dhcp.network << "EOF"
[Match]
Name=en*

[Network]
DHCP=yes
EOF

systemctl enable systemd-networkd
systemctl enable systemd-resolved
ln -sfv /run/systemd/resolve/stub-resolv.conf /etc/resolv.conf`}),e.jsx("h2",{children:"Caminho B — SysVinit (lfs-bootscripts)"}),e.jsx(s,{language:"bash",code:`cd /sources
tar -xf blfs-bootscripts-20240825.tar.xz && cd blfs-bootscripts-20240825
make install-service-ipv4-static
cd .. && rm -rf blfs-bootscripts-20240825

cat > /etc/sysconfig/ifconfig.eth0 << "EOF"
ONBOOT=yes
IFACE=eth0
SERVICE=ipv4-static
IP=192.168.1.50
GATEWAY=192.168.1.1
PREFIX=24
BROADCAST=192.168.1.255
EOF

cat > /etc/resolv.conf << "EOF"
domain lfs.local
nameserver 1.1.1.1
nameserver 8.8.8.8
EOF`}),e.jsxs("p",{children:["Adapte os IPs ao seu ambiente. Se for VM, ajuste o adaptador para"," ",e.jsx("em",{children:"bridged"})," ou ",e.jsx("em",{children:"NAT"})," conforme a topologia."]})]})}export{a as default};

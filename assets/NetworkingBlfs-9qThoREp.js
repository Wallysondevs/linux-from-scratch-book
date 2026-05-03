import{j as e}from"./index-CGptwfLb.js";import{P as i}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";function n(){return e.jsxs(i,{title:"Rede Avançada (BLFS)",subtitle:"Wi-Fi, OpenSSH, NetworkManager, firewall — o que adicionar para sair do 'cabo + IP estático'.",difficulty:"intermediario",timeToRead:"5 min",children:[e.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Networking"})," "," — "," ","BLFS aborda."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"NetworkManager"})," "," — "," ","dynamic."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"systemd-networkd"})," "," — "," ","alt."]})]}),e.jsx("h2",{children:"Wi-Fi"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"wpa_supplicant"})," — autenticação WPA2/WPA3."]}),e.jsxs("li",{children:[e.jsx("code",{children:"iw"})," + ",e.jsx("code",{children:"iwd"})," — substituto moderno do wpa_supplicant em algumas distros."]}),e.jsxs("li",{children:["Drivers: kernel-tree (firmware vem em ",e.jsx("code",{children:"/lib/firmware"}),")."]})]}),e.jsx("h2",{children:"OpenSSH"}),e.jsx(s,{language:"bash",code:`tar -xf openssh-9.8p1.tar.gz && cd openssh-9.8p1

install -v -m700 -d /var/lib/sshd
chown -v root:sys /var/lib/sshd
groupadd -g 50 sshd
useradd -c 'sshd PrivSep' -d /var/lib/sshd -g sshd \\
        -s /bin/false -u 50 sshd

./configure --prefix=/usr                            \\
            --sysconfdir=/etc/ssh                    \\
            --with-pam                               \\
            --with-privsep-path=/var/lib/sshd

make && make install
install -v -m755    contrib/ssh-copy-id /usr/bin
install -v -m644    contrib/ssh-copy-id.1 /usr/share/man/man1`}),e.jsx("h2",{children:"NetworkManager (substitui networkd)"}),e.jsx("p",{children:"Para laptops e ambientes desktop, NetworkManager é mais conveniente que systemd-networkd. Tem GUIs (nm-applet, plasma-nm, gnome-control-center)."}),e.jsx("h2",{children:"Firewall — nftables"}),e.jsx(s,{language:"bash",code:`tar -xf nftables-1.1.0.tar.xz && cd nftables-1.1.0
./configure --prefix=/usr --sysconfdir=/etc --disable-static
make && make install`}),e.jsxs("p",{children:["Regras básicas em ",e.jsx("code",{children:"/etc/nftables.conf"}),":"]}),e.jsx(s,{language:"bash",code:`#!/usr/sbin/nft -f
flush ruleset

table inet filter {
  chain input {
    type filter hook input priority 0; policy drop;
    ct state established,related accept
    iif lo accept
    ip protocol icmp accept
    tcp dport ssh accept
  }
  chain forward {
    type filter hook forward priority 0; policy drop;
  }
  chain output {
    type filter hook output priority 0; policy accept;
  }
}`})]})}export{n as default};

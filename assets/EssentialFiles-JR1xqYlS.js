import{j as s}from"./index-CGptwfLb.js";import{P as o}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";function a(){return s.jsxs(o,{title:"Arquivos & Symlinks Essenciais",subtitle:"/etc/passwd, /etc/group, mtab, logs vazios — o esqueleto que o sistema precisa.",difficulty:"intermediario",timeToRead:"5 min",children:[s.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),s.jsx("h2",{children:"Glossário rápido"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"/etc/passwd"})," "," — "," ","users."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"/etc/group"})," "," — "," ","grupos."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"/etc/hosts"})," "," — "," ","localhost."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Files"})," "," — "," ","crie manualmente."]})]}),s.jsx("h2",{children:"Symlinks tradicionais"}),s.jsx(e,{language:"bash",code:"ln -sv /proc/self/mounts /etc/mtab"}),s.jsx("h2",{children:"/etc/hosts"}),s.jsx(e,{language:"bash",code:`cat > /etc/hosts << EOF
127.0.0.1  localhost $(hostname)
::1        localhost
EOF`}),s.jsx("h2",{children:"/etc/passwd inicial"}),s.jsx(e,{language:"bash",code:`cat > /etc/passwd << "EOF"
root:x:0:0:root:/root:/bin/bash
bin:x:1:1:bin:/dev/null:/usr/bin/false
daemon:x:6:6:Daemon User:/dev/null:/usr/bin/false
messagebus:x:18:18:D-Bus Message Daemon User:/run/dbus:/usr/bin/false
uuidd:x:80:80:UUID Generation Daemon User:/dev/null:/usr/bin/false
nobody:x:65534:65534:Unprivileged User:/dev/null:/usr/bin/false
EOF`}),s.jsx("h2",{children:"/etc/group inicial"}),s.jsx(e,{language:"bash",code:`cat > /etc/group << "EOF"
root:x:0:
bin:x:1:daemon
sys:x:2:
kmem:x:3:
tape:x:4:
tty:x:5:
daemon:x:6:
floppy:x:7:
disk:x:8:
lp:x:9:
dialout:x:10:
audio:x:11:
video:x:12:
utmp:x:13:
cdrom:x:15:
adm:x:16:
messagebus:x:18:
input:x:24:
mail:x:34:
kvm:x:61:
uuidd:x:80:
wheel:x:97:
users:x:999:
nogroup:x:65534:
EOF`}),s.jsxs("h2",{children:["Usuário ",s.jsx("code",{children:"tester"})," para test suites"]}),s.jsx(e,{language:"bash",code:`echo "tester:x:101:101::/home/tester:/bin/bash" >> /etc/passwd
echo "tester:x:101:" >> /etc/group
install -o tester -d /home/tester`}),s.jsx("h2",{children:"Inicializando logs"}),s.jsx(e,{language:"bash",code:`touch /var/log/{btmp,lastlog,faillog,wtmp}
chgrp -v utmp /var/log/lastlog
chmod -v 664  /var/log/lastlog
chmod -v 600  /var/log/btmp`}),s.jsx("h2",{children:"Ativando o novo /etc/passwd no shell atual"}),s.jsx(e,{language:"bash",code:"exec /usr/bin/bash --login"})]})}export{a as default};

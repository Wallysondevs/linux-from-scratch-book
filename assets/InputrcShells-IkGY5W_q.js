import{j as e}from"./index-Dq2pq_L0.js";import{P as s}from"./PageContainer-CRFAuOt2.js";import{C as n}from"./CodeBlock-DfTRrP6d.js";function l(){return e.jsxs(s,{title:"/etc/inputrc & /etc/shells",subtitle:"Configurações do readline (setas/home/end no terminal) e lista de shells válidos.",difficulty:"iniciante",timeToRead:"3 min",children:[e.jsx("h2",{children:"/etc/inputrc"}),e.jsx(n,{language:"bash",code:`cat > /etc/inputrc << "EOF"
# /etc/inputrc - global readline config

set horizontal-scroll-mode Off
set meta-flag On
set input-meta On
set convert-meta Off
set output-meta On
set bell-style none

"\\eOd": backward-word
"\\eOc": forward-word

# setas/home/end/pgup/pgdown
"\\e[1~": beginning-of-line
"\\e[4~": end-of-line
"\\e[5~": beginning-of-history
"\\e[6~": end-of-history
"\\e[3~": delete-char
"\\e[2~": quoted-insert

"\\eOH": beginning-of-line
"\\eOF": end-of-line
"\\e[H": beginning-of-line
"\\e[F": end-of-line
EOF`}),e.jsx("h2",{children:"/etc/shells"}),e.jsx(n,{language:"bash",code:`cat > /etc/shells << "EOF"
/bin/sh
/bin/bash
/usr/bin/sh
/usr/bin/bash
EOF`}),e.jsxs("p",{className:"text-sm text-muted-foreground mt-4",children:["Programas como ",e.jsx("code",{children:"chsh"}),", ",e.jsx("code",{children:"useradd"})," e alguns servidores FTP validam o shell do usuário contra ",e.jsx("code",{children:"/etc/shells"}),"."]})]})}export{l as default};

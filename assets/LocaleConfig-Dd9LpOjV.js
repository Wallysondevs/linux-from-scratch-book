import{j as e}from"./index-K1a8hxkV.js";import{P as o}from"./PageContainer-BFvVnrCN.js";import{C as a}from"./CodeBlock-DvB8XoAE.js";function i(){return e.jsxs(o,{title:"Configurando Locale",subtitle:"Defina pt_BR.UTF-8 como locale padrão para mensagens, datas e formatação.",difficulty:"iniciante",timeToRead:"3 min",children:[e.jsx("h2",{children:"/etc/locale.conf (Systemd)"}),e.jsx(a,{language:"bash",code:`cat > /etc/locale.conf << "EOF"
LANG=pt_BR.UTF-8
LC_ALL=pt_BR.UTF-8
EOF

# para gerar o locale (caso ainda não esteja):
localedef -i pt_BR -f UTF-8 pt_BR.UTF-8`}),e.jsx("h2",{children:"/etc/profile (SysV)"}),e.jsx(a,{language:"bash",code:`cat > /etc/profile << "EOF"
export LANG=pt_BR.UTF-8
export LC_ALL=pt_BR.UTF-8
export LANGUAGE=pt_BR:en
EOF`}),e.jsx("h2",{children:"Verificando depois do reboot"}),e.jsx(a,{language:"bash",code:`locale
# LANG=pt_BR.UTF-8
# LC_ALL=pt_BR.UTF-8
# ...

date
# qua 23 abr 2025 10:35:42 -03`})]})}export{i as default};

import{j as e}from"./index-CGptwfLb.js";import{P as a}from"./PageContainer-DhWxB77g.js";import{C as o}from"./CodeBlock-DiEVa7fR.js";function i(){return e.jsxs(a,{title:"Configurando Locale",subtitle:"Defina pt_BR.UTF-8 como locale padrão para mensagens, datas e formatação.",difficulty:"iniciante",timeToRead:"3 min",children:[e.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"locale-gen"})," "," — "," ","gera locales."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"/etc/locale.conf"})," "," — "," ","default."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"LANG"})," "," — "," ","variável."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"UTF-8"})," "," — "," ","use."]})]}),e.jsx("h2",{children:"/etc/locale.conf (Systemd)"}),e.jsx(o,{language:"bash",code:`cat > /etc/locale.conf << "EOF"
LANG=pt_BR.UTF-8
LC_ALL=pt_BR.UTF-8
EOF

# para gerar o locale (caso ainda não esteja):
localedef -i pt_BR -f UTF-8 pt_BR.UTF-8`}),e.jsx("h2",{children:"/etc/profile (SysV)"}),e.jsx(o,{language:"bash",code:`cat > /etc/profile << "EOF"
export LANG=pt_BR.UTF-8
export LC_ALL=pt_BR.UTF-8
export LANGUAGE=pt_BR:en
EOF`}),e.jsx("h2",{children:"Verificando depois do reboot"}),e.jsx(o,{language:"bash",code:`locale
# LANG=pt_BR.UTF-8
# LC_ALL=pt_BR.UTF-8
# ...

date
# qua 23 abr 2025 10:35:42 -03`})]})}export{i as default};

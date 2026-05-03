import{j as o}from"./index-ZrM6Gh7j.js";import{P as a}from"./PageContainer-jOSfeH0u.js";import{C as e}from"./CodeBlock-cFXLaLiU.js";import{A as r}from"./AlertBox-D3Y0IUPD.js";function l(){return o.jsxs(a,{title:"Configurando o Relógio",subtitle:"UTC ou horário local? E como o LFS sincroniza com o relógio do hardware.",difficulty:"iniciante",timeToRead:"3 min",children:[o.jsx("h2",{children:"UTC (recomendado)"}),o.jsxs("p",{children:["Sistemas Linux modernos usam o relógio de hardware em UTC. Programas convertem para o fuso local conforme ",o.jsx("code",{children:"/etc/localtime"}),"."]}),o.jsx(e,{language:"bash",code:`# /etc/sysconfig/clock (SysV)
cat > /etc/sysconfig/clock << "EOF"
UTC=1
CLOCKPARAMS=
EOF

# Systemd (alternativa via ferramenta):
# timedatectl set-local-rtc 0  (UTC)
# timedatectl set-timezone America/Sao_Paulo`}),o.jsx("h2",{children:"Horário local (apenas dual-boot Windows)"}),o.jsx("p",{children:"Se você dual-boot com Windows e não quer mexer nele:"}),o.jsx(e,{language:"bash",code:`# /etc/sysconfig/clock
UTC=0`}),o.jsx(r,{type:"warning",title:"Não misture os dois",children:"Se um SO escreve o RTC em local e outro lê como UTC, o relógio dança entre boots. Padronize."})]})}export{l as default};

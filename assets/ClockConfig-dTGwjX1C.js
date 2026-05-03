import{j as o}from"./index-Dq2pq_L0.js";import{P as a}from"./PageContainer-CRFAuOt2.js";import{C as e}from"./CodeBlock-DfTRrP6d.js";import{A as r}from"./AlertBox-DFdNRTyW.js";function l(){return o.jsxs(a,{title:"Configurando o Relógio",subtitle:"UTC ou horário local? E como o LFS sincroniza com o relógio do hardware.",difficulty:"iniciante",timeToRead:"3 min",children:[o.jsx("h2",{children:"UTC (recomendado)"}),o.jsxs("p",{children:["Sistemas Linux modernos usam o relógio de hardware em UTC. Programas convertem para o fuso local conforme ",o.jsx("code",{children:"/etc/localtime"}),"."]}),o.jsx(e,{language:"bash",code:`# /etc/sysconfig/clock (SysV)
cat > /etc/sysconfig/clock << "EOF"
UTC=1
CLOCKPARAMS=
EOF

# Systemd (alternativa via ferramenta):
# timedatectl set-local-rtc 0  (UTC)
# timedatectl set-timezone America/Sao_Paulo`}),o.jsx("h2",{children:"Horário local (apenas dual-boot Windows)"}),o.jsx("p",{children:"Se você dual-boot com Windows e não quer mexer nele:"}),o.jsx(e,{language:"bash",code:`# /etc/sysconfig/clock
UTC=0`}),o.jsx(r,{type:"warning",title:"Não misture os dois",children:"Se um SO escreve o RTC em local e outro lê como UTC, o relógio dança entre boots. Padronize."})]})}export{l as default};

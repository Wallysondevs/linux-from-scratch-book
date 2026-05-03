import{j as o}from"./index-CGptwfLb.js";import{P as r}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";import{A as i}from"./AlertBox-DblzR--W.js";function t(){return o.jsxs(r,{title:"Configurando o Relógio",subtitle:"UTC ou horário local? E como o LFS sincroniza com o relógio do hardware.",difficulty:"iniciante",timeToRead:"3 min",children:[o.jsx(i,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),o.jsx("h2",{children:"Glossário rápido"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"Hardware clock"})," "," — "," ","UTC ou local."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"hwclock"})," "," — "," ","sync."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"/etc/adjtime"})," "," — "," ","config."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"NTP"})," "," — "," ","depois."]})]}),o.jsx("h2",{children:"UTC (recomendado)"}),o.jsxs("p",{children:["Sistemas Linux modernos usam o relógio de hardware em UTC. Programas convertem para o fuso local conforme ",o.jsx("code",{children:"/etc/localtime"}),"."]}),o.jsx(e,{language:"bash",code:`# /etc/sysconfig/clock (SysV)
cat > /etc/sysconfig/clock << "EOF"
UTC=1
CLOCKPARAMS=
EOF

# Systemd (alternativa via ferramenta):
# timedatectl set-local-rtc 0  (UTC)
# timedatectl set-timezone America/Sao_Paulo`}),o.jsx("h2",{children:"Horário local (apenas dual-boot Windows)"}),o.jsx("p",{children:"Se você dual-boot com Windows e não quer mexer nele:"}),o.jsx(e,{language:"bash",code:`# /etc/sysconfig/clock
UTC=0`}),o.jsx(i,{type:"warning",title:"Não misture os dois",children:"Se um SO escreve o RTC em local e outro lê como UTC, o relógio dança entre boots. Padronize."})]})}export{t as default};

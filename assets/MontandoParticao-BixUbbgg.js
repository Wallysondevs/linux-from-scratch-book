import{j as o}from"./index-Dq2pq_L0.js";import{P as a}from"./PageContainer-CRFAuOt2.js";import{C as e}from"./CodeBlock-DfTRrP6d.js";import{A as s}from"./AlertBox-DFdNRTyW.js";function i(){return o.jsxs(a,{title:"Montando a Partição do LFS",subtitle:"Crie /mnt/lfs e monte o sistema de arquivos para começar a trabalhar.",difficulty:"iniciante",timeToRead:"3 min",children:[o.jsx("h2",{children:"Criando o ponto de montagem"}),o.jsx(e,{language:"bash",code:`export LFS=/mnt/lfs
sudo mkdir -pv $LFS`}),o.jsx("h2",{children:"Montando"}),o.jsx(e,{language:"bash",code:`sudo mount -v -t ext4 /dev/sdb1 $LFS

# confirme:
mount | grep $LFS
df -h $LFS`}),o.jsxs("h2",{children:["Permitindo escrita ao usuário ",o.jsx("code",{children:"lfs"})," (depois)"]}),o.jsxs("p",{children:["Em capítulos seguintes você vai criar um usuário ",o.jsx("code",{children:"lfs"}),". Para ele poder escrever em ",o.jsx("code",{children:"$LFS"}),", vamos configurar a posse mais adiante. Por enquanto, fica como root."]}),o.jsxs(s,{type:"warning",title:"Cuidado ao desligar / reiniciar o host",children:["Antes de desligar o host (ou de mudar de sessão), ",o.jsx("strong",{children:"desmonte"})," ","a partição com ",o.jsx("code",{children:"sudo umount $LFS"}),". Se você esquecer e voltar depois, basta remontar — mas certifique-se de não estar usando arquivos nela."]}),o.jsx("h2",{children:"Para remontar em sessões futuras"}),o.jsx(e,{language:"bash",code:`export LFS=/mnt/lfs
sudo mount /dev/sdb1 $LFS

# se montou swap antes:
sudo swapon /dev/sdb2`}),o.jsxs("h2",{children:["Sugestão: linha no ",o.jsx("code",{children:"/etc/fstab"})," do host"]}),o.jsxs("p",{children:["Para automatizar a remontagem, adicione (com cuidado!) uma linha ao"," ",o.jsx("code",{children:"/etc/fstab"})," do host. Use ",o.jsx("code",{children:"noauto"})," para evitar montagem automática no boot:"]}),o.jsx(e,{language:"text",code:`# /etc/fstab do HOST (não do LFS!)
LABEL=LFS  /mnt/lfs  ext4  defaults,noauto  0  0`}),o.jsxs("p",{children:["Agora basta ",o.jsx("code",{children:"sudo mount /mnt/lfs"})," em qualquer terminal do host."]})]})}export{i as default};

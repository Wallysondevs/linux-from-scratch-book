import{j as e}from"./index-CGptwfLb.js";import{P as r}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";import{A as o}from"./AlertBox-DblzR--W.js";function n(){return e.jsxs(r,{title:"Particionamento",subtitle:"Crie uma partição dedicada (ou disco virtual) para o LFS. Cuidado redobrado aqui.",difficulty:"intermediario",timeToRead:"8 min",children:[e.jsx(o,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Partição"})," "," — "," ","/, /home, swap."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"parted"})," "," — "," ","GPT."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"mkfs.ext4"})," "," — "," ","format."]})]}),e.jsxs(o,{type:"danger",title:"LEIA antes de digitar",children:["Particionar o disco errado APAGA TUDO. Antes de cada comando, confira"," ",e.jsx("code",{children:"lsblk"})," ou ",e.jsx("code",{children:"fdisk -l"})," e tenha certeza absoluta do nome do dispositivo. Se possível, desconecte fisicamente outros HDs/SSDs."]}),e.jsx("h2",{children:"Identificando o disco"}),e.jsx(s,{language:"bash",code:`lsblk
# saida tipica:
# NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
# sda      8:0    0   500G  0 disk
# ├─sda1   8:1    0     1G  0 part /boot/efi
# └─sda2   8:2    0   499G  0 part /
# sdb      8:16   0    60G  0 disk    <-- vamos usar esse para LFS`}),e.jsx("h2",{children:"Tamanhos sugeridos"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"LFS root (/)"})," — 30 GB no mínimo (é onde tudo vai morar)"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"swap"})," — 2 a 4 GB se sua RAM for < 8 GB; opcional acima disso"]})]}),e.jsxs("h2",{children:["Particionando com ",e.jsx("code",{children:"parted"})]}),e.jsxs("p",{children:["Exemplo usando ",e.jsx("code",{children:"/dev/sdb"})," (substitua pelo seu disco):"]}),e.jsx(s,{language:"bash",code:`sudo parted /dev/sdb

# dentro do parted:
(parted) mklabel gpt
(parted) mkpart primary ext4 1MiB 100%
(parted) set 1 boot on
(parted) print
(parted) quit`}),e.jsx("h2",{children:"Formatando como ext4"}),e.jsx(s,{language:"bash",code:`sudo mkfs.ext4 -L LFS /dev/sdb1

# (opcional) criar swap em outra partição
# sudo mkswap /dev/sdbN
# sudo swapon /dev/sdbN`}),e.jsxs("h2",{children:["Definindo a variável ",e.jsx("code",{children:"$LFS"})]}),e.jsxs("p",{children:["O ponto de montagem padrão é ",e.jsx("code",{children:"/mnt/lfs"}),". Vamos usar uma variável para evitar erros:"]}),e.jsx(s,{language:"bash",code:`export LFS=/mnt/lfs
echo "export LFS=/mnt/lfs" | sudo tee -a /root/.bashrc /etc/profile.d/lfs.sh`}),e.jsx("h2",{children:"Esquema alternativo: VirtualBox"}),e.jsxs("p",{children:["Se estiver em VM, crie um disco virtual ",e.jsx("strong",{children:"extra"})," de 60 GB anexado à VM como disco secundário (SATA Port 1 / VirtIO segundo). Ele vai aparecer como ",e.jsx("code",{children:"/dev/sdb"})," dentro do guest. Use os mesmos comandos acima."]}),e.jsxs(o,{type:"info",title:"Próximo passo",children:["Depois de formatar, vá para"," ",e.jsx("a",{href:"#/montando-particao",children:"Montando a Partição"})," para preparar"," ",e.jsx("code",{children:"/mnt/lfs"}),"."]})]})}export{n as default};

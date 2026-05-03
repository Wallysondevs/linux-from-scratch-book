import{j as s}from"./index-CGptwfLb.js";import{P as t}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";import{A as o}from"./AlertBox-DblzR--W.js";function a(){return s.jsxs(t,{title:"/etc/fstab",subtitle:"A tabela de montagens lida no boot. Sem ela, o sistema não monta /, /boot, swap...",difficulty:"intermediario",timeToRead:"4 min",children:[s.jsx(o,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),s.jsx("h2",{children:"Glossário rápido"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"/etc/fstab"})," "," — "," ","montagens."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"UUID"})," "," — "," ","identificador."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"ext4"})," "," — "," ","padrão."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"mount -a"})," "," — "," ","aplica."]})]}),s.jsx("h2",{children:"Estrutura de uma linha"}),s.jsx(e,{language:"text",code:`# <dispositivo>   <ponto>   <fs>   <opções>           <dump> <pass>
UUID=xxxx        /         ext4   defaults,noatime    1      1
UUID=yyyy        swap      swap   pri=1               0      0`}),s.jsx("h2",{children:"Descobrindo UUIDs"}),s.jsx(e,{language:"bash",code:`blkid /dev/sdb1
# /dev/sdb1: LABEL="LFS" UUID="abc123-..." TYPE="ext4"`}),s.jsx("h2",{children:"Exemplo completo"}),s.jsx(e,{language:"bash",code:`cat > /etc/fstab << "EOF"
# Begin /etc/fstab
# <file system>  <mount point>  <type>     <options>             <dump> <pass>

/dev/sdb1        /              ext4       defaults,noatime       1     1
/dev/sdb2        swap           swap       pri=1                  0     0
proc             /proc          proc       nosuid,noexec,nodev    0     0
sysfs            /sys           sysfs      nosuid,noexec,nodev    0     0
devpts           /dev/pts       devpts     gid=5,mode=620         0     0
tmpfs            /run           tmpfs      defaults               0     0
devtmpfs         /dev           devtmpfs   mode=0755,nosuid       0     0
tmpfs            /dev/shm       tmpfs      nosuid,nodev           0     0
cgroup2          /sys/fs/cgroup cgroup2    nosuid,noexec,nodev    0     0

# End /etc/fstab
EOF`}),s.jsxs(o,{type:"warning",title:"Confira UUIDs ANTES de reiniciar",children:["UUID errado = sistema não monta = boot quebra. Cole UUIDs reais do"," ",s.jsx("code",{children:"blkid"}),", não os do exemplo."]})]})}export{a as default};

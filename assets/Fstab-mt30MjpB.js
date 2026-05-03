import{j as e}from"./index-Dq2pq_L0.js";import{P as o}from"./PageContainer-CRFAuOt2.js";import{C as s}from"./CodeBlock-DfTRrP6d.js";import{A as t}from"./AlertBox-DFdNRTyW.js";function p(){return e.jsxs(o,{title:"/etc/fstab",subtitle:"A tabela de montagens lida no boot. Sem ela, o sistema não monta /, /boot, swap...",difficulty:"intermediario",timeToRead:"4 min",children:[e.jsx("h2",{children:"Estrutura de uma linha"}),e.jsx(s,{language:"text",code:`# <dispositivo>   <ponto>   <fs>   <opções>           <dump> <pass>
UUID=xxxx        /         ext4   defaults,noatime    1      1
UUID=yyyy        swap      swap   pri=1               0      0`}),e.jsx("h2",{children:"Descobrindo UUIDs"}),e.jsx(s,{language:"bash",code:`blkid /dev/sdb1
# /dev/sdb1: LABEL="LFS" UUID="abc123-..." TYPE="ext4"`}),e.jsx("h2",{children:"Exemplo completo"}),e.jsx(s,{language:"bash",code:`cat > /etc/fstab << "EOF"
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
EOF`}),e.jsxs(t,{type:"warning",title:"Confira UUIDs ANTES de reiniciar",children:["UUID errado = sistema não monta = boot quebra. Cole UUIDs reais do"," ",e.jsx("code",{children:"blkid"}),", não os do exemplo."]})]})}export{p as default};

import{j as i}from"./index-CGptwfLb.js";import{P as r}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";function c(){return i.jsxs(r,{title:"Criando os Diretórios do FHS",subtitle:"Estrutura de diretórios padrão Linux (Filesystem Hierarchy Standard).",difficulty:"iniciante",timeToRead:"3 min",children:[i.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),i.jsx("h2",{children:"Glossário rápido"}),i.jsxs("ul",{children:[i.jsxs("li",{children:[i.jsx("strong",{children:"mkdir -p"})," "," — "," ","/etc /var /usr/{bin,lib}."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"FHS"})," "," — "," ","Filesystem Hierarchy."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Permissões"})," "," — "," ","mode 0755."]})]}),i.jsx("h2",{children:"Comando único"}),i.jsx(s,{language:"bash",code:`mkdir -pv /{boot,home,mnt,opt,srv}
mkdir -pv /etc/{opt,sysconfig}
mkdir -pv /lib/firmware
mkdir -pv /media/{floppy,cdrom}
mkdir -pv /usr/{,local/}{include,src}
mkdir -pv /usr/lib/locale
mkdir -pv /usr/local/{bin,lib,sbin}
mkdir -pv /usr/{,local/}share/{color,dict,doc,info,locale,man}
mkdir -pv /usr/{,local/}share/{misc,terminfo,zoneinfo}
mkdir -pv /usr/{,local/}share/man/man{1..8}
mkdir -pv /var/{cache,local,log,mail,opt,spool}
mkdir -pv /var/lib/{color,misc,locate}

ln -sfv /run /var/run
ln -sfv /run/lock /var/lock

install -dv -m 0750 /root
install -dv -m 1777 /tmp /var/tmp`}),i.jsx("h2",{children:"O que está acontecendo?"}),i.jsxs("ul",{children:[i.jsxs("li",{children:[i.jsx("code",{children:"/boot"})," — kernel e GRUB."]}),i.jsxs("li",{children:[i.jsx("code",{children:"/etc"})," — configurações."]}),i.jsxs("li",{children:[i.jsx("code",{children:"/home"})," — diretórios de usuários."]}),i.jsxs("li",{children:[i.jsx("code",{children:"/var"})," — dados variáveis (logs, caches, mail)."]}),i.jsxs("li",{children:[i.jsx("code",{children:"/tmp"}),", ",i.jsx("code",{children:"/var/tmp"})," — temporários (sticky bit)."]}),i.jsxs("li",{children:[i.jsx("code",{children:"/root"})," — home do root, modo 0750."]})]})]})}export{c as default};

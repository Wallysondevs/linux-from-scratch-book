import{j as r}from"./index-Dq2pq_L0.js";import{P as i}from"./PageContainer-CRFAuOt2.js";import{C as o}from"./CodeBlock-DfTRrP6d.js";function d(){return r.jsxs(i,{title:"Criando os Diretórios do FHS",subtitle:"Estrutura de diretórios padrão Linux (Filesystem Hierarchy Standard).",difficulty:"iniciante",timeToRead:"3 min",children:[r.jsx("h2",{children:"Comando único"}),r.jsx(o,{language:"bash",code:`mkdir -pv /{boot,home,mnt,opt,srv}
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
install -dv -m 1777 /tmp /var/tmp`}),r.jsx("h2",{children:"O que está acontecendo?"}),r.jsxs("ul",{children:[r.jsxs("li",{children:[r.jsx("code",{children:"/boot"})," — kernel e GRUB."]}),r.jsxs("li",{children:[r.jsx("code",{children:"/etc"})," — configurações."]}),r.jsxs("li",{children:[r.jsx("code",{children:"/home"})," — diretórios de usuários."]}),r.jsxs("li",{children:[r.jsx("code",{children:"/var"})," — dados variáveis (logs, caches, mail)."]}),r.jsxs("li",{children:[r.jsx("code",{children:"/tmp"}),", ",r.jsx("code",{children:"/var/tmp"})," — temporários (sticky bit)."]}),r.jsxs("li",{children:[r.jsx("code",{children:"/root"})," — home do root, modo 0750."]})]})]})}export{d as default};

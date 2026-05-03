import{j as e}from"./index-Dq2pq_L0.js";import{P as r}from"./PageContainer-CRFAuOt2.js";import{C as s}from"./CodeBlock-DfTRrP6d.js";import{A as o}from"./AlertBox-DFdNRTyW.js";import{P as i}from"./PracticeBox-BXFoiNe5.js";function l(){return e.jsxs(r,{title:"Entrando no chroot",subtitle:"O momento da virada: trocar a raiz do sistema para $LFS e isolar completamente o build do host. A partir daqui, o toolchain temporário é tudo o que existe.",difficulty:"avancado",timeToRead:"8 min",children:[e.jsx("h2",{children:"O que é chroot?"}),e.jsxs("p",{children:[e.jsx("code",{children:"chroot"})," (change root) muda o diretório raiz ",e.jsx("code",{children:"/"}),"de um processo para outro caminho — ",e.jsx("code",{children:"$LFS"}),', no nosso caso. Tudo que esse processo (e seus filhos) enxerga acontece dentro daquela árvore. É a "VM mais leve do mundo": sem hypervisor, sem kernel separado, só uma reinterpretação do que é ',e.jsx("code",{children:"/"}),"."]}),e.jsxs(o,{type:"info",title:"chroot não é jail nem container",children:["chroot isola o sistema de arquivos, mas ",e.jsx("strong",{children:"não"}),"isola PIDs, rede, IPC ou cgroups. Um processo dentro do chroot ainda enxerga todos os processos do host via ",e.jsx("code",{children:"/proc"}),"(que é o que queremos no LFS — precisamos ver ",e.jsx("code",{children:"proc"}),",",e.jsx("code",{children:" sys"}),", ",e.jsx("code",{children:"dev"}),"). Para isolamento real, use namespaces (Docker, LXC)."]}),e.jsx("h2",{children:"O comando completo"}),e.jsx(s,{language:"bash",code:`chroot "$LFS" /usr/bin/env -i              \\
    HOME=/root                                  \\
    TERM="$TERM"                                \\
    PS1='(lfs chroot) \\u:\\w\\$ '               \\
    PATH=/usr/bin:/usr/sbin                     \\
    MAKEFLAGS="-j$(nproc)"                      \\
    TESTSUITEFLAGS="-j$(nproc)"                 \\
    /bin/bash --login`}),e.jsx("h2",{children:"Dissecando linha por linha"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:'chroot "$LFS"'})," — muda raiz para ",e.jsx("code",{children:"/mnt/lfs"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"/usr/bin/env -i"})," — limpa ",e.jsx("strong",{children:"todas"})," as variáveis de ambiente. Sem isso, ",e.jsx("code",{children:"LD_LIBRARY_PATH"}),", ",e.jsx("code",{children:"PYTHONPATH"})," etc. do host vazariam."]}),e.jsxs("li",{children:[e.jsx("code",{children:"HOME=/root"})," — define um home dentro do chroot. Sem isso, programas tentam ",e.jsx("code",{children:"cd $HOME"})," e quebram."]}),e.jsxs("li",{children:[e.jsx("code",{children:'TERM="$TERM"'})," — preserva o terminal (xterm, tmux-256color). Sem isso, ",e.jsx("code",{children:"vim"}),", ",e.jsx("code",{children:"less"})," e cores ficam quebrados."]}),e.jsxs("li",{children:[e.jsx("code",{children:"PS1='(lfs chroot) ...'"})," — prompt distintivo. ",e.jsx("strong",{children:"Crítico"})," para você não esquecer onde está."]}),e.jsxs("li",{children:[e.jsx("code",{children:"PATH=/usr/bin:/usr/sbin"})," — só esses caminhos. Note que ",e.jsx("code",{children:"$LFS/tools"})," sumiu — agora ",e.jsx("code",{children:"/usr/bin"})," dentro do chroot já contém o que precisamos."]}),e.jsxs("li",{children:[e.jsx("code",{children:'MAKEFLAGS="-j$(nproc)"'})," — paraleliza builds usando todos os núcleos."]}),e.jsxs("li",{children:[e.jsx("code",{children:"/bin/bash --login"})," — força um ",e.jsx("em",{children:"login shell"}),", lê ",e.jsx("code",{children:"/etc/profile"}),"."]})]}),e.jsx("h2",{children:"Pré-requisitos críticos"}),e.jsx(i,{title:"Antes de entrar no chroot",children:e.jsxs("ol",{className:"list-decimal ml-5 space-y-1",children:[e.jsxs("li",{children:["Filesystems virtuais montados: ",e.jsx("code",{children:"mount --bind /dev $LFS/dev"})," + ",e.jsx("code",{children:"devpts/proc/sysfs/tmpfs"}),' (ver capítulo "Preparando VFS").']}),e.jsx("li",{children:'Owner trocado para root (capítulo "Mudando o dono").'}),e.jsxs("li",{children:["Está como ",e.jsx("code",{children:"root"})," no host."]}),e.jsxs("li",{children:[e.jsx("code",{children:"echo $LFS"})," retorna ",e.jsx("code",{children:"/mnt/lfs"})," (re-exporte se necessário)."]})]})}),e.jsx("h2",{children:"Casos práticos"}),e.jsx(s,{language:"bash",code:`# Validar que está realmente dentro do chroot:
ls /         # deve mostrar usr, lib, etc, var, tools, sources...
pwd          # /
cat /etc/hostname  # se existir, é do chroot, não do host

# Confirmar que /proc está acessível:
ls /proc | head -5

# Se /proc está vazio: você esqueceu de montar VFS — saia,
# monte e re-entre.

# Sair do chroot:
exit   # ou Ctrl+D

# Logo após sair, sempre desmonte:
umount $LFS/dev/pts
umount $LFS/{dev,proc,sys,run}`}),e.jsx("h2",{children:"Armadilhas comuns"}),e.jsxs(o,{type:"warning",title:"Esquecer o env -i",children:["Sem ",e.jsx("code",{children:"/usr/bin/env -i"}),", variáveis como",e.jsx("code",{children:" LD_LIBRARY_PATH"})," do host fazem o loader procurar libs em caminhos que não existem — o primeiro comando dá ",e.jsx("code",{children:"error while loading shared libraries"}),"."]}),e.jsxs(o,{type:"danger",title:"Reboot com chroot ativo",children:["Se você der ",e.jsx("code",{children:"reboot"})," no host com filesystems ainda bind-mounted em ",e.jsx("code",{children:"$LFS"}),", o systemd pode tentar desmontar e travar. Sempre ",e.jsx("code",{children:"exit"})," + ",e.jsx("code",{children:"umount"}),"antes de qualquer reboot."]}),e.jsxs(o,{type:"danger",title:'"command not found" ao entrar',children:["Se ",e.jsx("code",{children:"/bin/bash"})," não existe dentro do chroot, é porque você esqueceu de criar o symlink ",e.jsx("code",{children:"$LFS/bin/sh -> bash"}),"ou o Bash temporário não foi instalado em ",e.jsx("code",{children:"$LFS/usr/bin"}),". Sintoma: ",e.jsx("code",{children:"chroot: failed to run command '/bin/bash': No such file or directory"}),"."]}),e.jsxs(o,{type:"success",title:"Roda dentro de tmux/screen",children:["Sessões longas dentro do chroot quebram se sua conexão SSH cai. Sempre rode dentro de ",e.jsx("code",{children:"tmux"})," ou",e.jsx("code",{children:" screen"})," — você reconecta e o build continua."]}),e.jsx("h2",{children:"Cheat sheet"}),e.jsx(s,{language:"bash",code:`# Entrar:
chroot "$LFS" /usr/bin/env -i HOME=/root TERM="$TERM" \\
    PS1='(lfs chroot) \\u:\\w\\$ ' PATH=/usr/bin:/usr/sbin \\
    MAKEFLAGS="-j$(nproc)" /bin/bash --login

# Re-entrar (depois de reboot do host):
# 1. mount $LFS_DEV /mnt/lfs
# 2. remontar /dev /proc /sys /run /dev/pts
# 3. chroot ... (mesmo comando)

# Sair:
exit && umount -R $LFS/{dev,proc,sys,run}`})]})}export{l as default};

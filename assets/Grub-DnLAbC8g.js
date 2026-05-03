import{j as o}from"./index-CGptwfLb.js";import{P as s}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";import{A as i}from"./AlertBox-DblzR--W.js";function d(){return o.jsxs(s,{title:"Configurando o GRUB",subtitle:"Instale o GRUB no MBR/EFI e crie /boot/grub/grub.cfg para apresentar o menu de boot.",difficulty:"avancado",timeToRead:"6 min",children:[o.jsx(i,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),o.jsx("h2",{children:"Glossário rápido"}),o.jsxs("ul",{children:[o.jsxs("li",{children:[o.jsx("strong",{children:"GRUB"})," "," — "," ","bootloader."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"grub-install"})," "," — "," ","instala."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"grub-mkconfig"})," "," — "," ","gera config."]}),o.jsxs("li",{children:[o.jsx("strong",{children:"/boot/grub"})," "," — "," ","arquivos."]})]}),o.jsx("h2",{children:"Caminho A — BIOS Legacy (MBR)"}),o.jsx(e,{language:"bash",code:"grub-install /dev/sdb"}),o.jsx("h2",{children:"Caminho B — UEFI"}),o.jsx(e,{language:"bash",code:`# instale antes: efibootmgr, dosfstools, mtools (BLFS)

# /boot/efi precisa estar montado:
mount -v /dev/sdb1 /boot/efi  # adapte ao seu layout

grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=LFS --recheck`}),o.jsx("h2",{children:"Criando /boot/grub/grub.cfg"}),o.jsx(e,{language:"bash",code:`cat > /boot/grub/grub.cfg << "EOF"
# /boot/grub/grub.cfg
set default=0
set timeout=5

insmod ext2
set root=(hd0,1)

menuentry "GNU/Linux From Scratch 12.x" {
    linux /boot/vmlinuz-6.10.5-lfs root=/dev/sdb1 ro
}
EOF`}),o.jsxs(i,{type:"warning",title:"Cuidado com (hd0,1) vs /dev/sdaX",children:['Para o GRUB, "(hd0,1)" significa "primeiro disco que ele enxerga, primeira partição". Em muitos casos isso bate com ',o.jsx("code",{children:"/dev/sda1"}),`— mas depois de remover o disco do host, o "primeiro disco" do BIOS é o disco do LFS. Se quebrar no boot, edite a linha do GRUB pressionando 'e' no menu.`]}),o.jsx("h2",{children:"Verificando os módulos do GRUB"}),o.jsx(e,{language:"bash",code:`ls /boot/grub/i386-pc/ | head      # legacy BIOS
ls /boot/grub/x86_64-efi/ | head   # UEFI`})]})}export{d as default};

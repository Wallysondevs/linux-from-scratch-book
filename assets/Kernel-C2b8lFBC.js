import{j as e}from"./index-ZrM6Gh7j.js";import{P as r}from"./PageContainer-jOSfeH0u.js";import{C as o}from"./CodeBlock-cFXLaLiU.js";import{A as i}from"./AlertBox-D3Y0IUPD.js";function d(){return e.jsxs(r,{title:"Compilando o Kernel Linux",subtitle:"O coração do sistema. Configure, compile e instale o kernel para o seu hardware.",difficulty:"avancado",timeToRead:"10 min",children:[e.jsx("h2",{children:"Extraindo"}),e.jsx(o,{language:"bash",code:`cd /sources
tar -xf linux-6.16.1.tar.xz
cd linux-6.16.1

make mrproper       # limpa qualquer config residual`}),e.jsx("h2",{children:"Configuração"}),e.jsx("p",{children:"Três caminhos para escolher a configuração:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"make defconfig"})})," — configuração padrão (boa base)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"make menuconfig"})})," — interface ncurses interativa."]}),e.jsxs("li",{children:[e.jsx("strong",{children:e.jsx("code",{children:"make oldconfig"})})," — atualiza um ",e.jsx("code",{children:".config"})," antigo."]})]}),e.jsx(o,{language:"bash",code:`make defconfig
# ou
make menuconfig`}),e.jsx("h2",{children:"Habilite obrigatoriamente"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Suporte ao seu controlador de disco (SATA, NVMe, VirtIO)."}),e.jsx("li",{children:"O sistema de arquivos da partição raiz (ext4)."}),e.jsxs("li",{children:["Suporte a inicialização (built-in, não como módulo): ",e.jsx("code",{children:"CONFIG_BLK_DEV_INITRD"})," opcional."]}),e.jsxs("li",{children:["Para VirtualBox: ",e.jsx("code",{children:"CONFIG_VIRTIO_BLK"}),", ",e.jsx("code",{children:"CONFIG_VIRTIO_NET"}),", ",e.jsx("code",{children:"CONFIG_VIRTIO_PCI"}),"."]}),e.jsx("li",{children:"tmpfs, devtmpfs auto-mount, sysfs, procfs."}),e.jsx("li",{children:"UEFI runtime services (se for boot UEFI)."})]}),e.jsx(i,{type:"warning",title:"Esquecer driver do disco = não dar boot",children:"Se você desabilitar o driver do controlador SATA/NVMe/VirtIO, o kernel carrega mas não enxerga o disco — kernel panic. Confira duas vezes."}),e.jsx("h2",{children:"Compilando"}),e.jsx(o,{language:"bash",code:`make -j$(nproc)        # de 30 min a 2 horas, dependendo da máquina
make modules_install`}),e.jsx("h2",{children:"Instalando o kernel + System.map + config"}),e.jsx(o,{language:"bash",code:`cp -iv arch/x86/boot/bzImage /boot/vmlinuz-6.10.5-lfs
cp -iv System.map                /boot/System.map-6.10.5
cp -iv .config                   /boot/config-6.10.5

install -d /usr/share/doc/linux-6.16.1
cp -r Documentation/* /usr/share/doc/linux-6.16.1

cd /sources && rm -rf linux-6.16.1`}),e.jsx("h2",{children:"Configurando o linker dinâmico do kernel"}),e.jsx(o,{language:"bash",code:`install -v -m755 -d /etc/modprobe.d
cat > /etc/modprobe.d/usb.conf << "EOF"
install ohci_hcd /sbin/modprobe ehci_hcd ; /sbin/modprobe -i ohci_hcd $CMDLINE_OPTS
install uhci_hcd /sbin/modprobe ehci_hcd ; /sbin/modprobe -i uhci_hcd $CMDLINE_OPTS
EOF`}),e.jsx(i,{type:"success",title:"Kernel pronto!",children:"Próximo passo: instalar o GRUB para que o BIOS/UEFI saiba como carregar esse kernel."})]})}export{d as default};

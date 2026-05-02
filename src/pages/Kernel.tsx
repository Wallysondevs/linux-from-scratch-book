import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Kernel() {
  return (
    <PageContainer
      title="Compilando o Kernel Linux"
      subtitle="O coração do sistema. Configure, compile e instale o kernel para o seu hardware."
      difficulty="avancado"
      timeToRead="10 min"
    >
      <h2>Extraindo</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf linux-6.16.1.tar.xz
cd linux-6.16.1

make mrproper       # limpa qualquer config residual`}
      />

      <h2>Configuração</h2>
      <p>Três caminhos para escolher a configuração:</p>
      <ul>
        <li><strong><code>make defconfig</code></strong> — configuração padrão (boa base).</li>
        <li><strong><code>make menuconfig</code></strong> — interface ncurses interativa.</li>
        <li><strong><code>make oldconfig</code></strong> — atualiza um <code>.config</code> antigo.</li>
      </ul>

      <CodeBlock
        language="bash"
        code={`make defconfig
# ou
make menuconfig`}
      />

      <h2>Habilite obrigatoriamente</h2>
      <ul>
        <li>Suporte ao seu controlador de disco (SATA, NVMe, VirtIO).</li>
        <li>O sistema de arquivos da partição raiz (ext4).</li>
        <li>Suporte a inicialização (built-in, não como módulo): <code>CONFIG_BLK_DEV_INITRD</code> opcional.</li>
        <li>Para VirtualBox: <code>CONFIG_VIRTIO_BLK</code>, <code>CONFIG_VIRTIO_NET</code>, <code>CONFIG_VIRTIO_PCI</code>.</li>
        <li>tmpfs, devtmpfs auto-mount, sysfs, procfs.</li>
        <li>UEFI runtime services (se for boot UEFI).</li>
      </ul>

      <AlertBox type="warning" title="Esquecer driver do disco = não dar boot">
        Se você desabilitar o driver do controlador SATA/NVMe/VirtIO, o kernel
        carrega mas não enxerga o disco — kernel panic. Confira duas vezes.
      </AlertBox>

      <h2>Compilando</h2>
      <CodeBlock
        language="bash"
        code={`make -j$(nproc)        # de 30 min a 2 horas, dependendo da máquina
make modules_install`}
      />

      <h2>Instalando o kernel + System.map + config</h2>
      <CodeBlock
        language="bash"
        code={`cp -iv arch/x86/boot/bzImage /boot/vmlinuz-6.10.5-lfs
cp -iv System.map                /boot/System.map-6.10.5
cp -iv .config                   /boot/config-6.10.5

install -d /usr/share/doc/linux-6.16.1
cp -r Documentation/* /usr/share/doc/linux-6.16.1

cd /sources && rm -rf linux-6.16.1`}
      />

      <h2>Configurando o linker dinâmico do kernel</h2>
      <CodeBlock
        language="bash"
        code={`install -v -m755 -d /etc/modprobe.d
cat > /etc/modprobe.d/usb.conf << "EOF"
install ohci_hcd /sbin/modprobe ehci_hcd ; /sbin/modprobe -i ohci_hcd $CMDLINE_OPTS
install uhci_hcd /sbin/modprobe ehci_hcd ; /sbin/modprobe -i uhci_hcd $CMDLINE_OPTS
EOF`}
      />

      <AlertBox type="success" title="Kernel pronto!">
        Próximo passo: instalar o GRUB para que o BIOS/UEFI saiba como carregar
        esse kernel.
      </AlertBox>
    </PageContainer>
  );
}

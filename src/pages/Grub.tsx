import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Grub() {
  return (
    <PageContainer
      title="Configurando o GRUB"
      subtitle="Instale o GRUB no MBR/EFI e crie /boot/grub/grub.cfg para apresentar o menu de boot."
      difficulty="avancado"
      timeToRead="6 min"
    >
      <h2>Caminho A — BIOS Legacy (MBR)</h2>
      <CodeBlock
        language="bash"
        code={`grub-install /dev/sdb`}
      />

      <h2>Caminho B — UEFI</h2>
      <CodeBlock
        language="bash"
        code={`# instale antes: efibootmgr, dosfstools, mtools (BLFS)

# /boot/efi precisa estar montado:
mount -v /dev/sdb1 /boot/efi  # adapte ao seu layout

grub-install --target=x86_64-efi --efi-directory=/boot/efi --bootloader-id=LFS --recheck`}
      />

      <h2>Criando /boot/grub/grub.cfg</h2>
      <CodeBlock
        language="bash"
        code={`cat > /boot/grub/grub.cfg << "EOF"
# /boot/grub/grub.cfg
set default=0
set timeout=5

insmod ext2
set root=(hd0,1)

menuentry "GNU/Linux From Scratch 12.x" {
    linux /boot/vmlinuz-6.10.5-lfs root=/dev/sdb1 ro
}
EOF`}
      />

      <AlertBox type="warning" title="Cuidado com (hd0,1) vs /dev/sdaX">
        Para o GRUB, "(hd0,1)" significa "primeiro disco que ele enxerga,
        primeira partição". Em muitos casos isso bate com <code>/dev/sda1</code>
        — mas depois de remover o disco do host, o "primeiro disco" do BIOS é o
        disco do LFS. Se quebrar no boot, edite a linha do GRUB pressionando 'e'
        no menu.
      </AlertBox>

      <h2>Verificando os módulos do GRUB</h2>
      <CodeBlock
        language="bash"
        code={`ls /boot/grub/i386-pc/ | head      # legacy BIOS
ls /boot/grub/x86_64-efi/ | head   # UEFI`}
      />
    </PageContainer>
  );
}

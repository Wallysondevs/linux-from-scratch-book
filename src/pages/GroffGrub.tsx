import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function GroffGrub() {
  return (
    <PageContainer
      title="Groff & GRUB"
      subtitle="Groff formata as man-pages. GRUB é o bootloader que carrega o kernel — peça crítica."
      difficulty="intermediario"
      timeToRead="4 min"
    >
      <h2>Groff</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf groff-1.23.0.tar.gz && cd groff-1.23.0
PAGE=A4 ./configure --prefix=/usr   # ou PAGE=letter
make
make install
cd .. && rm -rf groff-1.23.0`}
      />

      <h2>GRUB</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf grub-2.12.tar.xz && cd grub-2.12

unset {C,CPP,CXX,LD}FLAGS

echo depends bli part_gpt > grub-core/extra_deps.lst
./configure --prefix=/usr        \\
            --sysconfdir=/etc    \\
            --disable-efiemu     \\
            --disable-werror

make
make install
mv -v /etc/bash_completion.d/grub /usr/share/bash-completion/completions
cd .. && rm -rf grub-2.12`}
      />

      <AlertBox type="info" title="GRUB para EFI?">
        Para sistemas UEFI, adicione <code>--with-platform=efi</code> ao{" "}
        <code>./configure</code> e instale também <code>efibootmgr</code> via BLFS.
        A configuração final virá no capítulo <a href="#/grub">Configurando o GRUB</a>.
      </AlertBox>
    </PageContainer>
  );
}

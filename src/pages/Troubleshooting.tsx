import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Troubleshooting() {
  return (
    <PageContainer
      title="Troubleshooting"
      subtitle="Os erros mais comuns que aparecem no LFS — e como resolver cada um."
      difficulty="intermediario"
      timeToRead="8 min"
    >
      <h2>./configure: command not found</h2>
      <p>
        Você está no diretório errado, ou o tarball foi extraído com erro. Confira{" "}
        <code>pwd</code> e <code>ls -la</code>.
      </p>

      <h2>error: Bison not found</h2>
      <p>
        Instale Bison no host ANTES de começar. Em distros baseadas em Debian:{" "}
        <code>sudo apt install bison</code>.
      </p>

      <h2>cannot find -lstdc++</h2>
      <p>
        Você esqueceu o passo "Libstdc++ from GCC" da toolchain. Volte e
        recompile.
      </p>

      <h2>relocation R_X86_64_32 against ... can not be used when making a shared object</h2>
      <p>
        Pacote sendo compilado sem PIC. Solução: adicionar <code>-fPIC</code> ao{" "}
        <code>CFLAGS</code>.
      </p>

      <h2>kernel panic — VFS: Unable to mount root fs</h2>
      <ul>
        <li>UUID errado no <code>grub.cfg</code> — confira com <code>blkid</code> do live CD.</li>
        <li>Driver do controlador SATA/NVMe não compilado — refaça o kernel.</li>
        <li>Filesystem (ext4) não compilado built-in — refaça o kernel.</li>
      </ul>

      <h2>GRUB rescue {'>'}</h2>
      <p>
        GRUB carregou mas não achou os módulos. No prompt rescue:
      </p>
      <CodeBlock
        language="bash"
        code={`grub rescue> ls
grub rescue> set root=(hd0,gpt1)
grub rescue> set prefix=(hd0,gpt1)/boot/grub
grub rescue> insmod normal
grub rescue> normal`}
      />
      <p>Depois de bootar, reinstale: <code>grub-install /dev/sdb</code>.</p>

      <h2>Glibc test suite com falhas</h2>
      <p>
        Algumas falhas são normais em ambientes sem rede / sem todos os locales.
        Confronte com a lista de "expected failures" no livro oficial.
      </p>

      <h2>sudo: command not found dentro do chroot</h2>
      <p>
        Sudo só é instalado via BLFS. Dentro do chroot você JÁ é root — não
        precisa de sudo.
      </p>

      <h2>Espaço em disco esgotado</h2>
      <p>
        Compilar GCC/Glibc consome bastante. Limpe diretórios <code>build/</code>{" "}
        antigos e considere expandir o disco virtual. Apague tarballs já
        extraídos (mantém só os <code>.tar.xz</code>).
      </p>

      <h2>chroot: failed to run command '/bin/bash': No such file or directory</h2>
      <p>
        <code>$LFS/bin/bash</code> não existe ainda. Você está tentando entrar
        no chroot antes de ter instalado o Bash temporário. Volte e siga a ordem.
      </p>

      <AlertBox type="info" title="Quando travar de vez">
        Confronte com o <a href="https://www.linuxfromscratch.org/lfs/" target="_blank" rel="noopener noreferrer">livro oficial</a>{" "}
        e com a wiki/lista da comunidade LFS (<a href="https://www.linuxfromscratch.org/mail.html" target="_blank" rel="noopener noreferrer">linuxfromscratch.org/mail.html</a>).
        São ativos e amigáveis.
      </AlertBox>
    </PageContainer>
  );
}

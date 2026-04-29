import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function EnteringChroot() {
  return (
    <PageContainer
      title="Entrando no Chroot"
      subtitle="O comando que muda a raiz do sistema. A partir daqui, você está dentro do LFS."
      difficulty="intermediario"
      timeToRead="4 min"
    >
      <h2>O comando <code>chroot</code></h2>
      <CodeBlock
        language="bash"
        code={`chroot "$LFS" /usr/bin/env -i   \\
    HOME=/root                  \\
    TERM="$TERM"                \\
    PS1='(lfs chroot) \\u:\\w\\$ ' \\
    PATH=/usr/bin:/usr/sbin     \\
    MAKEFLAGS="-j$(nproc)"      \\
    TESTSUITEFLAGS="-j$(nproc)" \\
    /bin/bash --login`}
      />

      <h3>Linha por linha</h3>
      <ul>
        <li><code>chroot "$LFS"</code> — muda a raiz para <code>/mnt/lfs</code>.</li>
        <li><code>/usr/bin/env -i</code> — apaga TODAS as variáveis herdadas.</li>
        <li><code>PS1='(lfs chroot)...</code> — prompt distintivo, para você não se confundir.</li>
        <li><code>PATH=/usr/bin:/usr/sbin</code> — sem <code>/tools</code>, porque agora estamos "no destino" — todo o sistema final está em <code>/usr</code>.</li>
        <li><code>MAKEFLAGS=-j$(nproc)</code> — paralelismo nas builds.</li>
        <li><code>--login</code> — shell de login, lê <code>/etc/profile</code> se existir.</li>
      </ul>

      <h2>Confirmando que está no chroot</h2>
      <CodeBlock
        language="bash"
        code={`# o prompt deve ter "(lfs chroot)"
ls /
# bin  dev  etc  lib  lib64  proc  run  sbin  sources  sys  tools  usr  var

uname -a   # ainda mostra o kernel do host (normal)
cat /etc/os-release 2>/dev/null  # vazio, ainda não criamos`}
      />

      <AlertBox type="info" title="Sair do chroot">
        Quando terminar uma sessão, basta <code>exit</code> (ou{" "}
        <code>logout</code>). Não esqueça de desmontar os filesystems virtuais
        depois (umount em ordem inversa).
      </AlertBox>

      <AlertBox type="warning" title="Nada de comandos do host aqui">
        Dentro do chroot, comandos como <code>apt</code>, <code>systemctl</code>,
        <code>vim</code> só funcionam se EXISTIREM em <code>/usr/bin</code> do
        LFS. No início, quase nada existe. Você vai instalar tudo nos próximos
        capítulos.
      </AlertBox>
    </PageContainer>
  );
}

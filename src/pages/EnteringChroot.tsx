import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { PracticeBox } from "@/components/ui/PracticeBox";

export default function EnteringChroot() {
  return (
    <PageContainer
      title="Entrando no chroot"
      subtitle="O momento da virada: trocar a raiz do sistema para $LFS e isolar completamente o build do host. A partir daqui, o toolchain temporário é tudo o que existe."
      difficulty="avancado"
      timeToRead="8 min"
    >
      <h2>O que é chroot?</h2>
      <p>
        <code>chroot</code> (change root) muda o diretório raiz <code>/</code>
        de um processo para outro caminho — <code>$LFS</code>, no nosso
        caso. Tudo que esse processo (e seus filhos) enxerga acontece
        dentro daquela árvore. É a "VM mais leve do mundo": sem
        hypervisor, sem kernel separado, só uma reinterpretação do
        que é <code>/</code>.
      </p>

      <AlertBox type="info" title="chroot não é jail nem container">
        chroot isola o sistema de arquivos, mas <strong>não</strong>
        isola PIDs, rede, IPC ou cgroups. Um processo dentro do chroot
        ainda enxerga todos os processos do host via <code>/proc</code>
        (que é o que queremos no LFS — precisamos ver <code>proc</code>,
        <code> sys</code>, <code>dev</code>). Para isolamento real, use
        namespaces (Docker, LXC).
      </AlertBox>

      <h2>O comando completo</h2>
      <CodeBlock
        language="bash"
        code={`chroot "$LFS" /usr/bin/env -i              \\
    HOME=/root                                  \\
    TERM="$TERM"                                \\
    PS1='(lfs chroot) \\u:\\w\\$ '               \\
    PATH=/usr/bin:/usr/sbin                     \\
    MAKEFLAGS="-j$(nproc)"                      \\
    TESTSUITEFLAGS="-j$(nproc)"                 \\
    /bin/bash --login`}
      />

      <h2>Dissecando linha por linha</h2>
      <ul>
        <li><code>chroot "$LFS"</code> — muda raiz para <code>/mnt/lfs</code>.</li>
        <li><code>/usr/bin/env -i</code> — limpa <strong>todas</strong> as variáveis de ambiente. Sem isso, <code>LD_LIBRARY_PATH</code>, <code>PYTHONPATH</code> etc. do host vazariam.</li>
        <li><code>HOME=/root</code> — define um home dentro do chroot. Sem isso, programas tentam <code>cd $HOME</code> e quebram.</li>
        <li><code>TERM="$TERM"</code> — preserva o terminal (xterm, tmux-256color). Sem isso, <code>vim</code>, <code>less</code> e cores ficam quebrados.</li>
        <li><code>PS1='(lfs chroot) ...'</code> — prompt distintivo. <strong>Crítico</strong> para você não esquecer onde está.</li>
        <li><code>PATH=/usr/bin:/usr/sbin</code> — só esses caminhos. Note que <code>$LFS/tools</code> sumiu — agora <code>/usr/bin</code> dentro do chroot já contém o que precisamos.</li>
        <li><code>MAKEFLAGS="-j$(nproc)"</code> — paraleliza builds usando todos os núcleos.</li>
        <li><code>/bin/bash --login</code> — força um <em>login shell</em>, lê <code>/etc/profile</code>.</li>
      </ul>

      <h2>Pré-requisitos críticos</h2>
      <PracticeBox title="Antes de entrar no chroot">
        <ol className="list-decimal ml-5 space-y-1">
          <li>Filesystems virtuais montados: <code>mount --bind /dev $LFS/dev</code> + <code>devpts/proc/sysfs/tmpfs</code> (ver capítulo "Preparando VFS").</li>
          <li>Owner trocado para root (capítulo "Mudando o dono").</li>
          <li>Está como <code>root</code> no host.</li>
          <li><code>echo $LFS</code> retorna <code>/mnt/lfs</code> (re-exporte se necessário).</li>
        </ol>
      </PracticeBox>

      <h2>Casos práticos</h2>
      <CodeBlock
        language="bash"
        code={`# Validar que está realmente dentro do chroot:
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
umount $LFS/{dev,proc,sys,run}`}
      />

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Esquecer o env -i">
        Sem <code>/usr/bin/env -i</code>, variáveis como
        <code> LD_LIBRARY_PATH</code> do host fazem o
        loader procurar libs em caminhos que não existem
        — o primeiro comando dá <code>error while loading shared
        libraries</code>.
      </AlertBox>

      <AlertBox type="danger" title="Reboot com chroot ativo">
        Se você der <code>reboot</code> no host com filesystems ainda
        bind-mounted em <code>$LFS</code>, o systemd pode tentar
        desmontar e travar. Sempre <code>exit</code> + <code>umount</code>
        antes de qualquer reboot.
      </AlertBox>

      <AlertBox type="danger" title='"command not found" ao entrar'>
        Se <code>/bin/bash</code> não existe dentro do chroot, é porque
        você esqueceu de criar o symlink <code>$LFS/bin/sh -&gt; bash</code>
        ou o Bash temporário não foi instalado em <code>$LFS/usr/bin</code>.
        Sintoma: <code>chroot: failed to run command '/bin/bash':
        No such file or directory</code>.
      </AlertBox>

      <AlertBox type="success" title="Roda dentro de tmux/screen">
        Sessões longas dentro do chroot quebram se sua conexão SSH
        cai. Sempre rode dentro de <code>tmux</code> ou
        <code> screen</code> — você reconecta e o build continua.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="bash"
        code={`# Entrar:
chroot "$LFS" /usr/bin/env -i HOME=/root TERM="$TERM" \\
    PS1='(lfs chroot) \\u:\\w\\$ ' PATH=/usr/bin:/usr/sbin \\
    MAKEFLAGS="-j$(nproc)" /bin/bash --login

# Re-entrar (depois de reboot do host):
# 1. mount $LFS_DEV /mnt/lfs
# 2. remontar /dev /proc /sys /run /dev/pts
# 3. chroot ... (mesmo comando)

# Sair:
exit && umount -R $LFS/{dev,proc,sys,run}`}
      />
    </PageContainer>
  );
}

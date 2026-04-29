import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function UsuarioLFS() {
  return (
    <PageContainer
      title="Criando o Usuário lfs"
      subtitle="Construir a toolchain temporária como root é arriscado. Vamos criar um usuário dedicado e não-privilegiado."
      difficulty="iniciante"
      timeToRead="4 min"
    >
      <h2>Criando o usuário</h2>
      <CodeBlock
        language="bash"
        code={`sudo groupadd lfs
sudo useradd -s /bin/bash -g lfs -m -k /dev/null lfs
sudo passwd lfs   # define uma senha`}
      />
      <p>Explicação dos flags:</p>
      <ul>
        <li><code>-s /bin/bash</code> — shell padrão.</li>
        <li><code>-g lfs</code> — grupo primário <code>lfs</code>.</li>
        <li><code>-m</code> — cria <code>/home/lfs</code>.</li>
        <li><code>-k /dev/null</code> — não copia arquivos de skel (nada de <code>~/.bashrc</code> herdado do host).</li>
      </ul>

      <h2>Dando posse de <code>$LFS</code> ao usuário</h2>
      <CodeBlock
        language="bash"
        code={`sudo chown -v lfs $LFS/sources
sudo chown -v lfs $LFS

# se você criou /tools antes (alguns capítulos pedem):
# sudo mkdir -pv $LFS/tools
# sudo chown -v lfs $LFS/tools`}
      />

      <h2>Logando como usuário <code>lfs</code></h2>
      <CodeBlock
        language="bash"
        code={`su - lfs

# o "-" garante shell de login limpo (sem variáveis herdadas do root)`}
      />

      <AlertBox type="warning" title="A partir de agora, fique como lfs">
        Toda a construção da toolchain temporária é feita como <code>lfs</code>.
        Só volte a ser root quando o livro mandar (chown final, chroot etc.).
      </AlertBox>

      <h2>Verificando que está mesmo como <code>lfs</code></h2>
      <CodeBlock
        language="bash"
        code={`whoami
# lfs

id
# uid=1001(lfs) gid=1001(lfs) groups=1001(lfs)`}
      />

      <p>
        Vá agora para <a href="#/ambiente-lfs">Variáveis de Ambiente</a> e
        configure o <code>~/.bash_profile</code> e <code>~/.bashrc</code> do
        usuário <code>lfs</code>.
      </p>
    </PageContainer>
  );
}

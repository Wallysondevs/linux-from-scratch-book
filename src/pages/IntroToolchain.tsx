import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function IntroToolchain() {
  return (
    <PageContainer
      title="Introdução à Toolchain Cross-Compilada"
      subtitle="Por que construir o GCC duas vezes (Pass 1 e Pass 2) e o que cada uma significa."
      difficulty="avancado"
      timeToRead="8 min"
    >
      <h2>O problema que estamos resolvendo</h2>
      <p>
        Queremos um sistema final 100% independente do host. Mas o único
        compilador disponível no início é o do host. Se compilássemos a Glibc
        diretamente com o GCC do host, ela ficaria ligada às bibliotecas do
        host. Quando déssemos boot no LFS, nada funcionaria.
      </p>

      <h2>A solução: cross-compilation</h2>
      <p>
        Construímos primeiro uma toolchain <strong>cross</strong>: um GCC que{" "}
        <em>roda</em> no host, mas que <em>gera binários</em> para um alvo
        chamado <code>x86_64-lfs-linux-gnu</code>. Esse alvo é "fictício" —
        sintaticamente diferente do host (<code>x86_64-pc-linux-gnu</code>),
        mas binariamente idêntico.
      </p>

      <CodeBlock
        language="text"
        code={`HOST: x86_64-pc-linux-gnu
ALVO: x86_64-lfs-linux-gnu

Mesmas instruções de CPU, mesmo formato ELF.
Mas o linker é diferente, o specs é diferente:
binários do alvo NÃO veem libs do host.`}
      />

      <h2>Pass 1 (cross-compiler)</h2>
      <p>
        Aqui construímos:
      </p>
      <ol>
        <li><strong>Binutils Pass 1</strong> — assembler/linker para o alvo.</li>
        <li><strong>GCC Pass 1</strong> — compilador C que cria binários para o alvo.</li>
        <li><strong>Linux API Headers</strong> — headers do kernel para o alvo.</li>
        <li><strong>Glibc</strong> — a libc do alvo. <em>Esta</em> é a Glibc que vai sobreviver.</li>
        <li><strong>Libstdc++ from GCC</strong> — biblioteca C++ ligada à nova Glibc.</li>
      </ol>

      <h2>Pass 2 (native cross-compiler)</h2>
      <p>
        Com o GCC Pass 1 funcional, construímos as <strong>ferramentas
        temporárias</strong> (m4, ncurses, bash, coreutils, etc.) — todas
        compiladas <em>contra a Glibc nova</em>. Em seguida:
      </p>
      <ol>
        <li><strong>Binutils Pass 2</strong> — agora compilado pelo GCC Pass 1.</li>
        <li><strong>GCC Pass 2</strong> — também recompilado.</li>
      </ol>
      <p>
        O resultado é uma toolchain "nativa do alvo" rodando dentro de{" "}
        <code>/mnt/lfs/tools</code>, capaz de compilar tudo o que vem dentro do
        chroot sem nenhum vestígio do host.
      </p>

      <AlertBox type="info" title="Resumo intuitivo">
        Pass 1 = "GCC do host fala uma língua nova". Pass 2 = "GCC fala
        a língua nova nativamente". Depois, dentro do chroot, esquecemos o
        host completamente.
      </AlertBox>

      <h2>Diretório de instalação</h2>
      <p>
        Toda a toolchain temporária vai para <code>$LFS/tools</code>:
      </p>
      <CodeBlock
        language="bash"
        code={`# como root no host:
mkdir -pv $LFS/{etc,var} $LFS/usr/{bin,lib,sbin}
for i in bin lib sbin; do
  ln -sv usr/$i $LFS/$i
done
case $(uname -m) in
  x86_64) mkdir -pv $LFS/lib64 ;;
esac
mkdir -pv $LFS/tools
chown -v lfs $LFS/{usr{,/*},lib,var,etc,bin,sbin,tools}
case $(uname -m) in
  x86_64) chown -v lfs $LFS/lib64 ;;
esac

# volta para o usuário lfs:
su - lfs`}
      />

      <p>
        Pronto para começar. Vá para{" "}
        <a href="#/binutils-pass1">Binutils — Pass 1</a>.
      </p>
    </PageContainer>
  );
}

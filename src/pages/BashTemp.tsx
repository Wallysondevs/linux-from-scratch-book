import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { PracticeBox } from "@/components/ui/PracticeBox";

export default function BashTemp() {
  return (
    <PageContainer
      title="Bash — Pacote temporário"
      subtitle="O shell padrão do LFS. Aqui montamos a versão cross-compilada que será usada dentro do chroot até o build final."
      difficulty="intermediario"
      timeToRead="7 min"
    >
      <h2>Por que Bash temporário?</h2>
      <p>
        Quando entrarmos no chroot, o sistema não terá mais acesso aos
        binários do host. Precisamos de um shell funcional que rode com
        a Glibc temporária recém-instalada — caso contrário, nem
        <code> ./configure </code> nem <code>make</code> conseguem ser
        executados. Bash 5.3 é a versão coberta no LFS 12.4.
      </p>

      <AlertBox type="info" title="Bash vs Dash vs Ash">
        Algumas distros (Debian) usam <code>dash</code> como
        <code> /bin/sh</code> por velocidade. O LFS exige bash em ambos
        os caminhos (<code>/bin/sh</code> e <code>/bin/bash</code>) porque
        muitos scripts <code>configure</code> dependem de bashismos
        sutis (arrays associativos, <code>[[ ]]</code>, etc.).
      </AlertBox>

      <h2>Build</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf bash-5.3.tar.gz
cd bash-5.3

./configure --prefix=/usr                      \\
            --build=$(sh support/config.guess) \\
            --host=$LFS_TGT                    \\
            --without-bash-malloc

make
make DESTDIR=$LFS install

# Symlink padrão sh -> bash (POSIX)
ln -sv bash $LFS/bin/sh

cd $LFS/sources
rm -rf bash-5.3`}
      />

      <h2>Anatomia das flags</h2>
      <ul>
        <li><code>--without-bash-malloc</code> — desabilita o alocador interno do bash. O alocador do bash é antigo e tem bugs de alinhamento em x86_64; usar o malloc da Glibc é mais seguro e rápido.</li>
        <li><code>--host=$LFS_TGT</code> — cross-compilação: o binário roda na tripla LFS, não no host.</li>
        <li><code>ln -sv bash sh</code> — POSIX exige <code>/bin/sh</code>. Sem o symlink, scripts <code>#!/bin/sh</code> falham no chroot.</li>
      </ul>

      <h2>Casos práticos</h2>
      <CodeBlock
        language="bash"
        code={`# Confirmar arquitetura cross:
file $LFS/usr/bin/bash
# ELF 64-bit LSB executable, x86-64 ... dynamically linked,
# interpreter /lib64/ld-linux-x86-64.so.2

# Listar símbolos não-resolvidos (devem todos vir da Glibc temporária):
$LFS_TGT-readelf -d $LFS/usr/bin/bash | grep NEEDED

# Verificar versão dentro do chroot (depois):
bash --version
echo $BASH_VERSION`}
      />

      <PracticeBox title="Garantir o /bin/sh apontando para bash">
        <ol className="list-decimal ml-5 space-y-1">
          <li>Rode <code>ls -la $LFS/bin/sh</code> — deve ser symlink <code>sh -&gt; bash</code>.</li>
          <li>Se faltar, recrie: <code>ln -sfv bash $LFS/bin/sh</code>.</li>
          <li>Teste com um script POSIX simples: <code>echo '#!/bin/sh{'\n'}echo ok' &gt; /tmp/t.sh && chmod +x /tmp/t.sh && chroot $LFS /tmp/t.sh</code> (depois do chroot estar preparado).</li>
        </ol>
      </PracticeBox>

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Esquecer o symlink sh">
        Sem <code>/bin/sh</code>, o primeiro <code>./configure</code>
        no chroot trava com <code>/bin/sh: No such file or directory</code>.
        É o erro mais comum — sempre cheque depois do install.
      </AlertBox>

      <AlertBox type="danger" title="Misturar bash do host com Glibc do alvo">
        Se você acidentalmente rodar <code>/usr/bin/bash</code> do host
        dentro do chroot (via PATH errado), ele vai linkar contra a
        Glibc temporária e segfaultar imediatamente. Sintoma:
        <code> Segmentation fault (core dumped) </code> no segundo
        comando depois do <code>chroot</code>.
      </AlertBox>

      <AlertBox type="success" title="Histórico desabilitado no chroot">
        Por padrão o bash do chroot não tem <code>~/.bash_history</code>
        persistente. Para depurar, exporte
        <code> HISTFILE=/tmp/lfs-history </code> antes de cada sessão.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="bash"
        code={`# Tempo: ~0.5 SBU (~30s)
# Tarball: bash-5.3.tar.gz (~11 MB)
# Pós-instalação obrigatória: ln -sv bash $LFS/bin/sh
# Validação: $LFS/usr/bin/bash --version | head -1
#            file $LFS/usr/bin/bash | grep "ELF 64-bit"`}
      />
    </PageContainer>
  );
}

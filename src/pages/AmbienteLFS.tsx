import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function AmbienteLFS() {
  return (
    <PageContainer
      title="Variáveis de Ambiente do Usuário lfs"
      subtitle="Configure ~/.bash_profile e ~/.bashrc para um shell limpo, previsível e isolado do host."
      difficulty="intermediario"
      timeToRead="6 min"
    >
      <h2>Por que isolar o ambiente?</h2>
      <p>
        Variáveis como <code>CFLAGS</code>, <code>LDFLAGS</code>, <code>PATH</code>{" "}
        herdadas do host podem contaminar a build da toolchain — resultando em
        binários que não funcionam fora do host. Vamos zerar tudo.
      </p>

      <h2><code>~/.bash_profile</code></h2>
      <CodeBlock
        language="bash"
        code={`cat > ~/.bash_profile << "EOF"
exec env -i HOME=$HOME TERM=$TERM PS1='\\u:\\w\\$ ' /bin/bash
EOF`}
      />
      <p>
        O <code>env -i</code> apaga todas as variáveis e chama bash de novo,
        garantindo um shell completamente vazio.
      </p>

      <h2><code>~/.bashrc</code></h2>
      <CodeBlock
        language="bash"
        code={`cat > ~/.bashrc << "EOF"
set +h
umask 022
LFS=/mnt/lfs
LC_ALL=POSIX
LFS_TGT=$(uname -m)-lfs-linux-gnu
PATH=/usr/bin
if [ ! -L /bin ]; then PATH=/bin:$PATH; fi
PATH=$LFS/tools/bin:$PATH
CONFIG_SITE=$LFS/usr/share/config.site
export LFS LC_ALL LFS_TGT PATH CONFIG_SITE
EOF`}
      />

      <h3>Linha por linha</h3>
      <ul>
        <li><code>set +h</code> — desliga o cache de comandos do bash, evitando que ele "lembre" de binários antigos do host.</li>
        <li><code>umask 022</code> — arquivos novos saem como <code>644</code>, diretórios <code>755</code>.</li>
        <li><code>LFS=/mnt/lfs</code> — atalho onipresente.</li>
        <li><code>LC_ALL=POSIX</code> — locale padronizado, evita warnings de tradução.</li>
        <li><code>LFS_TGT=$(uname -m)-lfs-linux-gnu</code> — triplet alvo da toolchain. Em x86_64 vira <code>x86_64-lfs-linux-gnu</code>.</li>
        <li><code>PATH=/usr/bin</code> + ajustes — só os binários estritamente necessários, com a toolchain LFS na frente assim que ela existir.</li>
        <li><code>CONFIG_SITE</code> — desliga arquivos site-config do host.</li>
      </ul>

      <h2>Aplicando</h2>
      <CodeBlock
        language="bash"
        code={`source ~/.bash_profile

# verificando:
echo $LFS $LFS_TGT
# /mnt/lfs x86_64-lfs-linux-gnu

echo $PATH
# /mnt/lfs/tools/bin:/bin:/usr/bin (mais ou menos)`}
      />

      <AlertBox type="warning" title="Sempre source antes de continuar">
        Toda vez que abrir um novo terminal como <code>lfs</code>, faça{" "}
        <code>source ~/.bash_profile</code>. Sem isso, comandos vão pegar
        binários do host.
      </AlertBox>

      <h2>Make paralelo (opcional, mas recomendado)</h2>
      <p>
        Para acelerar drasticamente as builds, configure <code>MAKEFLAGS</code>{" "}
        para usar todos os cores da CPU:
      </p>
      <CodeBlock
        language="bash"
        code={`echo "export MAKEFLAGS=-j$(nproc)" >> ~/.bashrc

# ou um número específico, ex.: -j4
# echo "export MAKEFLAGS=-j4" >> ~/.bashrc`}
      />

      <AlertBox type="info" title="Cuidado: alguns make tests não toleram -j">
        Para test suites, o livro vai pedir para forçar <code>make -j1 check</code>{" "}
        em alguns casos. Quando aparecer no livro, obedeça.
      </AlertBox>
    </PageContainer>
  );
}

import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Convencoes() {
  return (
    <PageContainer
      title="Tipografia & Convenções"
      subtitle="Como ler os comandos do livro sem confundir o usuário, o terminal ou o ambiente."
      difficulty="iniciante"
      timeToRead="4 min"
    >
      <h2>Os três contextos de execução</h2>
      <p>O livro alterna entre três contextos. Saber em qual você está é vital.</p>

      <h3>1. Como root no host</h3>
      <p>
        Comandos que afetam o sistema host (particionar, criar usuário, montar).
        Geralmente prefixados com <code>sudo</code>:
      </p>
      <CodeBlock
        language="bash"
        code={`sudo parted /dev/sdb
sudo mkfs.ext4 /dev/sdb1
sudo mkdir -pv /mnt/lfs`}
      />

      <h3>2. Como usuário <code>lfs</code> (dentro do host)</h3>
      <p>
        Para construir a toolchain temporária, você cria um usuário <code>lfs</code>{" "}
        sem privilégios. <strong>Sempre verifique</strong> o prompt:
      </p>
      <CodeBlock
        language="bash"
        code={`# prompt típico do usuário lfs
lfs:~$ cd $LFS/sources
lfs:/mnt/lfs/sources$ tar -xf binutils-2.42.tar.xz`}
      />

      <h3>3. Dentro do chroot</h3>
      <p>
        Após entrar em chroot, você é <code>root</code> dentro do ambiente LFS,
        completamente isolado do host. O prompt do livro fica <code>(lfs chroot) #</code>:
      </p>
      <CodeBlock
        language="bash"
        code={`(lfs chroot) # cd /sources
(lfs chroot) # tar -xf glibc-2.40.tar.xz`}
      />

      <AlertBox type="warning" title="Confunde tudo?">
        Use prompts diferentes (cores, nome de host) para cada VM/chroot. Veja
        no capítulo <a href="#/ambiente-lfs">Variáveis de Ambiente</a> como
        configurar o <code>PS1</code>.
      </AlertBox>

      <h2>Caminhos absolutos vs relativos</h2>
      <p>
        Caminhos como <code>/mnt/lfs/sources</code> são absolutos. Caminhos como{" "}
        <code>../patches</code> ou <code>../binutils-build</code> são relativos
        — sempre dependem do <code>pwd</code> atual. Releia "para onde o livro
        mandou você ir antes de digitar o próximo comando".
      </p>

      <h2>A variável <code>$LFS</code></h2>
      <p>
        O livro usa <code>$LFS</code> em quase todo lugar como sinônimo de{" "}
        <code>/mnt/lfs</code>. Antes de qualquer trabalho, defina-a:
      </p>
      <CodeBlock language="bash" code={`export LFS=/mnt/lfs`} />
      <p>
        Faça isso em todo terminal novo, ou coloque no <code>~/.bashrc</code> do
        usuário <code>lfs</code> e do <code>root</code>.
      </p>

      <h2>Versões dos pacotes</h2>
      <p>
        Exemplos do livro usam versões como <code>binutils-2.42</code>,{" "}
        <code>gcc-14.2.0</code>, <code>glibc-2.40</code>. Quando você baixar, as
        versões podem ser <em>maiores</em>. Adapte os comandos. Use{" "}
        <code>tar tf arquivo.tar.xz | head</code> para ver o nome real do
        diretório extraído.
      </p>

      <h2>Marcações visuais neste livro</h2>
      <ul>
        <li><strong>Caixa azul (info)</strong> — explicação adicional, sem urgência.</li>
        <li><strong>Caixa amarela (warning)</strong> — atenção redobrada, mas não destrutivo.</li>
        <li><strong>Caixa vermelha (danger)</strong> — risco real de quebrar algo. Pare e leia duas vezes.</li>
        <li><strong>Caixa verde (success)</strong> — confirmação de progresso ou dica boa.</li>
      </ul>
    </PageContainer>
  );
}

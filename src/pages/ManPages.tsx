import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { PracticeBox } from "@/components/ui/PracticeBox";

export default function ManPages() {
  return (
    <PageContainer
      title="Man-Pages"
      subtitle="A documentação canônica do Linux: chamadas de sistema, funções da libc, formatos de arquivo, protocolos. ~2.000 páginas instaladas em /usr/share/man."
      difficulty="iniciante"
      timeToRead="4 min"
    >
      <h2>O que é o pacote man-pages?</h2>
      <p>
        Não confunda com o programa <code>man</code> (que vem do
        <code> man-db</code>). O pacote <strong>man-pages</strong> é
        só o conteúdo: páginas das seções 2 (syscalls), 3 (libc),
        4 (devices), 5 (file formats), 7 (overview) e 8 (admin).
        Mantido pelo Michael Kerrisk e atualizado constantemente.
      </p>

      <AlertBox type="info" title="Seções do man">
        <ul>
          <li><strong>1</strong> — comandos de usuário (<code>ls</code>, <code>grep</code>)</li>
          <li><strong>2</strong> — chamadas de sistema (<code>open</code>, <code>fork</code>)</li>
          <li><strong>3</strong> — funções de biblioteca (<code>printf</code>, <code>malloc</code>)</li>
          <li><strong>4</strong> — devices em <code>/dev</code></li>
          <li><strong>5</strong> — formatos de arquivo (<code>passwd</code>, <code>fstab</code>)</li>
          <li><strong>7</strong> — visões gerais (<code>signal</code>, <code>tcp</code>)</li>
          <li><strong>8</strong> — administração (<code>mount</code>, <code>iptables</code>)</li>
        </ul>
      </AlertBox>

      <h2>Build (dentro do chroot)</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf man-pages-6.16.tar.xz
cd man-pages-6.16

# Remove páginas que conflitam com outros pacotes:
rm -v man3/crypt*

make prefix=/usr install

cd /sources
rm -rf man-pages-6.16`}
      />

      <h2>Por que remover crypt?</h2>
      <p>
        As páginas <code>crypt(3)</code> e <code>crypt_r(3)</code>
        do man-pages descrevem a versão clássica da glibc — que foi
        movida para <code>libxcrypt</code>. Manter as duas gera
        documentação contraditória. O LFS sempre prioriza a página
        do pacote dono da função.
      </p>

      <h2>Casos práticos</h2>
      <CodeBlock
        language="bash"
        code={`# Conferir quantas páginas foram instaladas:
find /usr/share/man -type f | wc -l
# ~2.000

# Ler uma syscall:
man 2 open
man 2 fork

# Ler formato de arquivo:
man 5 fstab
man 5 passwd

# Buscar por palavra-chave (precisa de mandb instalado):
apropos socket | head

# Ver todas as seções de um nome:
man -aw signal
# /usr/share/man/man2/signal.2.gz
# /usr/share/man/man7/signal.7.gz`}
      />

      <PracticeBox title="Explorar a documentação canônica">
        <ol className="list-decimal ml-5 space-y-1">
          <li><code>man 7 capabilities</code> — visão geral do sistema de capacidades Linux.</li>
          <li><code>man 5 proc</code> — referência completa de <code>/proc</code> (gigantesca, ~6.000 linhas).</li>
          <li><code>man 7 signal-safety</code> — funções seguras em handler de sinal.</li>
          <li><code>man 2 epoll_ctl</code> — base de Nginx, Node.js, etc.</li>
        </ol>
      </PracticeBox>

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title='"man: command not found" depois do install'>
        Você instalou o <em>conteúdo</em>, mas não o leitor. O programa
        <code> man </code> vem do pacote <code>man-db</code>, instalado
        mais tarde no LFS. Até lá, leia direto: <code>zcat
        /usr/share/man/man2/open.2.gz | less</code>.
      </AlertBox>

      <AlertBox type="success" title="Página de manual em PDF">
        Para gerar PDF de uma página: <code>man -t open | ps2pdf -
        open.pdf</code>. Útil para imprimir referência de syscalls
        complexas.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="bash"
        code={`# Tempo: ~0.05 SBU
# Tarball: man-pages-6.16.tar.xz (~3 MB)
# Pré-install: rm -v man3/crypt*
# Comando único: make prefix=/usr install
# Sem teste suite (é só conteúdo)
# Programa leitor (man-db) instalado depois`}
      />
    </PageContainer>
  );
}

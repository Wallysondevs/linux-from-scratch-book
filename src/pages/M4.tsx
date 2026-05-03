import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { PracticeBox } from "@/components/ui/PracticeBox";

export default function M4() {
  return (
    <PageContainer
      title="M4 — Pacote temporário"
      subtitle="Processador de macros usado por Autoconf, Bison, Sendmail e dezenas de outros utilitários. Pequeno, rápido e silencioso."
      difficulty="intermediario"
      timeToRead="6 min"
    >
      <h2>O que é o M4?</h2>
      <p>
        M4 é uma linguagem de macros — você escreve um arquivo de texto com
        marcadores como <code>define(NOME, valor)</code> e ele substitui tudo
        em uma passada. É o "pré-processador de propósito geral" do Unix,
        criado nos anos 1970 e ainda fundamental porque o <code>autoconf</code>
        é, na prática, um conjunto enorme de macros M4 que geram scripts shell.
      </p>

      <AlertBox type="info" title="Por que M4 entra cedo no toolchain temporário?">
        Bison, Flex, Perl e o próprio Autoconf chamam <code>m4</code> em
        tempo de build. Se você instalar M4 só no final, vários pacotes
        falham com mensagens criptografadas tipo <code>m4: command not
        found</code> ou erros de sintaxe em arquivos <code>.m4</code>.
      </AlertBox>

      <h2>Sequência de build</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf m4-1.4.20.tar.xz
cd m4-1.4.20

./configure --prefix=/usr   \\
            --host=$LFS_TGT \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd $LFS/sources
rm -rf m4-1.4.20`}
      />

      <h2>Anatomia das flags</h2>
      <ul>
        <li><code>--prefix=/usr</code> — caminho onde o binário <em>aparentará</em> estar instalado dentro do sistema final.</li>
        <li><code>--host=$LFS_TGT</code> — diz ao configure que estamos cross-compilando para a tripla LFS (ex.: <code>x86_64-lfs-linux-gnu</code>).</li>
        <li><code>--build=$(build-aux/config.guess)</code> — descobre automaticamente a tripla da máquina hospedeira.</li>
        <li><code>DESTDIR=$LFS</code> — joga os arquivos em <code>$LFS/usr/bin</code> em vez de <code>/usr/bin</code> do host. Sem isso você corromperia o sistema do host.</li>
      </ul>

      <h2>Casos práticos</h2>
      <CodeBlock
        language="bash"
        code={`# Ver o que foi instalado:
ls -l $LFS/usr/bin/m4

# Smoke test com um macro trivial:
echo 'define(SAUDAR, \\\`Ola, $1!\\\`)SAUDAR(LFS)' | $LFS/usr/bin/m4
# saída esperada: Ola, LFS!`}
      />

      <PracticeBox title="Validar o m4 cross-compilado">
        <ol className="list-decimal ml-5 space-y-1">
          <li>Confirme a arquitetura: <code>file $LFS/usr/bin/m4</code> deve mostrar <code>ELF 64-bit ... x86-64</code>.</li>
          <li>Rode <code>$LFS/usr/bin/m4 --version</code> — versão deve casar com o tarball (1.4.20).</li>
          <li>Salve a saída do smoke test acima em <code>~/lfs-checks/m4.log</code> para conferir depois do chroot.</li>
        </ol>
      </PracticeBox>

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Não use o m4 do host depois desse passo">
        Se você esquecer de exportar <code>PATH=$LFS/tools/bin:$PATH</code>,
        o <code>make</code> dos próximos pacotes vai chamar o <code>m4</code>
        do Debian/Ubuntu/Fedora hospedeiro — gerando binários com símbolos
        contaminados pela libc do host. Sempre cheque <code>which m4</code>
        antes de seguir.
      </AlertBox>

      <AlertBox type="danger" title="Permissões de DESTDIR">
        Rodar <code>make DESTDIR=$LFS install</code> como usuário comum
        falha com <code>Permission denied</code> se <code>$LFS</code>
        ainda for de root. Verifique <code>chown -R lfs:lfs $LFS</code>
        antes do estágio temporário.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="bash"
        code={`# Tempo aproximado: 0.1 SBU (~5s em CPU moderna)
# Tarball: m4-1.4.20.tar.xz (~1.5 MB)
# Dependências: nenhuma (build é self-contained)
# Símbolo de validação: m4 --version | head -1`}
      />
    </PageContainer>
  );
}

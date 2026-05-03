import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { PracticeBox } from "@/components/ui/PracticeBox";

export default function ChangingOwnership() {
  return (
    <PageContainer
      title="Mudando o dono dos arquivos"
      subtitle="Antes de entrar no chroot, todos os arquivos do toolchain temporário precisam pertencer a root. Esse é o ponto de virada entre o usuário lfs e o ambiente isolado."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Por que mudar o dono?</h2>
      <p>
        Até aqui você construiu o toolchain como o usuário <code>lfs</code>
        (sem privilégios). Isso evitou desastres no host. Mas o chroot
        precisa que todos os arquivos sejam de <code>root:root</code> —
        senão o <code>install</code> dos próximos pacotes falha com
        <code> Permission denied </code> e binários setuid (sudo, ping)
        não funcionam corretamente.
      </p>

      <AlertBox type="info" title="UID 0 no chroot ≠ UID 0 no host">
        Dentro do chroot, root é o UID 0 daquele namespace. Como você
        vai entrar no chroot a partir de uma sessão root do host,
        os UIDs coincidem — por isso a transferência de propriedade
        é direta.
      </AlertBox>

      <h2>Comando único</h2>
      <CodeBlock
        language="bash"
        code={`# IMPORTANTE: rode como root no host (não como lfs)
exit   # se ainda estiver na shell do usuário lfs
sudo -i

chown -R root:root $LFS/{usr,lib,var,etc,bin,sbin,tools}

case $(uname -m) in
  x86_64) chown -R root:root $LFS/lib64 ;;
esac`}
      />

      <h2>O que cada parte faz</h2>
      <ul>
        <li><code>chown -R root:root</code> — recursivo, muda dono e grupo.</li>
        <li>O brace expansion <code>{`{usr,lib,var,etc,bin,sbin,tools}`}</code> alcança apenas os diretórios que você mesmo criou. Não toca em <code>$LFS/sources</code> nem em <code>$LFS/home/lfs</code>.</li>
        <li>O <code>case</code> trata multilib em x86_64 — onde existe um <code>$LFS/lib64</code> separado.</li>
      </ul>

      <h2>Casos práticos de verificação</h2>
      <CodeBlock
        language="bash"
        code={`# Auditar dono antes de entrar no chroot:
find $LFS/usr -not -user root -ls | head -20
find $LFS/usr -not -group root -ls | head -20

# Se aparecer qualquer arquivo do usuário lfs, o chown falhou.
# Esperado: nenhuma saída.

# Conferir tamanho do toolchain temporário:
du -sh $LFS/{usr,lib,var,etc,bin,sbin,tools}`}
      />

      <PracticeBox title="Checklist antes do chroot">
        <ol className="list-decimal ml-5 space-y-1">
          <li>Saiu da shell do usuário <code>lfs</code>?</li>
          <li>Está logado como <code>root</code> no host?</li>
          <li><code>echo $LFS</code> ainda retorna <code>/mnt/lfs</code>? (Variável é por shell — re-exporte se necessário.)</li>
          <li><code>find $LFS -not -user root -not -path '$LFS/sources/*' -not -path '$LFS/home/*'</code> não traz nada.</li>
          <li>Tamanho razoável: 1.0–1.4 GB no toolchain temporário.</li>
        </ol>
      </PracticeBox>

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="Esquecer de re-exportar $LFS como root">
        Quando você faz <code>sudo -i</code>, o ambiente é resetado.
        Se <code>$LFS</code> não estiver no <code>~/.bashrc</code> do
        root, o <code>chown $LFS/{`{...}`}</code> vira <code>chown
        /{`{...}`}</code> — e você acabou de quebrar seu host.
        Sempre faça <code>echo $LFS</code> antes do chown.
      </AlertBox>

      <AlertBox type="danger" title="chown -R / por engano">
        Se <code>$LFS</code> estiver vazio ou indefinido, o comando
        vira <code>chown -R root:root /usr /lib ...</code> no host.
        Sintoma: usuário comum perde acesso ao <code>sudo</code>,
        SSH chaves quebram, sistema vira tijolo. Recuperação:
        boot por live USB e reverter via <code>chown</code>
        massivo — ou reinstalar.
      </AlertBox>

      <AlertBox type="success" title="Snapshot antes do chroot">
        Esse é um ótimo momento para fazer um snapshot/backup de
        <code> $LFS</code>. Se algo der errado dentro do chroot,
        você restaura o tarball em vez de refazer 6 horas de
        toolchain.
        <CodeBlock
          language="bash"
          code={`cd $LFS/..
tar -cf lfs-pre-chroot.tar lfs/
# ~1.2 GB sem compressão, ~400 MB com gzip`}
        />
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="bash"
        code={`# Pré-requisito: ter saído da shell do usuário lfs
# Privilégio: root
# Tempo: < 30s
# Validação: find $LFS -not -user root | wc -l → 0
#            (excluindo $LFS/sources e $LFS/home)`}
      />
    </PageContainer>
  );
}

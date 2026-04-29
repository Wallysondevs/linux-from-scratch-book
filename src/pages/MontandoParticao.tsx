import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function MontandoParticao() {
  return (
    <PageContainer
      title="Montando a Partição do LFS"
      subtitle="Crie /mnt/lfs e monte o sistema de arquivos para começar a trabalhar."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>Criando o ponto de montagem</h2>
      <CodeBlock
        language="bash"
        code={`export LFS=/mnt/lfs
sudo mkdir -pv $LFS`}
      />

      <h2>Montando</h2>
      <CodeBlock
        language="bash"
        code={`sudo mount -v -t ext4 /dev/sdb1 $LFS

# confirme:
mount | grep $LFS
df -h $LFS`}
      />

      <h2>Permitindo escrita ao usuário <code>lfs</code> (depois)</h2>
      <p>
        Em capítulos seguintes você vai criar um usuário <code>lfs</code>. Para
        ele poder escrever em <code>$LFS</code>, vamos configurar a posse mais
        adiante. Por enquanto, fica como root.
      </p>

      <AlertBox type="warning" title="Cuidado ao desligar / reiniciar o host">
        Antes de desligar o host (ou de mudar de sessão), <strong>desmonte</strong>{" "}
        a partição com <code>sudo umount $LFS</code>. Se você esquecer e voltar
        depois, basta remontar — mas certifique-se de não estar usando arquivos
        nela.
      </AlertBox>

      <h2>Para remontar em sessões futuras</h2>
      <CodeBlock
        language="bash"
        code={`export LFS=/mnt/lfs
sudo mount /dev/sdb1 $LFS

# se montou swap antes:
sudo swapon /dev/sdb2`}
      />

      <h2>Sugestão: linha no <code>/etc/fstab</code> do host</h2>
      <p>
        Para automatizar a remontagem, adicione (com cuidado!) uma linha ao{" "}
        <code>/etc/fstab</code> do host. Use <code>noauto</code> para evitar
        montagem automática no boot:
      </p>
      <CodeBlock
        language="text"
        code={`# /etc/fstab do HOST (não do LFS!)
LABEL=LFS  /mnt/lfs  ext4  defaults,noauto  0  0`}
      />
      <p>
        Agora basta <code>sudo mount /mnt/lfs</code> em qualquer terminal do
        host.
      </p>
    </PageContainer>
  );
}

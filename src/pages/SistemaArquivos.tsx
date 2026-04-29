import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function SistemaArquivos() {
  return (
    <PageContainer
      title="Sistema de Arquivos do LFS"
      subtitle="Por que ext4, e que outras escolhas existem para a partição do LFS."
      difficulty="iniciante"
      timeToRead="4 min"
    >
      <h2>Por que ext4 por padrão?</h2>
      <ul>
        <li>Suporte universal — qualquer kernel Linux moderno lê/escreve.</li>
        <li>Estável, com journaling, fsck robusto.</li>
        <li>Fácil de criar: <code>mkfs.ext4</code> sem opções extras já basta.</li>
        <li>O GRUB lê ext4 sem complicação.</li>
      </ul>

      <h2>Outras opções viáveis</h2>
      <ul>
        <li>
          <strong>xfs</strong> — ótimo para arquivos grandes; performance
          excelente; não tem shrink fácil. <code>mkfs.xfs /dev/sdb1</code>.
        </li>
        <li>
          <strong>btrfs</strong> — snapshots, subvolumes, RAID interno.
          Mais complexo; bom para usuário experiente. <code>mkfs.btrfs /dev/sdb1</code>.
        </li>
        <li>
          <strong>f2fs</strong> — pensado para flash/SSDs.
        </li>
      </ul>

      <AlertBox type="info" title="Recomendação para a primeira leitura">
        Use <code>ext4</code>. É o que o livro oficial documenta, é o que tem
        menos surpresas e é o que o GRUB e o kernel padrão suportam sem
        configuração adicional.
      </AlertBox>

      <h2>Criando a partição com label</h2>
      <p>
        Adicionar um label facilita identificar a partição no <code>fstab</code>{" "}
        e em <code>blkid</code>:
      </p>
      <CodeBlock
        language="bash"
        code={`sudo mkfs.ext4 -L LFS /dev/sdb1
blkid /dev/sdb1
# /dev/sdb1: LABEL="LFS" UUID="..." TYPE="ext4"`}
      />

      <h2>Swap</h2>
      <p>
        Se sua RAM for menor que 8 GB, considere ter swap. Pode ser uma partição
        ou um arquivo:
      </p>
      <CodeBlock
        language="bash"
        code={`# como partição
sudo mkswap /dev/sdb2
sudo swapon /dev/sdb2

# ou como arquivo (quando tudo já estiver montado)
sudo dd if=/dev/zero of=/swapfile bs=1M count=2048 status=progress
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile`}
      />
    </PageContainer>
  );
}

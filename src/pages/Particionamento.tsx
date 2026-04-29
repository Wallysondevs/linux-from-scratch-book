import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Particionamento() {
  return (
    <PageContainer
      title="Particionamento"
      subtitle="Crie uma partição dedicada (ou disco virtual) para o LFS. Cuidado redobrado aqui."
      difficulty="intermediario"
      timeToRead="8 min"
    >
      <AlertBox type="danger" title="LEIA antes de digitar">
        Particionar o disco errado APAGA TUDO. Antes de cada comando, confira{" "}
        <code>lsblk</code> ou <code>fdisk -l</code> e tenha certeza absoluta do
        nome do dispositivo. Se possível, desconecte fisicamente outros HDs/SSDs.
      </AlertBox>

      <h2>Identificando o disco</h2>
      <CodeBlock
        language="bash"
        code={`lsblk
# saida tipica:
# NAME   MAJ:MIN RM   SIZE RO TYPE MOUNTPOINTS
# sda      8:0    0   500G  0 disk
# ├─sda1   8:1    0     1G  0 part /boot/efi
# └─sda2   8:2    0   499G  0 part /
# sdb      8:16   0    60G  0 disk    <-- vamos usar esse para LFS`}
      />

      <h2>Tamanhos sugeridos</h2>
      <ul>
        <li><strong>LFS root (/)</strong> — 30 GB no mínimo (é onde tudo vai morar)</li>
        <li><strong>swap</strong> — 2 a 4 GB se sua RAM for &lt; 8 GB; opcional acima disso</li>
      </ul>

      <h2>Particionando com <code>parted</code></h2>
      <p>Exemplo usando <code>/dev/sdb</code> (substitua pelo seu disco):</p>
      <CodeBlock
        language="bash"
        code={`sudo parted /dev/sdb

# dentro do parted:
(parted) mklabel gpt
(parted) mkpart primary ext4 1MiB 100%
(parted) set 1 boot on
(parted) print
(parted) quit`}
      />

      <h2>Formatando como ext4</h2>
      <CodeBlock
        language="bash"
        code={`sudo mkfs.ext4 -L LFS /dev/sdb1

# (opcional) criar swap em outra partição
# sudo mkswap /dev/sdbN
# sudo swapon /dev/sdbN`}
      />

      <h2>Definindo a variável <code>$LFS</code></h2>
      <p>
        O ponto de montagem padrão é <code>/mnt/lfs</code>. Vamos usar uma
        variável para evitar erros:
      </p>
      <CodeBlock
        language="bash"
        code={`export LFS=/mnt/lfs
echo "export LFS=/mnt/lfs" | sudo tee -a /root/.bashrc /etc/profile.d/lfs.sh`}
      />

      <h2>Esquema alternativo: VirtualBox</h2>
      <p>
        Se estiver em VM, crie um disco virtual <strong>extra</strong> de 60 GB
        anexado à VM como disco secundário (SATA Port 1 / VirtIO segundo). Ele
        vai aparecer como <code>/dev/sdb</code> dentro do guest. Use os mesmos
        comandos acima.
      </p>

      <AlertBox type="info" title="Próximo passo">
        Depois de formatar, vá para{" "}
        <a href="#/montando-particao">Montando a Partição</a> para preparar{" "}
        <code>/mnt/lfs</code>.
      </AlertBox>
    </PageContainer>
  );
}

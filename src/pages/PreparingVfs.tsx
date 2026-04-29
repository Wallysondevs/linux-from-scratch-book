import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function PreparingVfs() {
  return (
    <PageContainer
      title="Preparando os Filesystems Virtuais"
      subtitle="O kernel precisa de /dev, /proc, /sys, /run montados dentro do chroot."
      difficulty="intermediario"
      timeToRead="4 min"
    >
      <h2>Criando os pontos de montagem</h2>
      <CodeBlock
        language="bash"
        code={`mkdir -pv $LFS/{dev,proc,sys,run}`}
      />

      <h2>Bind-mount do <code>/dev</code> do host</h2>
      <CodeBlock
        language="bash"
        code={`mount -v --bind /dev $LFS/dev`}
      />
      <p>
        Em vez de criar nodos com <code>mknod</code>, montamos o{" "}
        <code>/dev</code> do host por bind. Mais simples e funciona para
        qualquer dispositivo.
      </p>

      <h2><code>devpts</code>, <code>proc</code>, <code>sysfs</code>, <code>tmpfs</code></h2>
      <CodeBlock
        language="bash"
        code={`mount -vt devpts devpts -o gid=5,mode=0620 $LFS/dev/pts
mount -vt proc proc $LFS/proc
mount -vt sysfs sysfs $LFS/sys
mount -vt tmpfs tmpfs $LFS/run`}
      />

      <h2><code>/dev/shm</code> (se o host usa link)</h2>
      <CodeBlock
        language="bash"
        code={`if [ -h $LFS/dev/shm ]; then
  install -v -d -m 1777 $LFS$(realpath /dev/shm)
else
  mount -vt tmpfs -o nosuid,nodev tmpfs $LFS/dev/shm
fi`}
      />

      <AlertBox type="warning" title="Você vai precisar disso TODA vez que entrar no chroot">
        Se reiniciar o host e for retomar, refaça os bind-mounts antes de
        chamar <code>chroot</code>. Anote os comandos.
      </AlertBox>
    </PageContainer>
  );
}

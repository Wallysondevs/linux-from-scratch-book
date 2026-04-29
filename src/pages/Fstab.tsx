import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Fstab() {
  return (
    <PageContainer
      title="/etc/fstab"
      subtitle="A tabela de montagens lida no boot. Sem ela, o sistema não monta /, /boot, swap..."
      difficulty="intermediario"
      timeToRead="4 min"
    >
      <h2>Estrutura de uma linha</h2>
      <CodeBlock
        language="text"
        code={`# <dispositivo>   <ponto>   <fs>   <opções>           <dump> <pass>
UUID=xxxx        /         ext4   defaults,noatime    1      1
UUID=yyyy        swap      swap   pri=1               0      0`}
      />

      <h2>Descobrindo UUIDs</h2>
      <CodeBlock
        language="bash"
        code={`blkid /dev/sdb1
# /dev/sdb1: LABEL="LFS" UUID="abc123-..." TYPE="ext4"`}
      />

      <h2>Exemplo completo</h2>
      <CodeBlock
        language="bash"
        code={`cat > /etc/fstab << "EOF"
# Begin /etc/fstab
# <file system>  <mount point>  <type>     <options>             <dump> <pass>

/dev/sdb1        /              ext4       defaults,noatime       1     1
/dev/sdb2        swap           swap       pri=1                  0     0
proc             /proc          proc       nosuid,noexec,nodev    0     0
sysfs            /sys           sysfs      nosuid,noexec,nodev    0     0
devpts           /dev/pts       devpts     gid=5,mode=620         0     0
tmpfs            /run           tmpfs      defaults               0     0
devtmpfs         /dev           devtmpfs   mode=0755,nosuid       0     0
tmpfs            /dev/shm       tmpfs      nosuid,nodev           0     0
cgroup2          /sys/fs/cgroup cgroup2    nosuid,noexec,nodev    0     0

# End /etc/fstab
EOF`}
      />

      <AlertBox type="warning" title="Confira UUIDs ANTES de reiniciar">
        UUID errado = sistema não monta = boot quebra. Cole UUIDs reais do{" "}
        <code>blkid</code>, não os do exemplo.
      </AlertBox>
    </PageContainer>
  );
}

import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function ComandosEssenciais() {
  return (
    <PageContainer
      title="Comandos Essenciais"
      subtitle="Tabela de referência rápida com os comandos mais usados no livro."
      difficulty="iniciante"
      timeToRead="5 min"
    >
      <h2>Setup inicial</h2>
      <CodeBlock
        language="bash"
        code={`# Definir variável LFS
export LFS=/mnt/lfs

# Montar partição do LFS
sudo mount /dev/sdb1 $LFS

# Logar como usuário lfs
su - lfs

# Atualizar ambiente
source ~/.bash_profile`}
      />

      <h2>Construindo um pacote (padrão)</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf pacote-X.Y.tar.xz
cd pacote-X.Y

# Configurar
./configure --prefix=/usr [opções]

# Compilar
make -j$(nproc)

# Testar (opcional)
make check

# Instalar
make install            # se for sistema final / chroot
make DESTDIR=$LFS install   # se for toolchain temporária

# Limpar
cd .. && rm -rf pacote-X.Y`}
      />

      <h2>Bind-mount filesystems virtuais (antes do chroot)</h2>
      <CodeBlock
        language="bash"
        code={`mount -v --bind /dev $LFS/dev
mount -vt devpts devpts -o gid=5,mode=0620 $LFS/dev/pts
mount -vt proc proc $LFS/proc
mount -vt sysfs sysfs $LFS/sys
mount -vt tmpfs tmpfs $LFS/run`}
      />

      <h2>Entrar no chroot</h2>
      <CodeBlock
        language="bash"
        code={`chroot "$LFS" /usr/bin/env -i \\
    HOME=/root TERM="$TERM" \\
    PS1='(lfs chroot) \\u:\\w\\$ ' \\
    PATH=/usr/bin:/usr/sbin \\
    MAKEFLAGS="-j$(nproc)" \\
    /bin/bash --login`}
      />

      <h2>Sair limpo do chroot</h2>
      <CodeBlock
        language="bash"
        code={`# dentro do chroot:
exit

# como root no host:
umount $LFS/dev/pts
umount $LFS/{sys,proc,run,dev}`}
      />

      <h2>Backup e restauração</h2>
      <CodeBlock
        language="bash"
        code={`# backup
cd $LFS
tar -cJpf $HOME/lfs-AAAA-MM-DD.tar.xz --exclude=sources .

# restaurar
cd $LFS && rm -rf ./*
tar -xpf $HOME/lfs-AAAA-MM-DD.tar.xz`}
      />

      <h2>Diagnóstico rápido</h2>
      <CodeBlock
        language="bash"
        code={`lsblk                # discos e partições
df -h                # uso por filesystem
free -h              # memória
ps -aux              # processos
journalctl -xe       # logs (systemd)
dmesg | tail         # mensagens do kernel
ip a                 # interfaces de rede
ss -tulpn            # portas abertas
mount                # filesystems montados`}
      />
    </PageContainer>
  );
}

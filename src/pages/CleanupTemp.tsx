import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function CleanupTemp() {
  return (
    <PageContainer
      title="Limpeza & Backup"
      subtitle="Antes de iniciar a build do sistema final, faça backup. Se algo der errado, você não recomeça do zero."
      difficulty="iniciante"
      timeToRead="4 min"
    >
      <h2>Limpeza de arquivos de debug e libtool archives</h2>
      <CodeBlock
        language="bash"
        code={`# Strip de debug symbols dos binários
strip --strip-debug /usr/lib/* 2>/dev/null || true
strip --strip-unneeded /usr/{,s}bin/* 2>/dev/null || true
strip --strip-unneeded /tools/{,s}bin/* 2>/dev/null || true

# Remove documentação que não vamos usar agora
rm -rf /usr/share/{info,man,doc}/*

# Remove libtool archives (serão regerados se necessário)
find /usr/{lib,libexec} -name \\*.la -delete`}
      />

      <h2>Saindo do chroot e desmontando</h2>
      <CodeBlock
        language="bash"
        code={`# dentro do chroot:
exit

# como root no host:
mountpoint -q $LFS/dev/shm && umount $LFS/dev/shm
umount $LFS/dev/pts
umount $LFS/{sys,proc,run,dev}`}
      />

      <h2>Backup com tar</h2>
      <CodeBlock
        language="bash"
        code={`# como root no host:
cd $LFS
tar -cJpf $HOME/lfs-temp-tools-$(date +%F).tar.xz \\
  --exclude=sources .

ls -lh $HOME/lfs-temp-tools-*.tar.xz
# uns 600-900 MB`}
      />

      <AlertBox type="success" title="Por quê fazer backup AGORA?">
        Você acabou de gastar várias horas construindo a toolchain temporária.
        Se erro futuro destruir <code>$LFS</code>, basta restaurar o tarball e
        retomar — sem precisar refazer a toolchain.
      </AlertBox>

      <h2>Restaurando (se necessário)</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS
rm -rf ./*
tar -xpf $HOME/lfs-temp-tools-AAAA-MM-DD.tar.xz`}
      />

      <p>
        Pronto. Para entrar no chroot novamente, refaça os bind-mounts (capítulo{" "}
        <a href="#/preparing-vfs">Preparando Filesystems Virtuais</a>) e o
        <code> chroot</code>.
      </p>
    </PageContainer>
  );
}

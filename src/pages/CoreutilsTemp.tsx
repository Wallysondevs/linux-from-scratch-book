import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function CoreutilsTemp() {
  return (
    <PageContainer
      title="Coreutils"
      subtitle="ls, cp, mv, cat, mkdir, rm, chmod, uname... os comandos básicos do shell."
      difficulty="intermediario"
      timeToRead="4 min"
    >
      <h2>Build</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf coreutils-9.5.tar.xz
cd coreutils-9.5

./configure --prefix=/usr                     \\
            --host=$LFS_TGT                   \\
            --build=$(build-aux/config.guess) \\
            --enable-install-program=hostname \\
            --enable-no-install-program=kill,uptime

make
make DESTDIR=$LFS install

# Reorganização padrão FHS
mv -v $LFS/usr/bin/chroot              $LFS/usr/sbin
mkdir -pv $LFS/usr/share/man/man8
mv -v $LFS/usr/share/man/man1/chroot.1 $LFS/usr/share/man/man8/chroot.8
sed -i 's/"1"/"8"/'                    $LFS/usr/share/man/man8/chroot.8

cd $LFS/sources
rm -rf coreutils-9.5`}
      />
    </PageContainer>
  );
}

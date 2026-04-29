import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function UtilLinuxE2fsprogs() {
  return (
    <PageContainer
      title="Util-linux & E2fsprogs (final)"
      subtitle="Util-linux fornece dezenas de utilitários (mount, lsblk, dmesg). E2fsprogs gerencia ext2/3/4."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Util-linux (final)</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf util-linux-2.40.2.tar.xz && cd util-linux-2.40.2

./configure ADJTIME_PATH=/var/lib/hwclock/adjtime \\
            --bindir=/usr/bin                     \\
            --libdir=/usr/lib                     \\
            --runstatedir=/run                    \\
            --sbindir=/usr/sbin                   \\
            --disable-chfn-chsh                   \\
            --disable-login                       \\
            --disable-nologin                     \\
            --disable-su                          \\
            --disable-setpriv                     \\
            --disable-runuser                     \\
            --disable-pylibmount                  \\
            --disable-static                      \\
            --without-python                      \\
            --without-systemd                     \\
            --without-systemdsystemunitdir        \\
            --docdir=/usr/share/doc/util-linux-2.40.2

make && make install
cd .. && rm -rf util-linux-2.40.2`}
      />

      <h2>E2fsprogs</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf e2fsprogs-1.47.1.tar.gz && cd e2fsprogs-1.47.1

mkdir -v build && cd build

../configure --prefix=/usr           \\
             --sysconfdir=/etc       \\
             --enable-elf-shlibs     \\
             --disable-libblkid      \\
             --disable-libuuid       \\
             --disable-uuidd         \\
             --disable-fsck

make
make install

rm -fv /usr/lib/{libcom_err,libe2p,libext2fs,libss}.a
gunzip -v /usr/share/info/libext2fs.info.gz
install-info --dir-file=/usr/share/info/dir /usr/share/info/libext2fs.info

cd ../.. && rm -rf e2fsprogs-1.47.1`}
      />
    </PageContainer>
  );
}

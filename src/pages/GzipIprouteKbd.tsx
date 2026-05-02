import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function GzipIprouteKbd() {
  return (
    <PageContainer
      title="Gzip, IPRoute2, Kbd, Libpipeline, Make (final)"
      subtitle="Compressão, ferramentas de rede modernas, mapas de teclado e libpipeline (usada por man-db)."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Gzip</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf gzip-1.14.tar.xz && cd gzip-1.14
./configure --prefix=/usr
make && make install
cd .. && rm -rf gzip-1.14`}
      />

      <h2>IPRoute2</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf iproute2-6.16.0.tar.xz && cd iproute2-6.16.0
sed -i /ARPD/d Makefile
rm -fv man/man8/arpd.8
make NETNS_RUN_DIR=/run/netns
make SBINDIR=/usr/sbin install
mkdir -pv             /usr/share/doc/iproute2-6.16.0
cp -v COPYING README* /usr/share/doc/iproute2-6.16.0
cd .. && rm -rf iproute2-6.16.0`}
      />

      <h2>Kbd</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf kbd-2.8.0.tar.xz && cd kbd-2.8.0
patch -Np1 -i ../kbd-2.8.0-backspace-1.patch
sed -i '/RESIZECONS_PROGS=/s/yes/no/' configure
sed -i 's/resizecons.8 //' docs/man/man8/Makefile.in
./configure --prefix=/usr --disable-vlock
make && make install
cd .. && rm -rf kbd-2.8.0`}
      />

      <h2>Libpipeline</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf libpipeline-1.5.8.tar.gz && cd libpipeline-1.5.8
./configure --prefix=/usr
make && make install
cd .. && rm -rf libpipeline-1.5.8`}
      />

      <h2>Make (final)</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf make-4.4.1.tar.gz && cd make-4.4.1
./configure --prefix=/usr
make && make install
cd .. && rm -rf make-4.4.1`}
      />
    </PageContainer>
  );
}

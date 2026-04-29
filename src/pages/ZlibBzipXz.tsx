import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function ZlibBzipXz() {
  return (
    <PageContainer
      title="Zlib, Bzip2, Xz, Zstd"
      subtitle="Bibliotecas de compressão. Vários pacotes mais à frente vão exigi-las."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Zlib</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf zlib-1.3.1.tar.xz && cd zlib-1.3.1
./configure --prefix=/usr
make && make install
rm -fv /usr/lib/libz.a
cd .. && rm -rf zlib-1.3.1`}
      />

      <h2>Bzip2</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf bzip2-1.0.8.tar.gz && cd bzip2-1.0.8

patch -Np1 -i ../bzip2-1.0.8-install_docs-1.patch
sed -i 's@\\(ln -s -f \\)$(PREFIX)/bin/@\\1@' Makefile
sed -i "s@(PREFIX)/man@(PREFIX)/share/man@g" Makefile

make -f Makefile-libbz2_so
make clean
make
make PREFIX=/usr install

cp -av libbz2.so.* /usr/lib
ln -sv libbz2.so.1.0.8 /usr/lib/libbz2.so

cp -v bzip2-shared /usr/bin/bzip2
for i in /usr/bin/{bzcat,bunzip2}; do
  ln -sfv bzip2 $i
done
rm -fv /usr/lib/libbz2.a
cd .. && rm -rf bzip2-1.0.8`}
      />

      <h2>Xz (final)</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf xz-5.6.2.tar.xz && cd xz-5.6.2
./configure --prefix=/usr --disable-static --docdir=/usr/share/doc/xz-5.6.2
make && make install
cd .. && rm -rf xz-5.6.2`}
      />

      <h2>Zstd</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf zstd-1.5.6.tar.gz && cd zstd-1.5.6
make prefix=/usr
make prefix=/usr install
rm -v /usr/lib/libzstd.a
cd .. && rm -rf zstd-1.5.6`}
      />
    </PageContainer>
  );
}

import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function BinutilsFinal() {
  return (
    <PageContainer
      title="Pkgconf, Binutils (final)"
      subtitle="Pkgconf substitui pkg-config. Binutils final é a versão definitiva instalada no sistema."
      difficulty="avancado"
      timeToRead="5 min"
    >
      <h2>Pkgconf</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf pkgconf-2.5.1.tar.xz && cd pkgconf-2.5.1
./configure --prefix=/usr --disable-static --docdir=/usr/share/doc/pkgconf-2.5.1
make && make install
ln -sv pkgconf   /usr/bin/pkg-config
ln -sv pkgconf.1 /usr/share/man/man1/pkg-config.1
cd .. && rm -rf pkgconf-2.5.1`}
      />

      <h2>Binutils (final)</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf binutils-2.45.tar.xz && cd binutils-2.45

mkdir -v build && cd build

../configure --prefix=/usr        \\
             --sysconfdir=/etc    \\
             --enable-gold        \\
             --enable-ld=default  \\
             --enable-plugins     \\
             --enable-shared      \\
             --disable-werror     \\
             --enable-64-bit-bfd  \\
             --enable-new-dtags   \\
             --with-system-zlib   \\
             --enable-default-hash-style=gnu

make tooldir=/usr
make -k check
grep '^FAIL:' $(find -name '*.log')
make tooldir=/usr install

rm -rfv /usr/lib/lib{bfd,ctf,ctf-nobfd,opcodes,sframe}.a
cd ../.. && rm -rf binutils-2.45`}
      />
    </PageContainer>
  );
}

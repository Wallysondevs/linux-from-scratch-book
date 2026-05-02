import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function GrepTemp() {
  return (
    <PageContainer
      title="Grep, Gzip, Make"
      subtitle="Mais três utilitários da toolchain temporária."
      difficulty="intermediario"
      timeToRead="4 min"
    >
      <h2>Grep</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf grep-3.11.tar.xz && cd grep-3.11

./configure --prefix=/usr   \\
            --host=$LFS_TGT \\
            --build=$(./build-aux/config.guess)

make
make DESTDIR=$LFS install
cd .. && rm -rf grep-3.11`}
      />

      <h2>Gzip</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf gzip-1.14.tar.xz && cd gzip-1.14

./configure --prefix=/usr --host=$LFS_TGT
make
make DESTDIR=$LFS install
cd .. && rm -rf gzip-1.14`}
      />

      <h2>Make</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf make-4.4.1.tar.gz && cd make-4.4.1

./configure --prefix=/usr   \\
            --without-guile \\
            --host=$LFS_TGT \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install
cd .. && rm -rf make-4.4.1`}
      />
    </PageContainer>
  );
}

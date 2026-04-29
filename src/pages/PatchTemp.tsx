import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function PatchTemp() {
  return (
    <PageContainer
      title="Patch, Sed, Tar, Xz"
      subtitle="Os últimos pacotes da fase de ferramentas temporárias antes do Pass 2."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Patch</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf patch-2.7.6.tar.xz && cd patch-2.7.6
./configure --prefix=/usr --host=$LFS_TGT --build=$(build-aux/config.guess)
make && make DESTDIR=$LFS install
cd .. && rm -rf patch-2.7.6`}
      />

      <h2>Sed</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf sed-4.9.tar.xz && cd sed-4.9
./configure --prefix=/usr --host=$LFS_TGT
make && make DESTDIR=$LFS install
cd .. && rm -rf sed-4.9`}
      />

      <h2>Tar</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf tar-1.35.tar.xz && cd tar-1.35
./configure --prefix=/usr                   \\
            --host=$LFS_TGT                 \\
            --build=$(build-aux/config.guess)
make && make DESTDIR=$LFS install
cd .. && rm -rf tar-1.35`}
      />

      <h2>Xz</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf xz-5.6.2.tar.xz && cd xz-5.6.2

./configure --prefix=/usr                     \\
            --host=$LFS_TGT                   \\
            --build=$(build-aux/config.guess) \\
            --disable-static                  \\
            --docdir=/usr/share/doc/xz-5.6.2

make && make DESTDIR=$LFS install
rm -v $LFS/usr/lib/liblzma.la
cd .. && rm -rf xz-5.6.2`}
      />
    </PageContainer>
  );
}

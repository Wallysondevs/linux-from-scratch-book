import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function MakePatchTar() {
  return (
    <PageContainer
      title="Patch, Tar (final)"
      subtitle="Versões finais. Tar é fundamental para qualquer manipulação de pacotes futuros."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>Patch</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf patch-2.8.tar.xz && cd patch-2.8
./configure --prefix=/usr
make && make install
cd .. && rm -rf patch-2.8`}
      />

      <h2>Tar</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf tar-1.35.tar.xz && cd tar-1.35
FORCE_UNSAFE_CONFIGURE=1 ./configure --prefix=/usr
make
make install
make -C doc install-html docdir=/usr/share/doc/tar-1.35
cd .. && rm -rf tar-1.35`}
      />
    </PageContainer>
  );
}

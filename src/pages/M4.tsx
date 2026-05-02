import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function M4() {
  return (
    <PageContainer
      title="M4"
      subtitle="Processador de macros usado por autoconf, bison e outros. Pacote pequeno e rápido."
      difficulty="intermediario"
      timeToRead="3 min"
    >
      <h2>Build</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf m4-1.4.20.tar.xz
cd m4-1.4.20

./configure --prefix=/usr   \\
            --host=$LFS_TGT \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd $LFS/sources
rm -rf m4-1.4.20`}
      />

      <p className="text-sm text-muted-foreground mt-4">
        ⏱ Aproximadamente 0.1 SBU. Talvez o pacote mais rápido do livro.
      </p>
    </PageContainer>
  );
}

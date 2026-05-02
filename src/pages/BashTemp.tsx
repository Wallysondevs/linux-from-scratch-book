import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function BashTemp() {
  return (
    <PageContainer
      title="Bash"
      subtitle="O shell padrão do LFS. Vamos compilar uma versão temporária."
      difficulty="intermediario"
      timeToRead="3 min"
    >
      <h2>Build</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf bash-5.3.tar.gz
cd bash-5.3

./configure --prefix=/usr                      \\
            --build=$(sh support/config.guess) \\
            --host=$LFS_TGT                    \\
            --without-bash-malloc

make
make DESTDIR=$LFS install

# Symlink padrão sh -> bash
ln -sv bash $LFS/bin/sh

cd $LFS/sources
rm -rf bash-5.3`}
      />
    </PageContainer>
  );
}

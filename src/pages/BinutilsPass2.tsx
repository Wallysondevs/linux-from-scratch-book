import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function BinutilsPass2() {
  return (
    <PageContainer
      title="Binutils — Pass 2"
      subtitle="Recompilando o Binutils com a toolchain temporária recém-criada."
      difficulty="avancado"
      timeToRead="5 min"
    >
      <h2>Build</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf binutils-2.45.tar.xz && cd binutils-2.45

# Patch para evitar problema com tooldir
sed '6009s/$add_dir//' -i ltmain.sh

mkdir -v build
cd build

../configure                   \\
    --prefix=/usr              \\
    --build=$(../config.guess) \\
    --host=$LFS_TGT            \\
    --disable-nls              \\
    --enable-shared            \\
    --enable-gprofng=no        \\
    --disable-werror           \\
    --enable-64-bit-bfd        \\
    --enable-new-dtags         \\
    --enable-default-hash-style=gnu

make
make DESTDIR=$LFS install

# Removendo libtool archives:
rm -v $LFS/usr/lib/lib{bfd,ctf,ctf-nobfd,opcodes,sframe}.{a,la}

cd $LFS/sources
rm -rf binutils-2.45`}
      />
    </PageContainer>
  );
}

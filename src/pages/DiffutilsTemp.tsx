import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function DiffutilsTemp() {
  return (
    <PageContainer
      title="Diffutils, File, Findutils, Gawk"
      subtitle="Quatro pacotes pequenos compilados em sequência."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Diffutils</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf diffutils-3.10.tar.xz && cd diffutils-3.10

./configure --prefix=/usr   \\
            --host=$LFS_TGT \\
            --build=$(./build-aux/config.guess)

make
make DESTDIR=$LFS install

cd .. && rm -rf diffutils-3.10`}
      />

      <h2>File</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf file-5.46.tar.gz && cd file-5.46

mkdir build
pushd build
  ../configure --disable-bzlib      \\
               --disable-libseccomp \\
               --disable-xzlib      \\
               --disable-zlib
  make
popd

./configure --prefix=/usr --host=$LFS_TGT --build=$(./config.guess)
make FILE_COMPILE=$(pwd)/build/src/file
make DESTDIR=$LFS install
rm -v $LFS/usr/lib/libmagic.la

cd .. && rm -rf file-5.46`}
      />

      <h2>Findutils</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf findutils-4.10.0.tar.xz && cd findutils-4.10.0

./configure --prefix=/usr                   \\
            --localstatedir=/var/lib/locate \\
            --host=$LFS_TGT                 \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd .. && rm -rf findutils-4.10.0`}
      />

      <h2>Gawk</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf gawk-5.3.2.tar.xz && cd gawk-5.3.2

# Não tentamos compilar a extensão para o host:
sed -i 's/extras//' Makefile.in

./configure --prefix=/usr   \\
            --host=$LFS_TGT \\
            --build=$(build-aux/config.guess)

make
make DESTDIR=$LFS install

cd .. && rm -rf gawk-5.3.2`}
      />
    </PageContainer>
  );
}

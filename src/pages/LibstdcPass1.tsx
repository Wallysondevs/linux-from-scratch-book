import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function LibstdcPass1() {
  return (
    <PageContainer
      title="Libstdc++ from GCC"
      subtitle="A biblioteca C++. Compilada separadamente, ligada à Glibc nova."
      difficulty="avancado"
      timeToRead="4 min"
    >
      <h2>Por que separado?</h2>
      <p>
        O GCC vem com a libstdc++, mas ela <strong>precisa</strong> da Glibc para
        funcionar. Como a Glibc só nasceu agora, recompilamos a libstdc++
        contra ela.
      </p>

      <h2>Build</h2>
      <CodeBlock
        language="bash"
        code={`cd $LFS/sources
tar -xf gcc-15.2.0.tar.xz
cd gcc-15.2.0

mkdir -v build
cd build

../libstdc++-v3/configure           \\
    --host=$LFS_TGT                 \\
    --build=$(../config.guess)      \\
    --prefix=/usr                   \\
    --disable-multilib              \\
    --disable-nls                   \\
    --disable-libstdcxx-pch         \\
    --with-gxx-include-dir=/tools/$LFS_TGT/include/c++/14.2.0

make
make DESTDIR=$LFS install

# Removendo libtool archives inúteis:
rm -v $LFS/usr/lib/lib{stdc++{,exp,fs},supc++}.la

cd $LFS/sources
rm -rf gcc-15.2.0`}
      />
    </PageContainer>
  );
}

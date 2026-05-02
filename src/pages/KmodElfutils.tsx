import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function KmodElfutils() {
  return (
    <PageContainer
      title="Kmod, Elfutils, Libffi"
      subtitle="Carregamento de módulos do kernel, leitura de binários ELF e foreign function interface."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Libffi</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf libffi-3.5.2.tar.gz && cd libffi-3.5.2
./configure --prefix=/usr          \\
            --disable-static       \\
            --with-gcc-arch=native
make && make install
cd .. && rm -rf libffi-3.5.2`}
      />

      <h2>Kmod</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf kmod-32.tar.xz && cd kmod-32
./configure --prefix=/usr     \\
            --sysconfdir=/etc \\
            --with-openssl    \\
            --with-xz         \\
            --with-zstd       \\
            --with-zlib

make && make install

for target in depmod insmod modinfo modprobe rmmod; do
  ln -sfv ../bin/kmod /usr/sbin/$target
done
ln -sfv kmod /usr/bin/lsmod
cd .. && rm -rf kmod-32`}
      />

      <h2>Elfutils</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf elfutils-0.193.tar.bz2 && cd elfutils-0.193
./configure --prefix=/usr                 \\
            --disable-debuginfod          \\
            --enable-libdebuginfod=dummy

make && make install
rm /usr/lib/lib{asm,debuginfod,dw,elf}.a
cd .. && rm -rf elfutils-0.193`}
      />
    </PageContainer>
  );
}

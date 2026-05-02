import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function GmpMpfrMpc() {
  return (
    <PageContainer
      title="GMP, MPFR, MPC"
      subtitle="Bibliotecas matemáticas usadas pelo GCC final, GDB e várias outras."
      difficulty="intermediario"
      timeToRead="4 min"
    >
      <h2>GMP</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf gmp-6.3.0.tar.xz && cd gmp-6.3.0

./configure --prefix=/usr    \\
            --enable-cxx     \\
            --disable-static \\
            --docdir=/usr/share/doc/gmp-6.3.0
make
make html
make install
make install-html
cd .. && rm -rf gmp-6.3.0`}
      />

      <h2>MPFR</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf mpfr-4.2.2.tar.xz && cd mpfr-4.2.2
sed -e 's/+01,234,567/+1,234,567 /' \\
    -e 's/13.10Pd/13Pd/'            \\
    -i tests/tsprintf.c

./configure --prefix=/usr        \\
            --disable-static     \\
            --enable-thread-safe \\
            --docdir=/usr/share/doc/mpfr-4.2.2
make
make html
make install
make install-html
cd .. && rm -rf mpfr-4.2.2`}
      />

      <h2>MPC</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf mpc-1.3.1.tar.gz && cd mpc-1.3.1
./configure --prefix=/usr --disable-static --docdir=/usr/share/doc/mpc-1.3.1
make && make install
cd .. && rm -rf mpc-1.3.1`}
      />
    </PageContainer>
  );
}

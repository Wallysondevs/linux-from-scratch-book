import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function GdbmGperfExpat() {
  return (
    <PageContainer
      title="GDBM, Gperf, Expat, Inetutils, Less"
      subtitle="Bibliotecas de banco-de-dados embutido, perfect-hash, parser XML e ferramentas de rede."
      difficulty="intermediario"
      timeToRead="6 min"
    >
      <h2>GDBM</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf gdbm-1.26.tar.gz && cd gdbm-1.26
./configure --prefix=/usr --disable-static --enable-libgdbm-compat
make && make install
cd .. && rm -rf gdbm-1.26`}
      />

      <h2>Gperf</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf gperf-3.3.tar.gz && cd gperf-3.3
./configure --prefix=/usr --docdir=/usr/share/doc/gperf-3.3
make && make install
cd .. && rm -rf gperf-3.3`}
      />

      <h2>Expat</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf expat-2.7.1.tar.xz && cd expat-2.7.1
./configure --prefix=/usr --disable-static --docdir=/usr/share/doc/expat-2.7.1
make && make install
install -v -m644 doc/*.{html,css} /usr/share/doc/expat-2.7.1 || true
cd .. && rm -rf expat-2.7.1`}
      />

      <h2>Inetutils</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf inetutils-2.6.tar.xz && cd inetutils-2.6

./configure --prefix=/usr        \\
            --bindir=/usr/bin    \\
            --localstatedir=/var \\
            --disable-logger     \\
            --disable-whois      \\
            --disable-rcp        \\
            --disable-rexec      \\
            --disable-rlogin     \\
            --disable-rsh        \\
            --disable-servers
make && make install
mv -v /usr/{,s}bin/ifconfig
cd .. && rm -rf inetutils-2.6`}
      />

      <h2>Less</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf less-661.tar.gz && cd less-661
./configure --prefix=/usr --sysconfdir=/etc
make && make install
cd .. && rm -rf less-661`}
      />
    </PageContainer>
  );
}

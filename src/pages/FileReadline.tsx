import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function FileReadline() {
  return (
    <PageContainer
      title="File, Readline, M4 (final), Bc"
      subtitle="Mais utilitários básicos. Bc é necessário para configurar o kernel depois."
      difficulty="intermediario"
      timeToRead="4 min"
    >
      <h2>File (final)</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf file-5.46.tar.gz && cd file-5.46
./configure --prefix=/usr
make && make install
cd .. && rm -rf file-5.46`}
      />

      <h2>Readline</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf readline-8.3.tar.gz && cd readline-8.3

sed -i '/MV.*old/d' Makefile.in
sed -i '/{OLDSUFF}/c:' support/shlib-install
sed -i 's/-Wl,-rpath,[^ ]*//' support/shobj-conf

./configure --prefix=/usr      \\
            --disable-static   \\
            --with-curses      \\
            --docdir=/usr/share/doc/readline-8.3

make SHLIB_LIBS="-lncursesw"
make SHLIB_LIBS="-lncursesw" install
install -v -m644 doc/*.{ps,pdf,html,dvi} /usr/share/doc/readline-8.3 || true
cd .. && rm -rf readline-8.3`}
      />

      <h2>M4 (final)</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf m4-1.4.20.tar.xz && cd m4-1.4.20
./configure --prefix=/usr
make && make install
cd .. && rm -rf m4-1.4.20`}
      />

      <h2>Bc</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf bc-7.0.3.tar.xz && cd bc-7.0.3
CC=gcc ./configure --prefix=/usr -G -O3 -r
make && make install
cd .. && rm -rf bc-7.0.3`}
      />
    </PageContainer>
  );
}

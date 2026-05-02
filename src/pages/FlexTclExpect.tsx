import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function FlexTclExpect() {
  return (
    <PageContainer
      title="Flex, Tcl, Expect, DejaGNU"
      subtitle="Lex/yacc-like, scripting Tcl, automação Expect e suporte a testes do GCC."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Flex</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf flex-2.6.4.tar.gz && cd flex-2.6.4
./configure --prefix=/usr --docdir=/usr/share/doc/flex-2.6.4 --disable-static
make && make install
ln -sv flex   /usr/bin/lex
ln -sv flex.1 /usr/share/man/man1/lex.1
cd .. && rm -rf flex-2.6.4`}
      />

      <h2>Tcl</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf tcl8.6.16-src.tar.gz && cd tcl8.6.16
SRCDIR=$(pwd)
cd unix
./configure --prefix=/usr --mandir=/usr/share/man
make
sed -e "s|$SRCDIR/unix|/usr/lib|" -e "s|$SRCDIR|/usr/include|" -i tclConfig.sh
make install
chmod -v u+w /usr/lib/libtcl8.6.so
make install-private-headers
ln -sfv tclsh8.6 /usr/bin/tclsh
mv /usr/share/man/man3/{Thread,Tcl_Thread}.3
cd ../.. && rm -rf tcl8.6.16`}
      />

      <h2>Expect</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf expect5.45.4.tar.gz && cd expect5.45.4
./configure --prefix=/usr --with-tcl=/usr/lib --enable-shared \\
            --mandir=/usr/share/man --with-tclinclude=/usr/include
make && make install
ln -svf expect5.45.4/libexpect5.45.4.so /usr/lib
cd .. && rm -rf expect5.45.4`}
      />

      <h2>DejaGNU</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf dejagnu-1.6.3.tar.gz && cd dejagnu-1.6.3
mkdir -v build && cd build
../configure --prefix=/usr
makeinfo --html --no-split -o doc/dejagnu.html ../doc/dejagnu.texi
makeinfo --plaintext       -o doc/dejagnu.txt  ../doc/dejagnu.texi
make install
install -v -dm755 /usr/share/doc/dejagnu-1.6.3
install -v -m644  doc/dejagnu.{html,txt} /usr/share/doc/dejagnu-1.6.3
cd ../.. && rm -rf dejagnu-1.6.3`}
      />
    </PageContainer>
  );
}

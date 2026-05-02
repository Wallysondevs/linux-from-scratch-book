import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function NcursesFinal() {
  return (
    <PageContainer
      title="Ncurses, Sed, Psmisc, Gettext (final)"
      subtitle="Recompilando ncurses para o sistema final, mais sed, ps/kill/pstree e gettext."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>Ncurses (final)</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf ncurses-6.5.tar.gz && cd ncurses-6.5

./configure --prefix=/usr           \\
            --mandir=/usr/share/man \\
            --with-shared           \\
            --without-debug         \\
            --without-normal        \\
            --with-cxx-shared       \\
            --enable-pc-files       \\
            --enable-widec          \\
            --with-pkg-config-libdir=/usr/lib/pkgconfig

make
make DESTDIR=$PWD/dest install
install -vm755 dest/usr/lib/libncursesw.so.6.5 /usr/lib
rm -v  dest/usr/lib/libncursesw.so.6.5
sed -e 's/^#if.*XOPEN.*$/#if 1/' \\
    -i dest/usr/include/curses.h
cp -av dest/* /

for lib in ncurses form panel menu ; do
    ln -sfv lib${'${lib}'}w.so /usr/lib/lib${'${lib}'}.so
    ln -sfv ${'${lib}'}w.pc    /usr/lib/pkgconfig/${'${lib}'}.pc
done
ln -sfv libncursesw.so /usr/lib/libcurses.so
cd .. && rm -rf ncurses-6.5`}
      />

      <h2>Sed</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf sed-4.9.tar.xz && cd sed-4.9
./configure --prefix=/usr
make && make install
cd .. && rm -rf sed-4.9`}
      />

      <h2>Psmisc</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf psmisc-23.7.tar.xz && cd psmisc-23.7
./configure --prefix=/usr
make && make install
cd .. && rm -rf psmisc-23.7`}
      />

      <h2>Gettext (final)</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf gettext-0.26.tar.xz && cd gettext-0.26
./configure --prefix=/usr --disable-static --docdir=/usr/share/doc/gettext-0.26
make && make install
chmod 0755 /usr/lib/preloadable_libintl.so
cd .. && rm -rf gettext-0.26`}
      />
    </PageContainer>
  );
}

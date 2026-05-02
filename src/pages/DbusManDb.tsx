import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function DbusManDb() {
  return (
    <PageContainer
      title="D-Bus, Man-DB, Procps-ng"
      subtitle="IPC para systemd, banco de páginas de manual e ferramentas de processos (ps, top, free)."
      difficulty="intermediario"
      timeToRead="5 min"
    >
      <h2>D-Bus</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf dbus-1.14.10.tar.xz && cd dbus-1.14.10

./configure --prefix=/usr                     \\
            --sysconfdir=/etc                 \\
            --localstatedir=/var              \\
            --runstatedir=/run                \\
            --enable-user-session             \\
            --disable-static                  \\
            --disable-doxygen-docs            \\
            --disable-xml-docs                \\
            --docdir=/usr/share/doc/dbus-1.14.10 \\
            --with-system-socket=/run/dbus/system_bus_socket

make && make install

ln -sfv /etc/machine-id /var/lib/dbus
cd .. && rm -rf dbus-1.14.10`}
      />

      <h2>Man-DB</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf man-db-2.13.1.tar.xz && cd man-db-2.13.1

./configure --prefix=/usr                         \\
            --docdir=/usr/share/doc/man-db-2.13.1 \\
            --sysconfdir=/etc                     \\
            --disable-setuid                      \\
            --enable-cache-owner=bin              \\
            --with-browser=/usr/bin/lynx          \\
            --with-vgrind=/usr/bin/vgrind         \\
            --with-grap=/usr/bin/grap             \\
            --with-systemdtmpfilesdir=            \\
            --with-systemdsystemunitdir=

make && make install
cd .. && rm -rf man-db-2.13.1`}
      />

      <h2>Procps-ng</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf procps-ng-4.0.4.tar.xz && cd procps-ng-4.0.4

./configure --prefix=/usr                            \\
            --docdir=/usr/share/doc/procps-ng-4.0.4 \\
            --disable-static                         \\
            --disable-kill

make && make install
cd .. && rm -rf procps-ng-4.0.4`}
      />
    </PageContainer>
  );
}

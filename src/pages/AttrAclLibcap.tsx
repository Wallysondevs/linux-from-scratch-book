import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function AttrAclLibcap() {
  return (
    <PageContainer
      title="Attr, Acl, Libcap, Libxcrypt, Shadow"
      subtitle="Atributos estendidos, ACLs, capabilities e suporte a senhas modernas."
      difficulty="intermediario"
      timeToRead="6 min"
    >
      <h2>Attr</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf attr-2.5.2.tar.gz && cd attr-2.5.2
./configure --prefix=/usr --disable-static --sysconfdir=/etc \\
            --docdir=/usr/share/doc/attr-2.5.2
make && make install
cd .. && rm -rf attr-2.5.2`}
      />

      <h2>Acl</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf acl-2.3.2.tar.xz && cd acl-2.3.2
./configure --prefix=/usr --disable-static --docdir=/usr/share/doc/acl-2.3.2
make && make install
cd .. && rm -rf acl-2.3.2`}
      />

      <h2>Libcap</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf libcap-2.76.tar.xz && cd libcap-2.76
sed -i '/install -m.*STA/d' libcap/Makefile
make prefix=/usr lib=lib
make prefix=/usr lib=lib install
cd .. && rm -rf libcap-2.76`}
      />

      <h2>Libxcrypt</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf libxcrypt-4.4.38.tar.xz && cd libxcrypt-4.4.38
./configure --prefix=/usr                \\
            --enable-hashes=strong,glibc \\
            --enable-obsolete-api=no     \\
            --disable-static             \\
            --disable-failure-tokens
make && make install
cd .. && rm -rf libxcrypt-4.4.38`}
      />

      <h2>Shadow</h2>
      <CodeBlock
        language="bash"
        code={`tar -xf shadow-4.18.0.tar.xz && cd shadow-4.18.0

sed -i 's/groups$(EXEEXT) //' src/Makefile.in
find man -name Makefile.in -exec sed -i 's/groups\\.1 / /'   {} \\;
find man -name Makefile.in -exec sed -i 's/getspnam\\.3 / /' {} \\;
find man -name Makefile.in -exec sed -i 's/passwd\\.5 / /'   {} \\;

sed -e 's:#ENCRYPT_METHOD DES:ENCRYPT_METHOD YESCRYPT:' \\
    -e 's:/var/spool/mail:/var/mail:'                   \\
    -e '/PATH=/{s@/sbin:@@;s@/bin:@@}'                  \\
    -i etc/login.defs

touch /usr/bin/passwd
./configure --sysconfdir=/etc           \\
            --disable-static            \\
            --with-{b,yes}crypt         \\
            --without-libbsd            \\
            --with-group-name-max-length=32

make
make exec_prefix=/usr install
make -C man install-man

pwconv
grpconv
mkdir -p /etc/default
useradd -D --gid 999

passwd root  # define a senha do root agora!

cd .. && rm -rf shadow-4.18.0`}
      />
    </PageContainer>
  );
}

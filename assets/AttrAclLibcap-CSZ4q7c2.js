import{j as a}from"./index-K1a8hxkV.js";import{P as i}from"./PageContainer-BFvVnrCN.js";import{C as e}from"./CodeBlock-DvB8XoAE.js";function c(){return a.jsxs(i,{title:"Attr, Acl, Libcap, Libxcrypt, Shadow",subtitle:"Atributos estendidos, ACLs, capabilities e suporte a senhas modernas.",difficulty:"intermediario",timeToRead:"6 min",children:[a.jsx("h2",{children:"Attr"}),a.jsx(e,{language:"bash",code:`cd /sources
tar -xf attr-2.5.2.tar.gz && cd attr-2.5.2
./configure --prefix=/usr --disable-static --sysconfdir=/etc \\
            --docdir=/usr/share/doc/attr-2.5.2
make && make install
cd .. && rm -rf attr-2.5.2`}),a.jsx("h2",{children:"Acl"}),a.jsx(e,{language:"bash",code:`tar -xf acl-2.3.2.tar.xz && cd acl-2.3.2
./configure --prefix=/usr --disable-static --docdir=/usr/share/doc/acl-2.3.2
make && make install
cd .. && rm -rf acl-2.3.2`}),a.jsx("h2",{children:"Libcap"}),a.jsx(e,{language:"bash",code:`tar -xf libcap-2.76.tar.xz && cd libcap-2.76
sed -i '/install -m.*STA/d' libcap/Makefile
make prefix=/usr lib=lib
make prefix=/usr lib=lib install
cd .. && rm -rf libcap-2.76`}),a.jsx("h2",{children:"Libxcrypt"}),a.jsx(e,{language:"bash",code:`tar -xf libxcrypt-4.4.38.tar.xz && cd libxcrypt-4.4.38
./configure --prefix=/usr                \\
            --enable-hashes=strong,glibc \\
            --enable-obsolete-api=no     \\
            --disable-static             \\
            --disable-failure-tokens
make && make install
cd .. && rm -rf libxcrypt-4.4.38`}),a.jsx("h2",{children:"Shadow"}),a.jsx(e,{language:"bash",code:`tar -xf shadow-4.18.0.tar.xz && cd shadow-4.18.0

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

cd .. && rm -rf shadow-4.18.0`})]})}export{c as default};

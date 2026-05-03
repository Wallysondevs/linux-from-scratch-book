import{j as i}from"./index-CGptwfLb.js";import{P as l}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";function t(){return i.jsxs(l,{title:"Util-linux & E2fsprogs (final)",subtitle:"Util-linux fornece dezenas de utilitários (mount, lsblk, dmesg). E2fsprogs gerencia ext2/3/4.",difficulty:"intermediario",timeToRead:"5 min",children:[i.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),i.jsx("h2",{children:"Glossário rápido"}),i.jsxs("ul",{children:[i.jsxs("li",{children:[i.jsx("strong",{children:"Util-linux"})," "," — "," ","blkid, mount."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"E2fsprogs"})," "," — "," ","mkfs.ext4."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Build"})," "," — "," ","clássico."]})]}),i.jsx("h2",{children:"Util-linux (final)"}),i.jsx(s,{language:"bash",code:`cd /sources
tar -xf util-linux-2.41.1.tar.xz && cd util-linux-2.41.1

./configure ADJTIME_PATH=/var/lib/hwclock/adjtime \\
            --bindir=/usr/bin                     \\
            --libdir=/usr/lib                     \\
            --runstatedir=/run                    \\
            --sbindir=/usr/sbin                   \\
            --disable-chfn-chsh                   \\
            --disable-login                       \\
            --disable-nologin                     \\
            --disable-su                          \\
            --disable-setpriv                     \\
            --disable-runuser                     \\
            --disable-pylibmount                  \\
            --disable-static                      \\
            --without-python                      \\
            --without-systemd                     \\
            --without-systemdsystemunitdir        \\
            --docdir=/usr/share/doc/util-linux-2.41.1

make && make install
cd .. && rm -rf util-linux-2.41.1`}),i.jsx("h2",{children:"E2fsprogs"}),i.jsx(s,{language:"bash",code:`tar -xf e2fsprogs-1.47.3.tar.gz && cd e2fsprogs-1.47.3

mkdir -v build && cd build

../configure --prefix=/usr           \\
             --sysconfdir=/etc       \\
             --enable-elf-shlibs     \\
             --disable-libblkid      \\
             --disable-libuuid       \\
             --disable-uuidd         \\
             --disable-fsck

make
make install

rm -fv /usr/lib/{libcom_err,libe2p,libext2fs,libss}.a
gunzip -v /usr/share/info/libext2fs.info.gz
install-info --dir-file=/usr/share/info/dir /usr/share/info/libext2fs.info

cd ../.. && rm -rf e2fsprogs-1.47.3`})]})}export{t as default};

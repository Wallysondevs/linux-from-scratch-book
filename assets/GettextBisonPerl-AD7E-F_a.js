import{j as e}from"./index-ZrM6Gh7j.js";import{P as i}from"./PageContainer-jOSfeH0u.js";import{C as r}from"./CodeBlock-cFXLaLiU.js";import{A as s}from"./AlertBox-D3Y0IUPD.js";function n(){return e.jsxs(i,{title:"Gettext, Bison, Perl, Python, Texinfo, Util-linux",subtitle:"Pacotes adicionais necessários para builds dentro do chroot.",difficulty:"intermediario",timeToRead:"6 min",children:[e.jsx(s,{type:"info",title:"Estes são versões intermediárias",children:'Vários destes pacotes (Perl, Python, Util-linux) serão recompilados na fase final. Aqui só queremos uma versão "boa o suficiente" para que outros pacotes consigam ser configurados.'}),e.jsx("h2",{children:"Gettext"}),e.jsx(r,{language:"bash",code:`cd /sources
tar -xf gettext-0.26.tar.xz && cd gettext-0.26

./configure --disable-shared
make
cp -v gettext-tools/src/{msgfmt,msgmerge,xgettext} /usr/bin
cd .. && rm -rf gettext-0.26`}),e.jsx("h2",{children:"Bison"}),e.jsx(r,{language:"bash",code:`tar -xf bison-3.8.2.tar.xz && cd bison-3.8.2
./configure --prefix=/usr --docdir=/usr/share/doc/bison-3.8.2
make && make install
cd .. && rm -rf bison-3.8.2`}),e.jsx("h2",{children:"Perl"}),e.jsx(r,{language:"bash",code:`tar -xf perl-5.42.0.tar.xz && cd perl-5.42.0

sh Configure -des                                         \\
             -D prefix=/usr                               \\
             -D vendorprefix=/usr                         \\
             -D useshrplib                                \\
             -D privlib=/usr/lib/perl5/5.40/core_perl     \\
             -D archlib=/usr/lib/perl5/5.40/core_perl     \\
             -D sitelib=/usr/lib/perl5/5.40/site_perl     \\
             -D sitearch=/usr/lib/perl5/5.40/site_perl    \\
             -D vendorlib=/usr/lib/perl5/5.40/vendor_perl \\
             -D vendorarch=/usr/lib/perl5/5.40/vendor_perl

make && make install
cd .. && rm -rf perl-5.42.0`}),e.jsx("h2",{children:"Python"}),e.jsx(r,{language:"bash",code:`tar -xf Python-3.12.5.tar.xz && cd Python-3.12.5
./configure --prefix=/usr --enable-shared --without-ensurepip
make && make install
cd .. && rm -rf Python-3.12.5`}),e.jsx("h2",{children:"Texinfo"}),e.jsx(r,{language:"bash",code:`tar -xf texinfo-7.2.tar.xz && cd texinfo-7.2
./configure --prefix=/usr
make && make install
cd .. && rm -rf texinfo-7.2`}),e.jsx("h2",{children:"Util-linux"}),e.jsx(r,{language:"bash",code:`tar -xf util-linux-2.41.1.tar.xz && cd util-linux-2.41.1

mkdir -pv /var/lib/hwclock

./configure --libdir=/usr/lib     \\
            --runstatedir=/run    \\
            --disable-chfn-chsh   \\
            --disable-login       \\
            --disable-nologin     \\
            --disable-su          \\
            --disable-setpriv     \\
            --disable-runuser     \\
            --disable-pylibmount  \\
            --disable-static      \\
            --without-python      \\
            ADJTIME_PATH=/var/lib/hwclock/adjtime \\
            --docdir=/usr/share/doc/util-linux-2.41.1

make && make install
cd .. && rm -rf util-linux-2.41.1`})]})}export{n as default};

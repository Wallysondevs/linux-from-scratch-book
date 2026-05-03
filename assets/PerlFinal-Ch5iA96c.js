import{j as r}from"./index-CGptwfLb.js";import{P as l}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";function o(){return r.jsxs(l,{title:"Perl (final), XML::Parser, Intltool",subtitle:"Versão final do Perl, parser XML em Perl, e Intltool (i18n).",difficulty:"intermediario",timeToRead:"5 min",children:[r.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),r.jsx("h2",{children:"Glossário rápido"}),r.jsxs("ul",{children:[r.jsxs("li",{children:[r.jsx("strong",{children:"Perl"})," "," — "," ","linguagem útil."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Final"})," "," — "," ","dentro chroot."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Configure"})," "," — "," ","sh Configure."]})]}),r.jsx("h2",{children:"Perl (final)"}),r.jsx(e,{language:"bash",code:`cd /sources
tar -xf perl-5.42.0.tar.xz && cd perl-5.42.0

export BUILD_ZLIB=False
export BUILD_BZIP2=0

sh Configure -des                                          \\
             -D prefix=/usr                                \\
             -D vendorprefix=/usr                          \\
             -D privlib=/usr/lib/perl5/5.40/core_perl      \\
             -D archlib=/usr/lib/perl5/5.40/core_perl      \\
             -D sitelib=/usr/lib/perl5/5.40/site_perl      \\
             -D sitearch=/usr/lib/perl5/5.40/site_perl     \\
             -D vendorlib=/usr/lib/perl5/5.40/vendor_perl  \\
             -D vendorarch=/usr/lib/perl5/5.40/vendor_perl \\
             -D man1dir=/usr/share/man/man1                \\
             -D man3dir=/usr/share/man/man3                \\
             -D pager="/usr/bin/less -isR"                 \\
             -D useshrplib                                 \\
             -D usethreads

make
make test
make install
unset BUILD_ZLIB BUILD_BZIP2
cd .. && rm -rf perl-5.42.0`}),r.jsx("h2",{children:"XML::Parser"}),r.jsx(e,{language:"bash",code:`tar -xf XML-Parser-2.47.tar.gz && cd XML-Parser-2.47
perl Makefile.PL
make && make install
cd .. && rm -rf XML-Parser-2.47`}),r.jsx("h2",{children:"Intltool"}),r.jsx(e,{language:"bash",code:`tar -xf intltool-0.51.0.tar.gz && cd intltool-0.51.0
sed -i 's:\\\\\\\${:\\\\\\$\\\\{:' intltool-update.in
./configure --prefix=/usr
make && make install
install -v -Dm644 doc/I18N-HOWTO /usr/share/doc/intltool-0.51.0/I18N-HOWTO
cd .. && rm -rf intltool-0.51.0`})]})}export{o as default};

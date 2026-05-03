import{j as e}from"./index-CGptwfLb.js";import{P as o}from"./PageContainer-DhWxB77g.js";import{C as i}from"./CodeBlock-DiEVa7fR.js";import{A as s}from"./AlertBox-DblzR--W.js";function n(){return e.jsxs(o,{title:"Glibc (final)",subtitle:"Recompilando a Glibc dentro do chroot, agora com testes e configuração completa.",difficulty:"avancado",timeToRead:"8 min",children:[e.jsx(s,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Glibc"})," "," — "," ","C library."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Localedef"})," "," — "," ","locales."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"/etc/nsswitch.conf"})," "," — "," ","config."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Tests"})," "," — "," ","muitos."]})]}),e.jsx("h2",{children:"Build"}),e.jsx(i,{language:"bash",code:`cd /sources
tar -xf glibc-2.42.tar.xz && cd glibc-2.42

patch -Np1 -i ../glibc-2.42-fhs-1.patch

mkdir -v build && cd build

echo "rootsbindir=/usr/sbin" > configparms

../configure --prefix=/usr                     \\
             --disable-werror                  \\
             --enable-kernel=4.19              \\
             --enable-stack-protector=strong   \\
             --disable-nscd                    \\
             libc_cv_slibdir=/usr/lib

make
make check  # alguns testes podem falhar — leia o livro oficial

# /etc/ld.so.conf padrão
touch /etc/ld.so.conf
sed '/test-installation/s@$(PERL)@echo not running@' -i ../Makefile
make install`}),e.jsx("h2",{children:"Configurando o nsswitch.conf"}),e.jsx(i,{language:"bash",code:`cat > /etc/nsswitch.conf << "EOF"
passwd: files
group: files
shadow: files
hosts: files dns
networks: files
protocols: files
services: files
ethers: files
rpc: files
EOF`}),e.jsx("h2",{children:"Locales"}),e.jsx(i,{language:"bash",code:`mkdir -pv /usr/lib/locale
localedef -i C        -f UTF-8 C.UTF-8
localedef -i en_US    -f ISO-8859-1 en_US
localedef -i en_US    -f UTF-8 en_US.UTF-8
localedef -i pt_BR    -f UTF-8 pt_BR.UTF-8`}),e.jsx("h2",{children:"Time zone"}),e.jsx(i,{language:"bash",code:`tar -xf ../../tzdata2024a.tar.gz

ZONEINFO=/usr/share/zoneinfo
mkdir -pv $ZONEINFO/{posix,right}
for tz in etcetera southamerica northamerica europe africa antarctica  \\
          asia australasia backward; do
  zic -L /dev/null   -d $ZONEINFO       $tz
  zic -L /dev/null   -d $ZONEINFO/posix $tz
  zic -L leapseconds -d $ZONEINFO/right $tz
done

cp -v zone.tab zone1970.tab iso3166.tab $ZONEINFO
zic -d $ZONEINFO -p America/Sao_Paulo
ln -sfv /usr/share/zoneinfo/America/Sao_Paulo /etc/localtime

cd .. && cd ..
rm -rf glibc-2.42`}),e.jsxs(s,{type:"success",title:"Glibc final instalada",children:["Esta é a Glibc que vai rodar quando você der boot no LFS. A versão anterior em ",e.jsx("code",{children:"/tools"})," não será usada após este ponto."]})]})}export{n as default};

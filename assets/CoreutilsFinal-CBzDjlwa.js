import{j as r}from"./index-CGptwfLb.js";import{P as s}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";function a(){return r.jsxs(s,{title:"Coreutils (final)",subtitle:"ls, cp, mv, cat... agora com test suite completo e suporte a ACLs / atributos estendidos.",difficulty:"intermediario",timeToRead:"4 min",children:[r.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),r.jsx("h2",{children:"Glossário rápido"}),r.jsxs("ul",{children:[r.jsxs("li",{children:[r.jsx("strong",{children:"Coreutils"})," "," — "," ","ls cp mv rm."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"Final"})," "," — "," ","dentro chroot."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"--prefix=/usr"})," "," — "," ","padrão."]})]}),r.jsx("h2",{children:"Build"}),r.jsx(e,{language:"bash",code:`cd /sources
tar -xf coreutils-9.7.tar.xz && cd coreutils-9.7

patch -Np1 -i ../coreutils-9.7-i18n-2.patch

autoreconf -fiv
FORCE_UNSAFE_CONFIGURE=1 ./configure \\
            --prefix=/usr            \\
            --enable-no-install-program=kill,uptime

make
make NON_ROOT_USERNAME=tester install
chown -R root:root /usr/share/zsh/site-functions/* 2>/dev/null || true

# Reorganização FHS
mv -v /usr/bin/chroot              /usr/sbin
mv -v /usr/share/man/man1/chroot.1 /usr/share/man/man8/chroot.8
sed -i 's/"1"/"8"/'                /usr/share/man/man8/chroot.8

cd .. && rm -rf coreutils-9.7`}),r.jsx("h2",{children:"Check"}),r.jsx(e,{language:"bash",code:`# Para rodar os testes (opcional, demorado):
# make NON_ROOT_USERNAME=tester check-root
# su tester -c "PATH=$PATH make RUN_EXPENSIVE_TESTS=yes check"`})]})}export{a as default};

import{j as e}from"./index-ZrM6Gh7j.js";import{P as o}from"./PageContainer-jOSfeH0u.js";import{C as r}from"./CodeBlock-cFXLaLiU.js";function i(){return e.jsxs(o,{title:"Coreutils (final)",subtitle:"ls, cp, mv, cat... agora com test suite completo e suporte a ACLs / atributos estendidos.",difficulty:"intermediario",timeToRead:"4 min",children:[e.jsx("h2",{children:"Build"}),e.jsx(r,{language:"bash",code:`cd /sources
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

cd .. && rm -rf coreutils-9.7`}),e.jsx("h2",{children:"Check"}),e.jsx(r,{language:"bash",code:`# Para rodar os testes (opcional, demorado):
# make NON_ROOT_USERNAME=tester check-root
# su tester -c "PATH=$PATH make RUN_EXPENSIVE_TESTS=yes check"`})]})}export{i as default};

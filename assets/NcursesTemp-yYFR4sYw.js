import{j as s}from"./index-ZrM6Gh7j.js";import{P as r}from"./PageContainer-jOSfeH0u.js";import{C as e}from"./CodeBlock-cFXLaLiU.js";function o(){return s.jsxs(r,{title:"Ncurses",subtitle:"Biblioteca para construir interfaces de terminal. Precisa ser compilada com truques de bootstrap.",difficulty:"avancado",timeToRead:"5 min",children:[s.jsx("h2",{children:"Build"}),s.jsx(e,{language:"bash",code:`cd $LFS/sources
tar -xf ncurses-6.5.tar.gz
cd ncurses-6.5

# Garante que libtic será gerada
sed -i s/mawk// configure

# Constrói tic primeiro (para o host)
mkdir build
pushd build
  ../configure
  make -C include
  make -C progs tic
popd

./configure --prefix=/usr                \\
            --host=$LFS_TGT              \\
            --build=$(./config.guess)    \\
            --mandir=/usr/share/man      \\
            --with-manpage-format=normal \\
            --with-shared                \\
            --without-normal             \\
            --with-cxx-shared            \\
            --without-debug              \\
            --without-ada                \\
            --disable-stripping

make
make DESTDIR=$LFS TIC_PATH=$(pwd)/build/progs/tic install
ln -sv libncursesw.so $LFS/usr/lib/libncurses.so

sed -e 's/^#if.*XOPEN.*$/#if 1/' \\
    -i $LFS/usr/include/curses.h

cd $LFS/sources
rm -rf ncurses-6.5`})]})}export{o as default};

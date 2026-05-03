import{j as s}from"./index-CGptwfLb.js";import{P as n}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";function a(){return s.jsxs(n,{title:"Python (final), Wheel, Ninja, Meson",subtitle:"Python definitivo + ferramentas de build Python e Ninja/Meson para projetos modernos.",difficulty:"intermediario",timeToRead:"5 min",children:[s.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),s.jsx("h2",{children:"Glossário rápido"}),s.jsxs("ul",{children:[s.jsxs("li",{children:[s.jsx("strong",{children:"Python"})," "," — "," ","3.x."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Final"})," "," — "," ","dentro chroot."]}),s.jsxs("li",{children:[s.jsx("strong",{children:"Pacotes"})," "," — "," ","pip3 depois."]})]}),s.jsx("h2",{children:"Python (final)"}),s.jsx(e,{language:"bash",code:`cd /sources
tar -xf Python-3.12.5.tar.xz && cd Python-3.12.5

./configure --prefix=/usr        \\
            --enable-shared      \\
            --with-system-expat  \\
            --enable-optimizations

make
make install

cat > /etc/pip.conf << EOF
[global]
root-user-action = ignore
disable-pip-version-check = true
EOF
cd .. && rm -rf Python-3.12.5`}),s.jsx("h2",{children:"Wheel"}),s.jsx(e,{language:"bash",code:`tar -xf wheel-0.46.1.tar.gz && cd wheel-0.46.1
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --find-links=dist wheel
cd .. && rm -rf wheel-0.46.1`}),s.jsx("h2",{children:"Setuptools"}),s.jsx(e,{language:"bash",code:`tar -xf setuptools-80.9.0.tar.gz && cd setuptools-80.9.0
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --find-links dist setuptools
cd .. && rm -rf setuptools-80.9.0`}),s.jsx("h2",{children:"Ninja"}),s.jsx(e,{language:"bash",code:`tar -xf ninja-1.12.1.tar.gz && cd ninja-1.12.1
export NINJAJOBS=$(nproc)
sed -i '/int Guess/a \\
  int   j = 0;\\
  char* jobs = getenv( "NINJAJOBS" );\\
  if ( jobs != NULL ) j = atoi( jobs );\\
  if ( j > 0 ) return j;\\
' src/ninja.cc

python3 configure.py --bootstrap
install -vm755 ninja /usr/bin/
install -vDm644 misc/bash-completion /usr/share/bash-completion/completions/ninja
install -vDm644 misc/zsh-completion  /usr/share/zsh/site-functions/_ninja
cd .. && rm -rf ninja-1.12.1`}),s.jsx("h2",{children:"Meson"}),s.jsx(e,{language:"bash",code:`tar -xf meson-1.5.1.tar.gz && cd meson-1.5.1
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --find-links dist meson
install -vDm644 data/shell-completions/bash/meson \\
  /usr/share/bash-completion/completions/meson
install -vDm644 data/shell-completions/zsh/_meson \\
  /usr/share/zsh/site-functions/_meson
cd .. && rm -rf meson-1.5.1`})]})}export{a as default};

import{j as r}from"./index-CGptwfLb.js";import{P as e}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";function l(){return r.jsxs(e,{title:"GMP, MPFR, MPC",subtitle:"Bibliotecas matemáticas usadas pelo GCC final, GDB e várias outras.",difficulty:"intermediario",timeToRead:"4 min",children:[r.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),r.jsx("h2",{children:"Glossário rápido"}),r.jsxs("ul",{children:[r.jsxs("li",{children:[r.jsx("strong",{children:"GMP"})," "," — "," ","arbitrary precision."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"MPFR"})," "," — "," ","floats arbitrários."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"MPC"})," "," — "," ","complexos."]}),r.jsxs("li",{children:[r.jsx("strong",{children:"GCC deps"})," "," — "," ","obrigatório."]})]}),r.jsx("h2",{children:"GMP"}),r.jsx(s,{language:"bash",code:`cd /sources
tar -xf gmp-6.3.0.tar.xz && cd gmp-6.3.0

./configure --prefix=/usr    \\
            --enable-cxx     \\
            --disable-static \\
            --docdir=/usr/share/doc/gmp-6.3.0
make
make html
make install
make install-html
cd .. && rm -rf gmp-6.3.0`}),r.jsx("h2",{children:"MPFR"}),r.jsx(s,{language:"bash",code:`tar -xf mpfr-4.2.2.tar.xz && cd mpfr-4.2.2
sed -e 's/+01,234,567/+1,234,567 /' \\
    -e 's/13.10Pd/13Pd/'            \\
    -i tests/tsprintf.c

./configure --prefix=/usr        \\
            --disable-static     \\
            --enable-thread-safe \\
            --docdir=/usr/share/doc/mpfr-4.2.2
make
make html
make install
make install-html
cd .. && rm -rf mpfr-4.2.2`}),r.jsx("h2",{children:"MPC"}),r.jsx(s,{language:"bash",code:`tar -xf mpc-1.3.1.tar.gz && cd mpc-1.3.1
./configure --prefix=/usr --disable-static --docdir=/usr/share/doc/mpc-1.3.1
make && make install
cd .. && rm -rf mpc-1.3.1`})]})}export{l as default};

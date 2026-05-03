import{j as a}from"./index-Dq2pq_L0.js";import{P as r}from"./PageContainer-CRFAuOt2.js";import{C as e}from"./CodeBlock-DfTRrP6d.js";function m(){return a.jsxs(r,{title:"GMP, MPFR, MPC",subtitle:"Bibliotecas matemáticas usadas pelo GCC final, GDB e várias outras.",difficulty:"intermediario",timeToRead:"4 min",children:[a.jsx("h2",{children:"GMP"}),a.jsx(e,{language:"bash",code:`cd /sources
tar -xf gmp-6.3.0.tar.xz && cd gmp-6.3.0

./configure --prefix=/usr    \\
            --enable-cxx     \\
            --disable-static \\
            --docdir=/usr/share/doc/gmp-6.3.0
make
make html
make install
make install-html
cd .. && rm -rf gmp-6.3.0`}),a.jsx("h2",{children:"MPFR"}),a.jsx(e,{language:"bash",code:`tar -xf mpfr-4.2.2.tar.xz && cd mpfr-4.2.2
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
cd .. && rm -rf mpfr-4.2.2`}),a.jsx("h2",{children:"MPC"}),a.jsx(e,{language:"bash",code:`tar -xf mpc-1.3.1.tar.gz && cd mpc-1.3.1
./configure --prefix=/usr --disable-static --docdir=/usr/share/doc/mpc-1.3.1
make && make install
cd .. && rm -rf mpc-1.3.1`})]})}export{m as default};

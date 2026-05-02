import{j as e}from"./index-K1a8hxkV.js";import{P as i}from"./PageContainer-BFvVnrCN.js";import{C as n}from"./CodeBlock-DvB8XoAE.js";import{A as a}from"./AlertBox-C_JmkQL6.js";function c(){return e.jsxs(i,{title:"Requisitos do Host",subtitle:"O que precisa estar instalado e funcionando no Linux que você vai usar como base.",difficulty:"iniciante",timeToRead:"5 min",children:[e.jsx("h2",{children:"Versões mínimas exigidas pelo LFS 12.4"}),e.jsx("p",{children:"O livro oficial exige (no mínimo) as seguintes versões instaladas no host:"}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Bash ≥ 3.2 (link ",e.jsx("code",{children:"/bin/sh"})," apontando para bash ou compatível)"]}),e.jsx("li",{children:"Binutils ≥ 2.13.1 (recomendado < 2.42 para evitar incompatibilidades)"}),e.jsx("li",{children:"Bison ≥ 2.7"}),e.jsx("li",{children:"Coreutils ≥ 6.9"}),e.jsx("li",{children:"Diffutils ≥ 2.8.1"}),e.jsx("li",{children:"Findutils ≥ 4.2.31"}),e.jsx("li",{children:"Gawk ≥ 4.0.1"}),e.jsx("li",{children:"GCC ≥ 5.2 (incluindo g++)"}),e.jsx("li",{children:"Glibc 2.11 a 2.40"}),e.jsx("li",{children:"Grep ≥ 2.5.1a"}),e.jsx("li",{children:"Gzip ≥ 1.3.12"}),e.jsx("li",{children:"Linux Kernel ≥ 4.19"}),e.jsx("li",{children:"M4 ≥ 1.4.10"}),e.jsx("li",{children:"Make ≥ 4.0"}),e.jsx("li",{children:"Patch ≥ 2.5.4"}),e.jsx("li",{children:"Perl ≥ 5.8.8"}),e.jsx("li",{children:"Python ≥ 3.4"}),e.jsx("li",{children:"Sed ≥ 4.1.5"}),e.jsx("li",{children:"Tar ≥ 1.22"}),e.jsx("li",{children:"Texinfo ≥ 5.0"}),e.jsx("li",{children:"Xz ≥ 5.0.0"})]}),e.jsx("h2",{children:"Como verificar tudo de uma vez"}),e.jsxs("p",{children:["O LFS publica um script ",e.jsx("code",{children:"version-check.sh"})," que confere todas as versões. Baixe e rode ele:"]}),e.jsx(n,{language:"bash",code:`cat > version-check.sh << "EOF"
#!/bin/bash
# Versões mínimas para LFS 12.4
export LC_ALL=C
bash --version | head -n1 | cut -d" " -f2-4
MYSH=$(readlink -f /bin/sh)
echo "/bin/sh -> $MYSH"
echo $MYSH | grep -q bash || echo "ERRO: /bin/sh nao aponta para bash"
unset MYSH

echo -n "Binutils: "; ld --version | head -n1 | cut -d" " -f3-
bison --version | head -n1
if [ -h /usr/bin/yacc ]; then
  echo "/usr/bin/yacc -> \`readlink -f /usr/bin/yacc\`"
elif [ -x /usr/bin/yacc ]; then
  echo yacc is \`/usr/bin/yacc --version | head -n1\`
else
  echo "yacc nao encontrado"
fi

echo -n "Coreutils: "; chown --version | head -n1 | cut -d")" -f2
diff --version | head -n1
find --version | head -n1
gawk --version | head -n1

if [ -h /usr/bin/awk ]; then
  echo "/usr/bin/awk -> \`readlink -f /usr/bin/awk\`"
elif [ -x /usr/bin/awk ]; then
  echo awk is \`/usr/bin/awk --version | head -n1\`
else
  echo "awk nao encontrado"
fi

gcc --version | head -n1
g++ --version | head -n1
ldd --version | head -n1 | cut -d" " -f2-
grep --version | head -n1
gzip --version | head -n1
cat /proc/version
m4 --version | head -n1
make --version | head -n1
patch --version | head -n1
echo Perl \`perl -V:version\`
python3 --version
sed --version | head -n1
tar --version | head -n1
makeinfo --version | head -n1
xz --version | head -n1

echo 'int main(){}' > dummy.c && g++ -o dummy dummy.c
if [ -x dummy ]; then
  echo "g++ compilation OK";
else
  echo "g++ compilation falhou"
fi
rm -f dummy.c dummy
EOF

bash version-check.sh`}),e.jsxs(a,{type:"warning",title:"Faltou alguma dependência?",children:['Se aparecer "comando não encontrado" ou versão antiga, instale o pacote correspondente pelo gerenciador da sua distro (ex.: ',e.jsx("code",{children:"apt install bison"}),",",e.jsx("code",{children:"dnf install texinfo"}),"). Resolva tudo antes de seguir."]}),e.jsx("h2",{children:"Disco / VM"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Mínimo: 30 GB. Recomendado: 50–60 GB para folga."}),e.jsx("li",{children:"Idealmente, um disco virtual ou partição inteira dedicada — não dentro da partição do host."}),e.jsx("li",{children:"SSD acelera muito (compilar gera muito I/O)."})]}),e.jsx("h2",{children:"Conexão & energia"}),e.jsxs("ul",{children:[e.jsx("li",{children:"Banda larga estável para baixar ~700 MB de fontes."}),e.jsxs("li",{children:["No-break ou bateria carregada: queda de luz no meio do ",e.jsx("code",{children:"make install"})," da Glibc é bem chato."]})]})]})}export{c as default};

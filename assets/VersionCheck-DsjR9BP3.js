import{j as e}from"./index-K1a8hxkV.js";import{P as i}from"./PageContainer-BFvVnrCN.js";import{C as s}from"./CodeBlock-DvB8XoAE.js";import{A as a}from"./AlertBox-C_JmkQL6.js";function d(){return e.jsxs(i,{title:"Verificando o Sistema",subtitle:"Confirme que /bin/sh aponta para bash, que existem links de awk/yacc, e que /usr/bin tem o suficiente.",difficulty:"iniciante",timeToRead:"4 min",children:[e.jsx("h2",{children:"Por que isso importa?"}),e.jsxs("p",{children:["Vários scripts do LFS assumem que ",e.jsx("code",{children:"/bin/sh"})," é Bash, e que"," ",e.jsx("code",{children:"awk"})," existe (algumas distros só instalam ",e.jsx("code",{children:"gawk"})," ou"," ",e.jsx("code",{children:"mawk"})," sem o link ",e.jsx("code",{children:"/usr/bin/awk"}),"). Se faltar, configure ",e.jsx("em",{children:"antes"})," de tudo:"]}),e.jsx("h2",{children:"Checagens rápidas"}),e.jsx(s,{language:"bash",code:`# /bin/sh deve apontar para bash
readlink -f /bin/sh
# Esperado: /usr/bin/bash (ou /bin/bash)

# awk deve existir como link
which awk
# Se vazio: ln -s gawk /usr/bin/awk (ajuste para sua distro)`}),e.jsx("h2",{children:"Em Ubuntu / Debian"}),e.jsxs("p",{children:["Por padrão, Ubuntu/Debian usam ",e.jsx("code",{children:"dash"})," como ",e.jsx("code",{children:"/bin/sh"}),", que é mais leve mas menos compatível. ",e.jsx("strong",{children:"Reconfigure"}),":"]}),e.jsx(s,{language:"bash",code:"sudo dpkg-reconfigure dash"}),e.jsxs("p",{children:['Quando perguntar "Use dash as the default system shell (/bin/sh)?", responda ',e.jsx("strong",{children:"No"}),"."]}),e.jsxs(a,{type:"warning",title:"Faça isso antes de qualquer build do LFS",children:["Esquecer esse passo gera erros estranhos em scripts ",e.jsx("code",{children:"configure"})," ","depois. Vale 30 segundos."]}),e.jsx("h2",{children:"Symlinks normalmente faltantes"}),e.jsx(s,{language:"bash",code:`# yacc → bison
[ -e /usr/bin/yacc ] || sudo ln -sv bison /usr/bin/yacc

# awk → gawk
[ -e /usr/bin/awk ] || sudo ln -sv gawk /usr/bin/awk`}),e.jsx("h2",{children:"Conferindo o GCC consegue compilar C++"}),e.jsx("p",{children:"Vários pacotes do LFS exigem g++. Teste:"}),e.jsx(s,{language:"bash",code:`echo 'int main(){}' > /tmp/dummy.cc
g++ -o /tmp/dummy /tmp/dummy.cc && echo "g++ OK"
rm /tmp/dummy /tmp/dummy.cc`}),e.jsxs(a,{type:"success",title:"Tudo verde?",children:["Vá para ",e.jsx("a",{href:"#/particionamento",children:"Particionamento"})," e prepare o disco do LFS."]})]})}export{d as default};

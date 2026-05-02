import{j as e}from"./index-K1a8hxkV.js";import{P as o}from"./PageContainer-BFvVnrCN.js";import{C as r}from"./CodeBlock-DvB8XoAE.js";import{A as s}from"./AlertBox-C_JmkQL6.js";function l(){return e.jsxs(o,{title:"O Diretório /sources",subtitle:"Por que ele fica em /mnt/lfs/sources e como organizar todo o trabalho ali.",difficulty:"iniciante",timeToRead:"3 min",children:[e.jsxs("h2",{children:["Por que ",e.jsx("code",{children:"$LFS/sources"}),"?"]}),e.jsxs("ul",{children:[e.jsxs("li",{children:["Estará disponível depois do chroot como ",e.jsx("code",{children:"/sources"})," — ou seja, os tarballs podem ser extraídos lá dentro também."]}),e.jsx("li",{children:"Centraliza tudo num único lugar — fácil de fazer backup."}),e.jsxs("li",{children:["Permanece com permissões abertas para o usuário ",e.jsx("code",{children:"lfs"})," trabalhar."]})]}),e.jsx("h2",{children:"Permissões essenciais"}),e.jsxs("p",{children:["O bit ",e.jsx("code",{children:"t"})," (sticky) garante que cada arquivo só pode ser apagado pelo dono. ",e.jsx("code",{children:"a+w"})," permite escrita por todos:"]}),e.jsx(r,{language:"bash",code:`chmod -v a+wt $LFS/sources

# verificando:
stat -c "%a %n" $LFS/sources
# 1777 /mnt/lfs/sources`}),e.jsx("h2",{children:"Padrão de extração"}),e.jsx("p",{children:"Em todo capítulo, o livro pede que você:"}),e.jsxs("ol",{children:[e.jsxs("li",{children:["Vá para ",e.jsx("code",{children:"$LFS/sources"}),"."]}),e.jsxs("li",{children:["Extraia o tarball (",e.jsx("code",{children:"tar -xf nome.tar.xz"}),")."]}),e.jsx("li",{children:"Entre no diretório criado."}),e.jsx("li",{children:"Faça o build."}),e.jsxs("li",{children:["Saia para ",e.jsx("code",{children:"../"})," e ",e.jsx("strong",{children:"apague"})," o diretório extraído."]})]}),e.jsx(r,{language:"bash",code:`cd $LFS/sources
tar -xf bash-5.3.tar.gz
cd bash-5.3

# ... build aqui ...

cd ..
rm -rf bash-5.3`}),e.jsxs(s,{type:"info",title:"Por que apagar?",children:["Mantém ",e.jsx("code",{children:"/sources"})," limpo e evita confusão com diretórios de builds antigas. Se algo der errado, basta extrair de novo (o tarball original continua lá)."]})]})}export{l as default};

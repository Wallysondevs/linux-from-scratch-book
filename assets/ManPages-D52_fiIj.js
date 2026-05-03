import{j as e}from"./index-CGptwfLb.js";import{P as a}from"./PageContainer-DhWxB77g.js";import{C as s}from"./CodeBlock-DiEVa7fR.js";function o(){return e.jsxs(a,{title:"Man-pages, Iana-Etc",subtitle:"Páginas de manual do Linux e arquivos de protocolos/serviços padrão.",difficulty:"iniciante",timeToRead:"3 min",children:[e.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),e.jsx("h2",{children:"Glossário rápido"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"man-pages"})," "," — "," ","tarball pt-BR."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Section 1-9"})," "," — "," ","manuais."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"mandb"})," "," — "," ","índice."]})]}),e.jsx("h2",{children:"Man-pages"}),e.jsx(s,{language:"bash",code:`cd /sources
tar -xf man-pages-6.15.tar.xz && cd man-pages-6.15

rm -v man3/crypt*
make prefix=/usr install
cd .. && rm -rf man-pages-6.15`}),e.jsx("h2",{children:"Iana-Etc"}),e.jsx(s,{language:"bash",code:`tar -xf iana-etc-20240806.tar.gz && cd iana-etc-20240806

cp services protocols /etc

cd .. && rm -rf iana-etc-20240806`}),e.jsxs("p",{className:"text-sm text-muted-foreground mt-4",children:[e.jsx("code",{children:"/etc/services"})," e ",e.jsx("code",{children:"/etc/protocols"})," são consultados por programas de rede para mapear nomes (HTTP, SSH...) a portas/números."]})]})}export{o as default};

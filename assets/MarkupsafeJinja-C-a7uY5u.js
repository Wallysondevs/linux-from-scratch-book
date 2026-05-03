import{j as i}from"./index-CGptwfLb.js";import{P as s}from"./PageContainer-DhWxB77g.js";import{C as e}from"./CodeBlock-DiEVa7fR.js";function o(){return i.jsxs(s,{title:"MarkupSafe & Jinja2",subtitle:"Dependências Python necessárias para o Systemd e algumas ferramentas de build.",difficulty:"iniciante",timeToRead:"3 min",children:[i.jsx(AlertBox,{type:"info",title:"Pré-requisitos",children:'Ter sistema Linux funcional como host e ler "O que é LFS".'}),i.jsx("h2",{children:"Glossário rápido"}),i.jsxs("ul",{children:[i.jsxs("li",{children:[i.jsx("strong",{children:"MarkupSafe"})," "," — "," ","escapes."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Jinja2"})," "," — "," ","templates."]}),i.jsxs("li",{children:[i.jsx("strong",{children:"Python deps"})," "," — "," ","para build."]})]}),i.jsx("h2",{children:"MarkupSafe"}),i.jsx(e,{language:"bash",code:`cd /sources
tar -xf markupsafe-3.0.2.tar.gz && cd markupsafe-3.0.2
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --no-user --find-links dist Markupsafe
cd .. && rm -rf markupsafe-3.0.2`}),i.jsx("h2",{children:"Jinja2"}),i.jsx(e,{language:"bash",code:`tar -xf jinja2-3.1.4.tar.gz && cd jinja2-3.1.4
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --no-user --find-links dist Jinja2
cd .. && rm -rf jinja2-3.1.4`})]})}export{o as default};

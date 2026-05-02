import{j as a}from"./index-K1a8hxkV.js";import{P as e}from"./PageContainer-BFvVnrCN.js";import{C as i}from"./CodeBlock-DvB8XoAE.js";function d(){return a.jsxs(e,{title:"MarkupSafe & Jinja2",subtitle:"Dependências Python necessárias para o Systemd e algumas ferramentas de build.",difficulty:"iniciante",timeToRead:"3 min",children:[a.jsx("h2",{children:"MarkupSafe"}),a.jsx(i,{language:"bash",code:`cd /sources
tar -xf markupsafe-3.0.2.tar.gz && cd markupsafe-3.0.2
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --no-user --find-links dist Markupsafe
cd .. && rm -rf markupsafe-3.0.2`}),a.jsx("h2",{children:"Jinja2"}),a.jsx(i,{language:"bash",code:`tar -xf jinja2-3.1.4.tar.gz && cd jinja2-3.1.4
pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --no-user --find-links dist Jinja2
cd .. && rm -rf jinja2-3.1.4`})]})}export{d as default};

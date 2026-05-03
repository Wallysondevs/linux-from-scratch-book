import{j as a}from"./index-ZrM6Gh7j.js";import{P as s}from"./PageContainer-jOSfeH0u.js";import{C as e}from"./CodeBlock-cFXLaLiU.js";function c(){return a.jsxs(s,{title:"Man-pages, Iana-Etc",subtitle:"Páginas de manual do Linux e arquivos de protocolos/serviços padrão.",difficulty:"iniciante",timeToRead:"3 min",children:[a.jsx("h2",{children:"Man-pages"}),a.jsx(e,{language:"bash",code:`cd /sources
tar -xf man-pages-6.15.tar.xz && cd man-pages-6.15

rm -v man3/crypt*
make prefix=/usr install
cd .. && rm -rf man-pages-6.15`}),a.jsx("h2",{children:"Iana-Etc"}),a.jsx(e,{language:"bash",code:`tar -xf iana-etc-20240806.tar.gz && cd iana-etc-20240806

cp services protocols /etc

cd .. && rm -rf iana-etc-20240806`}),a.jsxs("p",{className:"text-sm text-muted-foreground mt-4",children:[a.jsx("code",{children:"/etc/services"})," e ",a.jsx("code",{children:"/etc/protocols"})," são consultados por programas de rede para mapear nomes (HTTP, SSH...) a portas/números."]})]})}export{c as default};

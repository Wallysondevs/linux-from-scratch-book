import{j as e}from"./index-Dq2pq_L0.js";import{P as n}from"./PageContainer-CRFAuOt2.js";import{C as s}from"./CodeBlock-DfTRrP6d.js";import{A as a}from"./AlertBox-DFdNRTyW.js";import{P as i}from"./PracticeBox-BXFoiNe5.js";function t(){return e.jsxs(n,{title:"Man-Pages",subtitle:"A documentação canônica do Linux: chamadas de sistema, funções da libc, formatos de arquivo, protocolos. ~2.000 páginas instaladas em /usr/share/man.",difficulty:"iniciante",timeToRead:"4 min",children:[e.jsx("h2",{children:"O que é o pacote man-pages?"}),e.jsxs("p",{children:["Não confunda com o programa ",e.jsx("code",{children:"man"})," (que vem do",e.jsx("code",{children:" man-db"}),"). O pacote ",e.jsx("strong",{children:"man-pages"})," é só o conteúdo: páginas das seções 2 (syscalls), 3 (libc), 4 (devices), 5 (file formats), 7 (overview) e 8 (admin). Mantido pelo Michael Kerrisk e atualizado constantemente."]}),e.jsx(a,{type:"info",title:"Seções do man",children:e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("strong",{children:"1"})," — comandos de usuário (",e.jsx("code",{children:"ls"}),", ",e.jsx("code",{children:"grep"}),")"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"2"})," — chamadas de sistema (",e.jsx("code",{children:"open"}),", ",e.jsx("code",{children:"fork"}),")"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"3"})," — funções de biblioteca (",e.jsx("code",{children:"printf"}),", ",e.jsx("code",{children:"malloc"}),")"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"4"})," — devices em ",e.jsx("code",{children:"/dev"})]}),e.jsxs("li",{children:[e.jsx("strong",{children:"5"})," — formatos de arquivo (",e.jsx("code",{children:"passwd"}),", ",e.jsx("code",{children:"fstab"}),")"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"7"})," — visões gerais (",e.jsx("code",{children:"signal"}),", ",e.jsx("code",{children:"tcp"}),")"]}),e.jsxs("li",{children:[e.jsx("strong",{children:"8"})," — administração (",e.jsx("code",{children:"mount"}),", ",e.jsx("code",{children:"iptables"}),")"]})]})}),e.jsx("h2",{children:"Build (dentro do chroot)"}),e.jsx(s,{language:"bash",code:`cd /sources
tar -xf man-pages-6.16.tar.xz
cd man-pages-6.16

# Remove páginas que conflitam com outros pacotes:
rm -v man3/crypt*

make prefix=/usr install

cd /sources
rm -rf man-pages-6.16`}),e.jsx("h2",{children:"Por que remover crypt?"}),e.jsxs("p",{children:["As páginas ",e.jsx("code",{children:"crypt(3)"})," e ",e.jsx("code",{children:"crypt_r(3)"}),"do man-pages descrevem a versão clássica da glibc — que foi movida para ",e.jsx("code",{children:"libxcrypt"}),". Manter as duas gera documentação contraditória. O LFS sempre prioriza a página do pacote dono da função."]}),e.jsx("h2",{children:"Casos práticos"}),e.jsx(s,{language:"bash",code:`# Conferir quantas páginas foram instaladas:
find /usr/share/man -type f | wc -l
# ~2.000

# Ler uma syscall:
man 2 open
man 2 fork

# Ler formato de arquivo:
man 5 fstab
man 5 passwd

# Buscar por palavra-chave (precisa de mandb instalado):
apropos socket | head

# Ver todas as seções de um nome:
man -aw signal
# /usr/share/man/man2/signal.2.gz
# /usr/share/man/man7/signal.7.gz`}),e.jsx(i,{title:"Explorar a documentação canônica",children:e.jsxs("ol",{className:"list-decimal ml-5 space-y-1",children:[e.jsxs("li",{children:[e.jsx("code",{children:"man 7 capabilities"})," — visão geral do sistema de capacidades Linux."]}),e.jsxs("li",{children:[e.jsx("code",{children:"man 5 proc"})," — referência completa de ",e.jsx("code",{children:"/proc"})," (gigantesca, ~6.000 linhas)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"man 7 signal-safety"})," — funções seguras em handler de sinal."]}),e.jsxs("li",{children:[e.jsx("code",{children:"man 2 epoll_ctl"})," — base de Nginx, Node.js, etc."]})]})}),e.jsx("h2",{children:"Armadilhas comuns"}),e.jsxs(a,{type:"warning",title:'"man: command not found" depois do install',children:["Você instalou o ",e.jsx("em",{children:"conteúdo"}),", mas não o leitor. O programa",e.jsx("code",{children:" man "})," vem do pacote ",e.jsx("code",{children:"man-db"}),", instalado mais tarde no LFS. Até lá, leia direto: ",e.jsx("code",{children:"zcat /usr/share/man/man2/open.2.gz | less"}),"."]}),e.jsxs(a,{type:"success",title:"Página de manual em PDF",children:["Para gerar PDF de uma página: ",e.jsx("code",{children:"man -t open | ps2pdf - open.pdf"}),". Útil para imprimir referência de syscalls complexas."]}),e.jsx("h2",{children:"Cheat sheet"}),e.jsx(s,{language:"bash",code:`# Tempo: ~0.05 SBU
# Tarball: man-pages-6.16.tar.xz (~3 MB)
# Pré-install: rm -v man3/crypt*
# Comando único: make prefix=/usr install
# Sem teste suite (é só conteúdo)
# Programa leitor (man-db) instalado depois`})]})}export{t as default};

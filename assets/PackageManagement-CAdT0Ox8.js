import{j as a}from"./index-Dq2pq_L0.js";import{P as r}from"./PageContainer-CRFAuOt2.js";import{C as e}from"./CodeBlock-DfTRrP6d.js";import{A as s}from"./AlertBox-DFdNRTyW.js";function l(){return a.jsxs(r,{title:"Gerenciamento de Pacotes",subtitle:"LFS não vem com apt nem dnf. Veja as estratégias que a comunidade usa para gerenciar atualizações.",difficulty:"avancado",timeToRead:"6 min",children:[a.jsx("h2",{children:"Por que LFS não tem package manager?"}),a.jsx("p",{children:"O LFS é educacional — instalar um package manager mascararia o que cada pacote faz. Mas quando você terminar e quiser atualizar pacotes, vai precisar de algum método."}),a.jsx("h2",{children:"Estratégia 1 — Subir tudo pra DESTDIR"}),a.jsx(e,{language:"bash",code:`# Em vez de "make install":
PKG_DIR=/tmp/pkg/foo-1.0
make DESTDIR=$PKG_DIR install

# Empacotar:
tar -cJpf /var/cache/lfs-pkgs/foo-1.0.tar.xz -C $PKG_DIR .

# Listar arquivos:
tar -tf /var/cache/lfs-pkgs/foo-1.0.tar.xz > /var/lib/lfs-pkgs/foo-1.0.list

# Instalar:
cp -av $PKG_DIR/* /

# Remover (lendo a lista invertida):
xargs -d '\\n' rm -fv < /var/lib/lfs-pkgs/foo-1.0.list`}),a.jsx("h2",{children:"Estratégia 2 — Symlinks (Stow / xstow)"}),a.jsx(e,{language:"bash",code:`# Cada pacote vai pra /usr/pkg/foo-1.0
make prefix=/usr/pkg/foo-1.0 install

# Stow gera symlinks em /usr para cada arquivo:
cd /usr/pkg
stow foo-1.0    # cria symlinks
stow -D foo-1.0 # desfaz`}),a.jsx("h2",{children:"Estratégia 3 — Usar um package manager existente"}),a.jsxs("ul",{children:[a.jsxs("li",{children:[a.jsx("strong",{children:"pacman"})," (do Arch) — o LFS Hints tem guia."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"rpm"})," + ",a.jsx("strong",{children:"dnf"})," — possível, mas trabalhoso."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"nix"})," — rodando junto, sem mexer no LFS."]}),a.jsxs("li",{children:[a.jsx("strong",{children:"conary"})," (rPath, descontinuado)."]})]}),a.jsx(s,{type:"info",title:"Para a primeira leitura",children:"Não se preocupe com isso. Termine o livro, dê boot. Depois decida se quer atualizar manualmente ou implementar uma estratégia."})]})}export{l as default};

import{j as e}from"./index-ZrM6Gh7j.js";import{P as r}from"./PageContainer-jOSfeH0u.js";import{C as i}from"./CodeBlock-cFXLaLiU.js";import{A as o}from"./AlertBox-D3Y0IUPD.js";function m(){return e.jsxs(r,{title:"Texinfo & Vim",subtitle:"Texinfo gera documentação info(1). Vim é (provavelmente) o seu editor padrão.",difficulty:"iniciante",timeToRead:"4 min",children:[e.jsx("h2",{children:"Texinfo"}),e.jsx(i,{language:"bash",code:`cd /sources
tar -xf texinfo-7.2.tar.xz && cd texinfo-7.2
./configure --prefix=/usr
make && make install
make TEXMF=/usr/share/texmf install-tex 2>/dev/null || true
pushd /usr/share/info
  rm -v dir
  for f in *
  do install-info $f dir 2>/dev/null
  done
popd
cd .. && rm -rf texinfo-7.2`}),e.jsx("h2",{children:"Vim"}),e.jsx(i,{language:"bash",code:`tar -xf vim-9.1.1629.tar.gz && cd vim-9.1.1629

echo '#define SYS_VIMRC_FILE "/etc/vimrc"' >> src/feature.h

./configure --prefix=/usr
make && make install

ln -sv vim /usr/bin/vi
for L in /usr/share/man/{,*/}man1/vim.1; do
  ln -sv vim.1 $(dirname $L)/vi.1
done

ln -sv ../vim/vim91/doc /usr/share/doc/vim-9.1.1629

cat > /etc/vimrc << "EOF"
" /etc/vimrc — defaults sensatos
set nocompatible
set backspace=2
set mouse=
syntax on
set background=dark
set encoding=utf-8
set fileencoding=utf-8
EOF
cd .. && rm -rf vim-9.1.1629`}),e.jsx(o,{type:"info",title:"Prefere Nano?",children:"Vim é o padrão do livro, mas você pode instalar nano depois (BLFS) se preferir. Para iniciantes, nano é mais amigável; vim recompensa a curva de aprendizado."})]})}export{m as default};

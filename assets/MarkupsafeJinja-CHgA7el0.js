import{j as e}from"./index-Dq2pq_L0.js";import{P as s}from"./PageContainer-CRFAuOt2.js";import{C as i}from"./CodeBlock-DfTRrP6d.js";import{A as a}from"./AlertBox-DFdNRTyW.js";import{P as r}from"./PracticeBox-BXFoiNe5.js";function c(){return e.jsxs(s,{title:"MarkupSafe & Jinja2",subtitle:"Dependências Python do systemd, meson e ninja. Pequenas, mas obrigatórias para gerar arquivos de configuração e templates de unidades.",difficulty:"iniciante",timeToRead:"5 min",children:[e.jsx("h2",{children:"Para que servem?"}),e.jsxs("p",{children:[e.jsx("strong",{children:"MarkupSafe"})," implementa escape seguro de strings para HTML/XML/SQL — base de praticamente toda biblioteca de templates Python. ",e.jsx("strong",{children:"Jinja2"})," é o motor de templates (do Flask, Ansible, Salt) que o ",e.jsx("code",{children:"meson"}),"usa para gerar arquivos de configuração e o ",e.jsx("code",{children:"systemd"}),"usa em unit templates."]}),e.jsxs(a,{type:"info",title:"Por que pacotes Python no LFS base?",children:["Meson (build system do systemd, GNOME, GTK) é escrito em Python e usa Jinja2 internamente. Sem essas duas libs, o",e.jsx("code",{children:" meson setup "})," falha com",e.jsx("code",{children:" ModuleNotFoundError: No module named 'jinja2' "}),"."]}),e.jsx("h2",{children:"MarkupSafe"}),e.jsx(i,{language:"bash",code:`cd /sources
tar -xf MarkupSafe-3.0.2.tar.gz
cd MarkupSafe-3.0.2

pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --no-user --find-links dist Markupsafe

cd /sources
rm -rf MarkupSafe-3.0.2`}),e.jsx("h2",{children:"Jinja2"}),e.jsx(i,{language:"bash",code:`cd /sources
tar -xf Jinja2-3.1.6.tar.gz
cd Jinja2-3.1.6

pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --no-user --find-links dist Jinja2

cd /sources
rm -rf Jinja2-3.1.6`}),e.jsx("h2",{children:"Anatomia das flags pip"}),e.jsxs("ul",{children:[e.jsxs("li",{children:[e.jsx("code",{children:"pip3 wheel -w dist"})," — gera o arquivo ",e.jsx("code",{children:".whl"})," (wheel) na pasta ",e.jsx("code",{children:"dist/"})," sem instalar."]}),e.jsxs("li",{children:[e.jsx("code",{children:"--no-cache-dir"})," — não polui ",e.jsx("code",{children:"~/.cache/pip"}),"."]}),e.jsxs("li",{children:[e.jsx("code",{children:"--no-build-isolation"})," — não cria venv temporário (essencial em LFS, onde a internet pode estar offline)."]}),e.jsxs("li",{children:[e.jsx("code",{children:"--no-deps"})," — não tenta resolver dependências online."]}),e.jsxs("li",{children:[e.jsx("code",{children:"--no-index --find-links dist"})," — instala estritamente do diretório local. Garante reprodutibilidade."]})]}),e.jsx("h2",{children:"Casos práticos"}),e.jsx(i,{language:"bash",code:`# Verificar instalação:
python3 -c "import markupsafe; print(markupsafe.__version__)"
# 3.0.2

python3 -c "import jinja2; print(jinja2.__version__)"
# 3.1.6

# Smoke test do Jinja:
python3 <<'PY'
from jinja2 import Template
t = Template("Olá, {{ nome }}! Você tem {{ idade }} anos.")
print(t.render(nome="LFS", idade=24))
PY
# Olá, LFS! Você tem 24 anos.

# Smoke test do MarkupSafe:
python3 -c "from markupsafe import escape; print(escape('<script>'))"
# &lt;script&gt;`}),e.jsx(r,{title:"Confirmar que o systemd vai conseguir construir",children:e.jsxs("ol",{className:"list-decimal ml-5 space-y-1",children:[e.jsxs("li",{children:[e.jsx("code",{children:'python3 -c "import jinja2, markupsafe"'})," roda sem erros."]}),e.jsxs("li",{children:[e.jsx("code",{children:'pip3 list 2>/dev/null | grep -E "Jinja2|MarkupSafe"'})," mostra as duas."]}),e.jsxs("li",{children:["As wheels ficam em ",e.jsx("code",{children:"/usr/lib/python3.13/site-packages/"}),"."]})]})}),e.jsx("h2",{children:"Armadilhas comuns"}),e.jsxs(a,{type:"warning",title:"--no-build-isolation é crítico",children:["Sem essa flag, pip tenta criar um venv e baixar setuptools da internet. Em build offline, falha imediata. Em build online, polui ",e.jsx("code",{children:"$HOME"})," com ",e.jsx("code",{children:".cache/pip"})," e diretórios temporários."]}),e.jsxs(a,{type:"danger",title:"Ordem importa: MarkupSafe primeiro",children:["Jinja2 depende de MarkupSafe. Se você inverter a ordem,",e.jsx("code",{children:" pip install Jinja2 "})," tenta resolver MarkupSafe — mas ",e.jsx("code",{children:"--no-deps"})," impede. Resultado:",e.jsx("code",{children:" ImportError: cannot import name 'soft_str' from 'markupsafe' "}),". Sempre MarkupSafe → Jinja2."]}),e.jsx("h2",{children:"Cheat sheet"}),e.jsx(i,{language:"bash",code:`# Tempo total: ~0.1 SBU
# Tarballs: MarkupSafe-3.0.2.tar.gz, Jinja2-3.1.6.tar.gz
# Ordem obrigatória: MarkupSafe → Jinja2
# Validação: python3 -c "import jinja2, markupsafe"
# Quem precisa: meson, systemd, ansible, flask, salt`})]})}export{c as default};

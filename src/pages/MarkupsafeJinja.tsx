import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";
import { PracticeBox } from "@/components/ui/PracticeBox";

export default function MarkupsafeJinja() {
  return (
    <PageContainer
      title="MarkupSafe & Jinja2"
      subtitle="Dependências Python do systemd, meson e ninja. Pequenas, mas obrigatórias para gerar arquivos de configuração e templates de unidades."
      difficulty="iniciante"
      timeToRead="5 min"
    >
      <h2>Para que servem?</h2>
      <p>
        <strong>MarkupSafe</strong> implementa escape seguro de strings
        para HTML/XML/SQL — base de praticamente toda biblioteca de
        templates Python. <strong>Jinja2</strong> é o motor de
        templates (do Flask, Ansible, Salt) que o <code>meson</code>
        usa para gerar arquivos de configuração e o <code>systemd</code>
        usa em unit templates.
      </p>

      <AlertBox type="info" title="Por que pacotes Python no LFS base?">
        Meson (build system do systemd, GNOME, GTK) é escrito em Python
        e usa Jinja2 internamente. Sem essas duas libs, o
        <code> meson setup </code> falha com
        <code> ModuleNotFoundError: No module named 'jinja2' </code>.
      </AlertBox>

      <h2>MarkupSafe</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf MarkupSafe-3.0.2.tar.gz
cd MarkupSafe-3.0.2

pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --no-user --find-links dist Markupsafe

cd /sources
rm -rf MarkupSafe-3.0.2`}
      />

      <h2>Jinja2</h2>
      <CodeBlock
        language="bash"
        code={`cd /sources
tar -xf Jinja2-3.1.6.tar.gz
cd Jinja2-3.1.6

pip3 wheel -w dist --no-cache-dir --no-build-isolation --no-deps $PWD
pip3 install --no-index --no-user --find-links dist Jinja2

cd /sources
rm -rf Jinja2-3.1.6`}
      />

      <h2>Anatomia das flags pip</h2>
      <ul>
        <li><code>pip3 wheel -w dist</code> — gera o arquivo <code>.whl</code> (wheel) na pasta <code>dist/</code> sem instalar.</li>
        <li><code>--no-cache-dir</code> — não polui <code>~/.cache/pip</code>.</li>
        <li><code>--no-build-isolation</code> — não cria venv temporário (essencial em LFS, onde a internet pode estar offline).</li>
        <li><code>--no-deps</code> — não tenta resolver dependências online.</li>
        <li><code>--no-index --find-links dist</code> — instala estritamente do diretório local. Garante reprodutibilidade.</li>
      </ul>

      <h2>Casos práticos</h2>
      <CodeBlock
        language="bash"
        code={`# Verificar instalação:
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
# &lt;script&gt;`}
      />

      <PracticeBox title="Confirmar que o systemd vai conseguir construir">
        <ol className="list-decimal ml-5 space-y-1">
          <li><code>python3 -c "import jinja2, markupsafe"</code> roda sem erros.</li>
          <li><code>pip3 list 2&gt;/dev/null | grep -E "Jinja2|MarkupSafe"</code> mostra as duas.</li>
          <li>As wheels ficam em <code>/usr/lib/python3.13/site-packages/</code>.</li>
        </ol>
      </PracticeBox>

      <h2>Armadilhas comuns</h2>
      <AlertBox type="warning" title="--no-build-isolation é crítico">
        Sem essa flag, pip tenta criar um venv e baixar setuptools da
        internet. Em build offline, falha imediata. Em build online,
        polui <code>$HOME</code> com <code>.cache/pip</code> e
        diretórios temporários.
      </AlertBox>

      <AlertBox type="danger" title="Ordem importa: MarkupSafe primeiro">
        Jinja2 depende de MarkupSafe. Se você inverter a ordem,
        <code> pip install Jinja2 </code> tenta resolver MarkupSafe
        — mas <code>--no-deps</code> impede. Resultado:
        <code> ImportError: cannot import name 'soft_str' from
        'markupsafe' </code>. Sempre MarkupSafe → Jinja2.
      </AlertBox>

      <h2>Cheat sheet</h2>
      <CodeBlock
        language="bash"
        code={`# Tempo total: ~0.1 SBU
# Tarballs: MarkupSafe-3.0.2.tar.gz, Jinja2-3.1.6.tar.gz
# Ordem obrigatória: MarkupSafe → Jinja2
# Validação: python3 -c "import jinja2, markupsafe"
# Quem precisa: meson, systemd, ansible, flask, salt`}
      />
    </PageContainer>
  );
}

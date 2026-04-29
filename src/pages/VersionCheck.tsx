import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function VersionCheck() {
  return (
    <PageContainer
      title="Verificando o Sistema"
      subtitle="Confirme que /bin/sh aponta para bash, que existem links de awk/yacc, e que /usr/bin tem o suficiente."
      difficulty="iniciante"
      timeToRead="4 min"
    >
      <h2>Por que isso importa?</h2>
      <p>
        Vários scripts do LFS assumem que <code>/bin/sh</code> é Bash, e que{" "}
        <code>awk</code> existe (algumas distros só instalam <code>gawk</code> ou{" "}
        <code>mawk</code> sem o link <code>/usr/bin/awk</code>). Se faltar,
        configure <em>antes</em> de tudo:
      </p>

      <h2>Checagens rápidas</h2>
      <CodeBlock
        language="bash"
        code={`# /bin/sh deve apontar para bash
readlink -f /bin/sh
# Esperado: /usr/bin/bash (ou /bin/bash)

# awk deve existir como link
which awk
# Se vazio: ln -s gawk /usr/bin/awk (ajuste para sua distro)`}
      />

      <h2>Em Ubuntu / Debian</h2>
      <p>
        Por padrão, Ubuntu/Debian usam <code>dash</code> como <code>/bin/sh</code>,
        que é mais leve mas menos compatível. <strong>Reconfigure</strong>:
      </p>
      <CodeBlock language="bash" code={`sudo dpkg-reconfigure dash`} />
      <p>
        Quando perguntar "Use dash as the default system shell (/bin/sh)?", responda <strong>No</strong>.
      </p>

      <AlertBox type="warning" title="Faça isso antes de qualquer build do LFS">
        Esquecer esse passo gera erros estranhos em scripts <code>configure</code>{" "}
        depois. Vale 30 segundos.
      </AlertBox>

      <h2>Symlinks normalmente faltantes</h2>
      <CodeBlock
        language="bash"
        code={`# yacc → bison
[ -e /usr/bin/yacc ] || sudo ln -sv bison /usr/bin/yacc

# awk → gawk
[ -e /usr/bin/awk ] || sudo ln -sv gawk /usr/bin/awk`}
      />

      <h2>Conferindo o GCC consegue compilar C++</h2>
      <p>
        Vários pacotes do LFS exigem g++. Teste:
      </p>
      <CodeBlock
        language="bash"
        code={`echo 'int main(){}' > /tmp/dummy.cc
g++ -o /tmp/dummy /tmp/dummy.cc && echo "g++ OK"
rm /tmp/dummy /tmp/dummy.cc`}
      />

      <AlertBox type="success" title="Tudo verde?">
        Vá para <a href="#/particionamento">Particionamento</a> e prepare o disco do LFS.
      </AlertBox>
    </PageContainer>
  );
}

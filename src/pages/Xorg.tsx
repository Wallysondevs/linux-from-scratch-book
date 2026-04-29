import { PageContainer } from "@/components/layout/PageContainer";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Xorg() {
  return (
    <PageContainer
      title="Configurando Xorg"
      subtitle="Visão geral de como instalar o servidor gráfico X.org no LFS via BLFS."
      difficulty="avancado"
      timeToRead="6 min"
    >
      <h2>Pré-requisitos enormes</h2>
      <p>
        Xorg precisa de muitas bibliotecas: libpng, libjpeg, freetype,
        fontconfig, pixman, mesa, libdrm, libxcb, dezenas de protocolos
        XML/XCB, e outros. Cada um é um capítulo no BLFS.
      </p>

      <h2>Definindo a variável <code>$XORG_PREFIX</code></h2>
      <CodeBlock
        language="bash"
        code={`export XORG_PREFIX=/usr
export XORG_CONFIG="--prefix=$XORG_PREFIX --sysconfdir=/etc \\
                    --localstatedir=/var --disable-static"

# torne persistente:
cat > /etc/profile.d/xorg.sh << "EOF"
export XORG_PREFIX=/usr
export XORG_CONFIG="--prefix=$XORG_PREFIX --sysconfdir=/etc --localstatedir=/var --disable-static"
EOF`}
      />

      <h2>Sequência geral (BLFS)</h2>
      <ol>
        <li>util-macros, xorgproto</li>
        <li>libXau, libXdmcp</li>
        <li>xcb-proto, libxcb</li>
        <li>libX11, libXext, libXrender</li>
        <li>mesa (com llvm), libdrm</li>
        <li>xkeyboard-config</li>
        <li>xorg-server</li>
        <li>xinit, drivers (xf86-input-libinput, xf86-video-*)</li>
      </ol>

      <CodeBlock
        language="bash"
        code={`# Exemplo de wrapper para configurar pacotes Xorg:
./configure $XORG_CONFIG
make
make install`}
      />

      <h2>Testando</h2>
      <CodeBlock
        language="bash"
        code={`# Após instalar tudo, instale um WM mínimo (twm/icewm):
echo "exec icewm" > ~/.xinitrc
startx`}
      />

      <AlertBox type="warning" title="Esta página é só um mapa">
        Xorg sozinho são ~50 pacotes do BLFS. Use o livro oficial em{" "}
        <a href="https://www.linuxfromscratch.org/blfs/view/stable/x/installing.html" target="_blank" rel="noopener noreferrer">
          BLFS Installing X
        </a>{" "}
        para a sequência detalhada e dependências.
      </AlertBox>
    </PageContainer>
  );
}

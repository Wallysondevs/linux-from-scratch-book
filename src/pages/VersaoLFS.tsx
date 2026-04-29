import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function VersaoLFS() {
  return (
    <PageContainer
      title="Versão do LFS Coberta neste Livro"
      subtitle="Compatível com a série LFS 12.x (estável e stable-systemd) — adaptável a versões mais novas."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>Qual versão usamos como base?</h2>
      <p>
        Este livro foi escrito tomando como referência o <strong>LFS 12.x estável</strong>{" "}
        (e a edição <em>stable-systemd</em>), com kernel <strong>6.x</strong>,
        Glibc <strong>2.40+</strong>, GCC <strong>14.x</strong> e Binutils{" "}
        <strong>2.42+</strong>. As instruções continuam valendo para versões
        ligeiramente mais novas; apenas confira o livro oficial em busca de
        flags de <code>configure</code> que mudaram.
      </p>

      <h2>SysVinit ou Systemd?</h2>
      <p>O LFS oficial publica <strong>duas edições</strong>:</p>
      <ul>
        <li>
          <strong>LFS (SysV)</strong> — usa scripts shell como sistema de init.
          Mais simples e didático para entender o boot.
        </li>
        <li>
          <strong>LFS-systemd</strong> — usa systemd, que é o init padrão da maior
          parte das distros modernas (Ubuntu, Debian, Fedora, Arch).
        </li>
      </ul>
      <p>
        Este livro mostra <strong>os dois caminhos</strong> nos capítulos de
        configuração de boot (<a href="#/bootscripts">Bootscripts/Systemd Units</a>{" "}
        e <a href="#/systemd">Systemd</a>). Você escolhe qual seguir — só não
        misture.
      </p>

      <AlertBox type="info" title="Quer aprender o init clássico? Use SysV.">
        Se o seu objetivo é entender boot Linux a fundo, comece com a edição
        SysVinit. Você verá <em>literalmente</em> cada script que roda. Depois,
        quando passar para systemd, vai entender o que ele esconde.
      </AlertBox>

      <h2>Como saber a versão atual oficial?</h2>
      <p>
        Sempre confira em{" "}
        <a href="https://www.linuxfromscratch.org/lfs/" target="_blank" rel="noopener noreferrer">
          linuxfromscratch.org/lfs/
        </a>
        . As versões "stable" são lançadas a cada 6 meses
        aproximadamente. As "development" mudam toda semana.
      </p>

      <h2>Diferenças versão-a-versão</h2>
      <ul>
        <li>
          <strong>Toolchain:</strong> mudanças entre LFS 11.x e 12.x foram
          principalmente em flags de <code>configure</code> e versões de
          pacotes — a estrutura é idêntica.
        </li>
        <li>
          <strong>Glibc:</strong> a partir de 2.34, libpthread, libdl, librt
          foram unificadas em libc. Os patches mudaram.
        </li>
        <li>
          <strong>Kernel:</strong> a árvore 6.x não muda comandos, só números.
        </li>
        <li>
          <strong>Util-linux 2.40+:</strong> mudou onde mesa-utils espera coisas
          (hwclock, su moveram).
        </li>
      </ul>

      <AlertBox type="warning" title="Sempre confronte com o livro oficial">
        Este livro é uma adaptação didática em português. Quando uma versão de
        pacote mudar significativamente, o livro oficial é a fonte canônica.
        Use os dois lado-a-lado.
      </AlertBox>
    </PageContainer>
  );
}

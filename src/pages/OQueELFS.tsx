import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function OQueELFS() {
  return (
    <PageContainer
      title="O que é o Linux From Scratch?"
      subtitle="Um livro que te ensina a construir sua própria distribuição Linux a partir do código-fonte de cada pacote."
      difficulty="iniciante"
      timeToRead="6 min"
    >
      <h2>Definição direta</h2>
      <p>
        Linux From Scratch (<strong>LFS</strong>) é um livro de Gerard Beekmans que
        descreve, comando por comando, como construir um sistema Linux funcional
        baixando o código-fonte de cada pacote (Binutils, GCC, Glibc, Bash,
        Coreutils, Kernel etc.) e compilando-os manualmente.
      </p>
      <p>
        O resultado é uma distribuição feita por você, do zero, sem nenhum
        binário pré-empacotado, sem nenhum gerenciador de pacotes "mágico", sem
        nenhuma decisão tomada por outra pessoa.
      </p>

      <h2>O que o LFS NÃO é</h2>
      <ul>
        <li>
          <strong>Não é uma distro</strong> que você baixa, instala e usa. É um
          livro com instruções.
        </li>
        <li>
          <strong>Não é Gentoo.</strong> Gentoo é uma distro com um gerenciador
          de pacotes (Portage) que automatiza a compilação. No LFS você é o
          gerenciador de pacotes.
        </li>
        <li>
          <strong>Não é Arch.</strong> Arch tem <code>pacman</code> e binários
          prontos. No LFS, nada vem pronto.
        </li>
        <li>
          <strong>Não é fácil.</strong> Mas é didático.
        </li>
      </ul>

      <h2>A família LFS</h2>
      <p>O projeto se divide em vários livros complementares:</p>
      <ul>
        <li>
          <strong>LFS</strong> — sistema base mínimo, console only. É o que este
          livro cobre integralmente.
        </li>
        <li>
          <strong>BLFS</strong> (Beyond Linux From Scratch) — Xorg, ambientes
          desktop, servidores, áudio, navegadores. Cobrimos em capítulos
          finais.
        </li>
        <li>
          <strong>ALFS</strong> (Automated LFS) — scripts que automatizam o LFS
          para quem já entendeu o livro.
        </li>
        <li>
          <strong>HLFS</strong> / <strong>CLFS</strong> — variantes hardened ou
          cross-compiled (descontinuadas/legacy).
        </li>
      </ul>

      <h2>Para quem é o LFS?</h2>
      <ul>
        <li>Quem quer entender Linux profundamente, não só usar.</li>
        <li>Estudantes e profissionais de SO, embarcados, sysadmin, segurança.</li>
        <li>Curiosos com tempo, paciência e pelo menos uma máquina virtual.</li>
        <li>Quem se cansou de "apenas rodar comandos sem saber o porquê".</li>
      </ul>

      <h2>O fluxo básico do livro</h2>
      <ol>
        <li>Preparar um <strong>host Linux</strong> (qualquer distro funciona).</li>
        <li>Criar uma <strong>partição</strong> (ou disco virtual) para o LFS.</li>
        <li>Baixar todos os pacotes-fonte (cerca de 700 MB).</li>
        <li>Construir uma <strong>toolchain temporária</strong> (Pass 1 + Pass 2).</li>
        <li>Entrar no <strong>chroot</strong> e construir todo o software final.</li>
        <li>Configurar rede, locale, scripts de boot.</li>
        <li>Compilar o <strong>kernel Linux</strong> e instalar o <strong>GRUB</strong>.</li>
        <li>Reiniciar e dar boot no <strong>seu próprio Linux</strong>.</li>
      </ol>

      <AlertBox type="success" title="O sentimento do primeiro boot">
        Quando o GRUB aparece, o kernel inicializa e o prompt de login do <em>seu</em>{" "}
        Linux pisca pela primeira vez — esse é o momento em que tudo o que você leu
        no livro vira intuição. Vale cada hora de compilação.
      </AlertBox>
    </PageContainer>
  );
}

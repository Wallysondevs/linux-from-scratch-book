import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function IntroBlfs() {
  return (
    <PageContainer
      title="Introdução ao BLFS"
      subtitle="Beyond Linux From Scratch — tudo o que falta para transformar o LFS num sistema usável de verdade."
      difficulty="iniciante"
      timeToRead="5 min"
    >
      <h2>O que é o BLFS?</h2>
      <p>
        BLFS é o livro complementar do LFS, mantido pela mesma equipe. Ele
        cobre TUDO o que o LFS não cobre: Xorg, ambientes desktop, navegadores,
        servidores, áudio, vídeo, cliente VPN, ferramentas de desenvolvimento.
      </p>

      <h2>Como o BLFS é organizado?</h2>
      <ul>
        <li><strong>Bibliotecas</strong> (libpng, openssl avançado, Qt, GTK).</li>
        <li><strong>Linguagens</strong> (Rust, Go, Node.js, Ruby).</li>
        <li><strong>Servidores</strong> (Apache, nginx, OpenSSH, BIND, PostgreSQL).</li>
        <li><strong>Xorg + Wayland</strong>.</li>
        <li><strong>Ambientes Desktop</strong> (GNOME, KDE Plasma, Xfce, LXQt).</li>
        <li><strong>Multimídia</strong> (PulseAudio/PipeWire, FFmpeg, MPV, GStreamer).</li>
        <li><strong>Navegadores</strong> (Firefox, Chromium).</li>
      </ul>

      <h2>Filosofia do BLFS</h2>
      <p>
        Ao contrário do LFS, que tem ordem rígida, o BLFS é mais como uma{" "}
        <em>enciclopédia de receitas</em>. Você consulta o pacote que quer,
        instala suas dependências (que podem ser várias), volta à receita
        original. Bem-vindo ao "dependency hell" controlado.
      </p>

      <AlertBox type="info" title="Os capítulos seguintes">
        Vamos cobrir os tópicos mais comuns: gerenciamento de pacotes, Xorg,
        desktops, rede, segurança. Para o resto, consulte sempre{" "}
        <a href="https://www.linuxfromscratch.org/blfs/" target="_blank" rel="noopener noreferrer">
          linuxfromscratch.org/blfs
        </a>.
      </AlertBox>
    </PageContainer>
  );
}

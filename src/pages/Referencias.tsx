import { PageContainer } from "@/components/layout/PageContainer";

export default function Referencias() {
  return (
    <PageContainer
      title="Referências & Links"
      subtitle="Onde aprender mais, contribuir, e onde ler a fonte canônica do LFS."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>Documentos oficiais LFS</h2>
      <ul>
        <li>
          <strong>LFS Book</strong> —{" "}
          <a href="https://www.linuxfromscratch.org/lfs/" target="_blank" rel="noopener noreferrer">
            linuxfromscratch.org/lfs
          </a>
        </li>
        <li>
          <strong>BLFS Book</strong> —{" "}
          <a href="https://www.linuxfromscratch.org/blfs/" target="_blank" rel="noopener noreferrer">
            linuxfromscratch.org/blfs
          </a>
        </li>
        <li>
          <strong>FAQ</strong> —{" "}
          <a href="https://www.linuxfromscratch.org/faq/" target="_blank" rel="noopener noreferrer">
            linuxfromscratch.org/faq
          </a>
        </li>
        <li>
          <strong>Hints</strong> (artigos da comunidade) —{" "}
          <a href="https://www.linuxfromscratch.org/hints/" target="_blank" rel="noopener noreferrer">
            linuxfromscratch.org/hints
          </a>
        </li>
      </ul>

      <h2>Listas e comunidade</h2>
      <ul>
        <li>
          <a href="https://www.linuxfromscratch.org/mail.html" target="_blank" rel="noopener noreferrer">
            Mailing lists oficiais
          </a>
        </li>
        <li>IRC: <code>#lfs-pt</code> e <code>#lfs</code> em libera.chat</li>
        <li>Reddit: <a href="https://reddit.com/r/LinuxFromScratch" target="_blank" rel="noopener noreferrer">r/LinuxFromScratch</a></li>
      </ul>

      <h2>Ferramentas e diagnóstico</h2>
      <ul>
        <li><strong>readelf</strong> — inspecionar binários ELF (interpreter, libs).</li>
        <li><strong>ldd</strong> — listar bibliotecas dinâmicas que um binário usa.</li>
        <li><strong>strace</strong> — rastrear syscalls de um processo.</li>
        <li><strong>blkid</strong> — UUIDs de partições.</li>
        <li><strong>lsblk -f</strong> — ver filesystems com labels e UUIDs.</li>
      </ul>

      <h2>Livros & recursos clássicos</h2>
      <ul>
        <li><em>The Linux Programming Interface</em> — Michael Kerrisk</li>
        <li><em>Understanding the Linux Kernel</em> — Bovet & Cesati</li>
        <li><em>Linux From Scratch</em> (livro oficial) — Gerard Beekmans</li>
        <li><em>Bash Manual</em> — <code>info bash</code></li>
      </ul>

      <h2>Outros guias do mesmo autor</h2>
      <p>
        Este livro faz parte de uma série de guias de distros e sistemas Linux
        em português. Veja também:
      </p>
      <ul>
        <li>Kali Linux — Guia Completo</li>
        <li>Debian — Guia Completo</li>
        <li>Ubuntu — Guia Completo</li>
        <li>Arch Linux — Guia Completo</li>
        <li>Fedora Linux — Guia Completo</li>
      </ul>

      <h2>Licença</h2>
      <p>
        Conteúdo derivado/inspirado no Linux From Scratch oficial, licenciado{" "}
        <a href="https://www.linuxfromscratch.org/cdrom/license.html" target="_blank" rel="noopener noreferrer">
          Creative Commons BY-NC-SA 2.0
        </a>
        . Esta adaptação em português também é distribuída sob CC BY-NC-SA 4.0
        para fins educativos.
      </p>
    </PageContainer>
  );
}

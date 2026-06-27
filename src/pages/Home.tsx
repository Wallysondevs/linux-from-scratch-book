import { Link } from "wouter";
import { Terminal, BookOpen, Code2, Cpu, ArrowRight } from "lucide-react";
import index from "@/content-index.json";

interface ChapterGroup { id: string; name: string; pages: { slug: string; title: string }[]; }
const GROUPS = index as ChapterGroup[];
const TOTAL = GROUPS.reduce((s, g) => s + g.pages.length, 0);
const FIRST = GROUPS[0]?.pages[0]?.slug;

export default function Home() {
  return (
    <div className="fade-in">
      {/* Hero */}
      <section className="text-center py-10">
        <div className="inline-grid place-items-center rounded-2xl mb-6" style={{ width: 72, height: 72, background: "hsl(var(--lfs-orange))" }}>
          <Terminal size={38} color="#1a1208" />
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4" style={{ color: "hsl(var(--lfs-fg))" }}>
          Linux From Scratch
          <span className="block text-2xl md:text-3xl mt-2" style={{ color: "hsl(var(--lfs-orange))" }}>
            Versão 12.4 — em Português
          </span>
        </h1>
        <p className="max-w-2xl mx-auto text-lg leading-relaxed" style={{ color: "hsl(var(--lfs-dim))" }}>
          O manual oficial do LFS, traduzido fielmente para o português brasileiro.
          Construa sua própria distribuição Linux a partir do código-fonte — sem instalador,
          sem gerenciador de pacotes, só você, um compilador e o livro inteiro.
        </p>
        <div className="flex flex-wrap gap-3 justify-center mt-8">
          {FIRST && (
            <Link href={`/page/${FIRST}`} className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold no-underline transition-transform hover:scale-[1.03]"
              style={{ background: "hsl(var(--lfs-orange))", color: "#1a1208" }}>
              Começar a ler <ArrowRight size={18} />
            </Link>
          )}
          <a href="https://www.linuxfromscratch.org/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold no-underline transition-colors"
            style={{ background: "hsl(var(--lfs-bg-2))", color: "hsl(var(--lfs-fg))" }}>
            Site oficial
          </a>
        </div>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-3 gap-4 my-10 max-w-2xl mx-auto">
        {[
          { icon: BookOpen, num: TOTAL, lbl: "Capítulos" },
          { icon: Code2, num: "676", lbl: "Comandos reais" },
          { icon: Cpu, num: "12.4", lbl: "Versão LFS" },
        ].map((s, i) => (
          <div key={i} className="text-center p-5 rounded-xl" style={{ background: "hsl(var(--lfs-bg-2))", border: "1px solid hsl(var(--lfs-orange) / 0.12)" }}>
            <s.icon size={22} className="mx-auto mb-2" style={{ color: "hsl(var(--lfs-orange))" }} />
            <div className="text-2xl font-extrabold" style={{ color: "hsl(var(--lfs-fg))" }}>{s.num}</div>
            <div className="text-xs uppercase tracking-wide" style={{ color: "hsl(var(--lfs-dim))" }}>{s.lbl}</div>
          </div>
        ))}
      </section>

      {/* Chapters */}
      <section className="my-10">
        <h2 className="text-xl font-bold mb-5" style={{ color: "hsl(var(--lfs-amber))" }}>Conteúdo do livro</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {GROUPS.map((g) => (
            <Link key={g.id} href={`/page/${g.pages[0].slug}`}
              className="block p-4 rounded-xl no-underline transition-colors hover:border-orange-500"
              style={{ background: "hsl(var(--lfs-bg-2))", border: "1px solid hsl(var(--lfs-orange) / 0.12)" }}>
              <div className="font-semibold mb-1" style={{ color: "hsl(var(--lfs-orange))" }}>{g.name}</div>
              <div className="text-sm" style={{ color: "hsl(var(--lfs-dim))" }}>{g.pages.length} páginas</div>
            </Link>
          ))}
        </div>
      </section>

      <footer className="text-center py-8 text-sm" style={{ color: "hsl(var(--lfs-dim))", borderTop: "1px solid hsl(var(--lfs-orange) / 0.12)" }}>
        Tradução do manual oficial do Linux From Scratch (LFS 12.4-systemd).
        Conteúdo sob licença do projeto LFS · MIT/Creative Commons.
      </footer>
    </div>
  );
}

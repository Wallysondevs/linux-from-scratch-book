import { Link } from "wouter";
import {
  Hammer,
  Terminal,
  Cpu,
  HardDrive,
  Power,
  Package,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  Library,
  GraduationCap,
  Boxes,
} from "lucide-react";

const sections = [
  {
    icon: GraduationCap,
    title: "Comece pelo zero",
    desc: "Nunca compilou nada? Comece aqui — explicamos cada passo sem assumir nada.",
    href: "/comece-aqui",
    color: "bg-primary/10 text-primary",
  },
  {
    icon: HardDrive,
    title: "Preparando o Hospedeiro",
    desc: "Particione, monte, baixe os pacotes e prepare o ambiente do usuário lfs.",
    href: "/requisitos-host",
    color: "bg-violet-500/10 text-violet-500",
  },
  {
    icon: Hammer,
    title: "Toolchain Cross-Compilada",
    desc: "Construa Binutils, GCC e Glibc em duas passes para criar uma toolchain isolada.",
    href: "/intro-toolchain",
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    icon: Boxes,
    title: "Software do Sistema",
    desc: "Compile mais de 80 pacotes essenciais dentro do chroot — do Glibc ao Vim.",
    href: "/man-pages",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    icon: Cpu,
    title: "Compile o Kernel",
    desc: "Configure e compile o kernel Linux 6.x do código-fonte para o seu hardware.",
    href: "/kernel",
    color: "bg-red-500/10 text-red-500",
  },
  {
    icon: Power,
    title: "Boot com GRUB",
    desc: "Instale e configure o GRUB 2 para fazer seu LFS dar boot pela primeira vez.",
    href: "/grub",
    color: "bg-orange-500/10 text-orange-500",
  },
  {
    icon: Terminal,
    title: "Comandos Essenciais",
    desc: "Tabela de referência rápida com todos os comandos usados no livro.",
    href: "/comandos-essenciais",
    color: "bg-green-500/10 text-green-500",
  },
  {
    icon: Library,
    title: "Beyond LFS (BLFS)",
    desc: "Xorg, Desktop, áudio, rede, segurança — vá além de um sistema só de console.",
    href: "/intro-blfs",
    color: "bg-pink-500/10 text-pink-500",
  },
];

const stats = [
  { value: "80+", label: "Pacotes compilados" },
  { value: "60+", label: "Capítulos guiados" },
  { value: "PT-BR", label: "100% Português" },
  { value: "Grátis", label: "Open Knowledge" },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-24">
      {/* AVISO — em destaque */}
      <div className="mb-10 rounded-2xl border-2 border-yellow-500/40 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 overflow-hidden">
        <div className="flex items-center gap-2 px-5 py-3 bg-yellow-500/15 border-b border-yellow-500/30">
          <ShieldAlert className="w-5 h-5 text-yellow-400" />
          <span className="text-sm font-bold uppercase tracking-wider text-yellow-300">
            Antes de começar — leia isto
          </span>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-sm text-foreground/90 leading-relaxed m-0">
            <strong>LFS é um projeto educacional.</strong> Você vai construir um Linux
            inteiro a partir do código-fonte de cada pacote — Binutils, GCC, Glibc,
            Coreutils, Bash, Kernel, GRUB. <strong>Não é um substituto</strong> para
            distribuições como Ubuntu, Debian, Arch, Fedora ou Kali. É uma forma
            profunda de entender como tudo se encaixa.
          </p>
          <p className="text-sm text-foreground/90 leading-relaxed m-0">
            Use sempre uma <strong>VM dedicada</strong> ou uma <strong>partição separada</strong>{" "}
            de pelo menos 30 GB. <strong>Não compile no seu sistema principal</strong> —
            misturar a toolchain do LFS com a do host quase sempre quebra algo. Reserve
            de <strong>20 a 40 horas</strong> de máquina para a build completa
            (dependendo do hardware) e tenha paciência: cada erro é uma aula.
          </p>
          <Link href="/aviso-legal" className="inline-flex items-center gap-2 px-4 py-2 mt-1 bg-yellow-500/15 hover:bg-yellow-500/25 text-yellow-300 border border-yellow-500/30 rounded-lg text-sm font-semibold transition-colors">
            Ler o capítulo completo de Cuidados & Avisos
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div className="text-center mb-16 mt-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Guia Completo em Português Brasileiro — LFS 12.x
        </div>
        <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight text-foreground mb-6 leading-tight">
          Linux From <span className="text-primary">Scratch</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Construa sua própria distribuição Linux a partir do <strong className="text-foreground">código-fonte</strong>.
          Sem instalador, sem gerenciador de pacotes, sem mágica — só você, um host de boot, um
          compilador e o livro inteiro traduzido e explicado em português.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
          <Link href="/comece-aqui" className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
            Começar do Zero
            <ChevronRight className="w-4 h-4" />
          </Link>
          <Link href="/o-que-e-lfs" className="inline-flex items-center gap-2 px-6 py-3 bg-muted text-foreground rounded-lg font-semibold hover:bg-muted/70 transition-colors border border-border">
            O que é o LFS?
          </Link>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-16">
        {stats.map((s) => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-5 text-center">
            <div className="text-3xl font-extrabold text-primary mb-1">{s.value}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* SECTIONS GRID */}
      <h2 className="text-2xl font-bold mb-6 mt-0 border-none p-0">Roteiro do Livro</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-xl border border-border bg-card p-5 hover:border-primary/50 hover:shadow-lg transition-all block"
            >
              <div className={`w-10 h-10 rounded-lg ${s.color} flex items-center justify-center mb-3`}>
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-foreground mb-1 mt-0 text-base group-hover:text-primary transition-colors">
                {s.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed m-0">{s.desc}</p>
            </Link>
          );
        })}
      </div>

      {/* WHY LFS */}
      <div className="rounded-2xl border border-border bg-card/50 p-8 mb-12">
        <h2 className="text-2xl font-bold mb-4 mt-0 border-none p-0">Por que ler este livro?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm leading-relaxed text-foreground/85">
          <div>
            <p>
              Você vai aprender — de verdade — <strong>como um sistema Linux funciona</strong>:
              o que é uma toolchain, por que a Glibc é construída duas vezes, qual o papel
              do <code>/sysroot</code>, como o kernel encontra o init, como o GRUB carrega
              tudo. Nenhum tutorial supérfluo: cada comando tem uma razão, e o livro
              explica essa razão.
            </p>
          </div>
          <div>
            <p>
              Quando terminar, troubleshooting em qualquer distro vai parecer trivial.
              Erros de <code>ld.so</code>, problemas de <code>$PATH</code>, kernel que
              não dá boot, libs faltando — depois do LFS você sabe exatamente onde
              olhar e o que está acontecendo por baixo.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER NOTE */}
      <div className="text-center text-sm text-muted-foreground">
        Baseado no <strong className="text-foreground">Linux From Scratch Book</strong> oficial
        (<a href="https://www.linuxfromscratch.org/" target="_blank" rel="noopener noreferrer" className="text-primary">linuxfromscratch.org</a>)
        — adaptado, traduzido e expandido para iniciantes em português brasileiro.
      </div>
    </div>
  );
}

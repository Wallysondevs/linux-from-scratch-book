import { Link } from "wouter";
import {
  Hammer,
  Terminal,
  Cpu,
  HardDrive,
  Power,
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
    desc: "Construa Binutils 2.45, GCC 15.2 e Glibc 2.42 em duas passes para criar uma toolchain isolada.",
    href: "/intro-toolchain",
    color: "bg-cyan-500/10 text-cyan-500",
  },
  {
    icon: Boxes,
    title: "Software do Sistema",
    desc: "Compile 85+ pacotes essenciais dentro do chroot — do Glibc ao Vim.",
    href: "/man-pages",
    color: "bg-yellow-500/10 text-yellow-500",
  },
  {
    icon: Cpu,
    title: "Compile o Kernel",
    desc: "Configure e compile o kernel Linux 6.16 do código-fonte para o seu hardware.",
    href: "/kernel",
    color: "bg-red-500/10 text-red-500",
  },
  {
    icon: Power,
    title: "Boot com GRUB",
    desc: "Instale e configure o GRUB 2.12 para fazer seu LFS dar boot pela primeira vez.",
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
  { value: "85", label: "Capítulos guiados" },
  { value: "85", label: "Pacotes compilados" },
  { value: "12.4", label: "Versão do LFS" },
  { value: "PT-BR", label: "100% Português" },
];

const versions = [
  { name: "GCC", v: "15.2.0" },
  { name: "Glibc", v: "2.42" },
  { name: "Binutils", v: "2.45" },
  { name: "Linux", v: "6.16.1" },
  { name: "Bash", v: "5.3" },
  { name: "Coreutils", v: "9.7" },
  { name: "Systemd", v: "257.8" },
  { name: "GRUB", v: "2.12" },
];

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto py-8 px-4 sm:px-6 lg:px-8 pb-24">
      {/* AVISO */}
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
          <Link
            href="/aviso-legal"
            className="inline-flex items-center gap-2 px-4 py-2 mt-1 bg-yellow-500/15 hover:bg-yellow-500/25 text-yellow-300 border border-yellow-500/30 rounded-lg text-sm font-semibold transition-colors"
          >
            Ler o capítulo completo de Cuidados & Avisos
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* HERO */}
      <div className="text-center mb-16 mt-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium mb-6">
          <Sparkles className="w-4 h-4" />
          Guia Completo em Português Brasileiro — LFS 12.4 (estável)
        </div>
        <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-gradient-to-br from-foreground via-foreground to-primary bg-clip-text text-transparent leading-tight">
          Linux From Scratch
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Construa sua própria distribuição Linux do código-fonte — alinhado com a
          documentação oficial <strong>LFS 12.4</strong>. Da partição vazia ao primeiro
          boot, passando por toolchain cross, chroot, sistema final, kernel e GRUB.
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-xl border border-border bg-card/50 p-5 text-center"
          >
            <div className="text-3xl font-bold text-primary mb-1">{s.value}</div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* VERSÕES — LFS 12.4 */}
      <div className="mb-16 rounded-2xl border border-border bg-card/30 overflow-hidden">
        <div className="px-5 py-3 bg-primary/5 border-b border-border">
          <h2 className="text-sm font-bold uppercase tracking-wider text-primary m-0">
            Versões cobertas — LFS 12.4 estável
          </h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-border">
          {versions.map((p) => (
            <div key={p.name} className="bg-card px-4 py-3">
              <div className="text-xs text-muted-foreground uppercase tracking-wider">
                {p.name}
              </div>
              <div className="font-mono text-sm font-bold text-foreground">{p.v}</div>
            </div>
          ))}
        </div>
      </div>

      {/* SEÇÕES */}
      <div className="grid gap-4 sm:grid-cols-2 mb-12">
        {sections.map((s) => {
          const Icon = s.icon;
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group rounded-xl border border-border bg-card/50 hover:bg-card hover:border-primary/40 transition-all p-5 flex gap-4"
            >
              <div
                className={`shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${s.color}`}
              >
                <Icon className="w-6 h-6" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-base mb-1 group-hover:text-primary transition-colors">
                  {s.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed m-0">
                  {s.desc}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      {/* CTA */}
      <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-primary/10 to-orange-500/5 p-6 text-center">
        <h2 className="text-2xl font-bold mb-2">Pronto para começar?</h2>
        <p className="text-muted-foreground mb-5 max-w-2xl mx-auto">
          Vá para os pré-requisitos do hospedeiro, prepare a partição do LFS e baixe os
          85 pacotes da release 12.4. O livro guia você passo a passo.
        </p>
        <Link
          href="/comece-aqui"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
        >
          Comece pelo capítulo 1
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

import { Link } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { cn } from "@/lib/utils";
import {
  BookOpen, Terminal, Settings, FileText, X, Package, Code, FolderOpen,
  HardDrive, Zap, ShieldAlert, Cpu, Hammer, Wrench, Layers, GitBranch,
  Download, Server, Boxes, Network, Lock, Power, Box, Workflow,
  Library, Binary, FileCode, Cog, Database, Shield, BookMarked,
  ArrowRight, Sparkles, GraduationCap
} from "lucide-react";

const NAVIGATION = [
  {
    title: "🚀 Comece Aqui",
    items: [
      { path: "/", label: "Início", icon: BookOpen },
      { path: "/aviso-legal", label: "Aviso Legal & Cuidados", icon: ShieldAlert },
      { path: "/o-que-e-lfs", label: "O que é o LFS?", icon: Sparkles },
      { path: "/comece-aqui", label: "Do Zero Absoluto", icon: Zap },
      { path: "/pre-requisitos", label: "Pré-requisitos", icon: GraduationCap },
      { path: "/convencoes", label: "Tipografia & Convenções", icon: FileText },
      { path: "/versao-lfs", label: "Versão LFS Coberta", icon: BookMarked },
    ]
  },
  {
    title: "🖥️ Preparando o Hospedeiro",
    items: [
      { path: "/requisitos-host", label: "Requisitos do Host", icon: Server },
      { path: "/version-check", label: "Verificando o Sistema", icon: Cog },
      { path: "/particionamento", label: "Particionamento", icon: HardDrive },
      { path: "/sistema-arquivos", label: "Sistema de Arquivos LFS", icon: Database },
      { path: "/montando-particao", label: "Montando a Partição", icon: FolderOpen },
      { path: "/pacotes-patches", label: "Baixando Pacotes & Patches", icon: Download },
      { path: "/sources-dir", label: "Diretório /sources", icon: Package },
      { path: "/usuario-lfs", label: "Usuário LFS", icon: Lock },
      { path: "/ambiente-lfs", label: "Variáveis de Ambiente", icon: Terminal },
      { path: "/sbu-tests", label: "SBUs e Test Suites", icon: Workflow },
    ]
  },
  {
    title: "🔧 Toolchain Temporária (Pass 1)",
    items: [
      { path: "/intro-toolchain", label: "Introdução à Toolchain", icon: Hammer },
      { path: "/binutils-pass1", label: "Binutils — Pass 1", icon: Binary },
      { path: "/gcc-pass1", label: "GCC — Pass 1", icon: Cpu },
      { path: "/linux-headers", label: "Linux API Headers", icon: Layers },
      { path: "/glibc-temp", label: "Glibc (toolchain)", icon: Library },
      { path: "/libstdc-pass1", label: "Libstdc++ from GCC", icon: Box },
    ]
  },
  {
    title: "🛠️ Ferramentas Temporárias",
    items: [
      { path: "/m4", label: "M4", icon: Code },
      { path: "/ncurses-temp", label: "Ncurses", icon: Terminal },
      { path: "/bash-temp", label: "Bash", icon: Terminal },
      { path: "/coreutils-temp", label: "Coreutils", icon: Boxes },
      { path: "/diffutils-temp", label: "Diffutils, File, Findutils, Gawk", icon: FileCode },
      { path: "/grep-temp", label: "Grep, Gzip, Make", icon: Wrench },
      { path: "/patch-temp", label: "Patch, Sed, Tar, Xz", icon: Wrench },
      { path: "/binutils-pass2", label: "Binutils — Pass 2", icon: Binary },
      { path: "/gcc-pass2", label: "GCC — Pass 2", icon: Cpu },
    ]
  },
  {
    title: "📦 Chroot & Build Adicional",
    items: [
      { path: "/changing-ownership", label: "Mudando o Dono", icon: Lock },
      { path: "/preparing-vfs", label: "Preparando Filesystems Virtuais", icon: Layers },
      { path: "/entering-chroot", label: "Entrando no Chroot", icon: Box },
      { path: "/creating-dirs", label: "Criando Diretórios", icon: FolderOpen },
      { path: "/essential-files", label: "Arquivos & Symlinks Essenciais", icon: GitBranch },
      { path: "/gettext-bison-perl", label: "Gettext, Bison, Perl, Python", icon: FileCode },
      { path: "/cleanup-temp", label: "Limpeza & Backup", icon: Wrench },
    ]
  },
  {
    title: "🏗️ Software do Sistema (Final)",
    items: [
      { path: "/man-pages", label: "Man-pages, Iana-Etc", icon: BookOpen },
      { path: "/glibc-final", label: "Glibc (final)", icon: Library },
      { path: "/zlib-bzip-xz", label: "Zlib, Bzip2, Xz, Zstd", icon: Package },
      { path: "/file-readline", label: "File, Readline, M4, Bc", icon: FileCode },
      { path: "/flex-tcl-expect", label: "Flex, Tcl, Expect, DejaGNU", icon: Workflow },
      { path: "/binutils-final", label: "Pkgconf, Binutils (final)", icon: Binary },
      { path: "/gmp-mpfr-mpc", label: "GMP, MPFR, MPC", icon: Cpu },
      { path: "/attr-acl-libcap", label: "Attr, Acl, Libcap, Shadow", icon: Lock },
      { path: "/gcc-final", label: "GCC (final)", icon: Cpu },
      { path: "/ncurses-final", label: "Ncurses, Sed, Psmisc, Gettext", icon: Terminal },
      { path: "/bison-grep-bash", label: "Bison, Grep, Bash, Libtool", icon: Terminal },
      { path: "/gdbm-gperf-expat", label: "GDBM, Gperf, Expat, Inetutils", icon: Database },
      { path: "/perl-final", label: "Perl, XML::Parser, Intltool", icon: FileCode },
      { path: "/autoconf-automake", label: "Autoconf, Automake, OpenSSL", icon: Workflow },
      { path: "/kmod-elfutils", label: "Kmod, Elfutils, Libffi", icon: Binary },
      { path: "/python-final", label: "Python, Wheel, Ninja, Meson", icon: Code },
      { path: "/coreutils-final", label: "Coreutils (final)", icon: Boxes },
      { path: "/diffutils-final", label: "Diffutils, Gawk, Findutils", icon: FileCode },
      { path: "/groff-grub", label: "Groff & GRUB", icon: Power },
      { path: "/gzip-iproute-kbd", label: "Gzip, IPRoute2, Kbd", icon: Network },
      { path: "/make-patch-tar", label: "Make, Patch, Tar (final)", icon: Wrench },
      { path: "/texinfo-vim", label: "Texinfo, Vim", icon: FileText },
      { path: "/markupsafe-jinja", label: "Markupsafe, Jinja2", icon: Code },
      { path: "/systemd", label: "Systemd / SysV-Init", icon: Power },
      { path: "/dbus-mandb", label: "D-Bus, Man-DB, Procps-ng", icon: Cog },
      { path: "/util-linux-e2fsprogs", label: "Util-linux, E2fsprogs", icon: HardDrive },
      { path: "/strip-cleanup", label: "Strip & Cleanup", icon: Wrench },
    ]
  },
  {
    title: "⚙️ Configuração do Sistema",
    items: [
      { path: "/config-rede", label: "Configuração de Rede", icon: Network },
      { path: "/bootscripts", label: "Bootscripts / Systemd Units", icon: Power },
      { path: "/locale-config", label: "Configurando Locale", icon: Settings },
      { path: "/inputrc-shells", label: "/etc/inputrc & /etc/shells", icon: FileText },
      { path: "/clock-config", label: "Configurando o Relógio", icon: Cog },
    ]
  },
  {
    title: "🚀 Tornando o LFS Bootável",
    items: [
      { path: "/fstab", label: "/etc/fstab", icon: HardDrive },
      { path: "/kernel", label: "Compilando o Kernel Linux", icon: Cpu },
      { path: "/grub", label: "Configurando o GRUB", icon: Power },
      { path: "/primeiro-boot", label: "O Primeiro Boot", icon: Sparkles },
    ]
  },
  {
    title: "🌟 Beyond LFS (BLFS)",
    items: [
      { path: "/intro-blfs", label: "Introdução ao BLFS", icon: ArrowRight },
      { path: "/package-management", label: "Gerenciamento de Pacotes", icon: Package },
      { path: "/xorg", label: "Configurando Xorg", icon: Layers },
      { path: "/desktop-env", label: "Ambientes Desktop", icon: Box },
      { path: "/networking-blfs", label: "Rede Avançada", icon: Network },
      { path: "/security-blfs", label: "Segurança & Hardening", icon: Shield },
    ]
  },
  {
    title: "📚 Recursos",
    items: [
      { path: "/comandos-essenciais", label: "Comandos Essenciais", icon: Terminal },
      { path: "/troubleshooting", label: "Troubleshooting", icon: ShieldAlert },
      { path: "/referencias", label: "Referências & Links", icon: BookMarked },
    ]
  },
];

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const [location] = useHashLocation();

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-screen w-72 bg-card/95 backdrop-blur border-r border-border z-50",
          "transition-transform duration-300 lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between h-14 px-4 border-b border-border">
          <Link href="/" className="flex items-center gap-2 font-bold text-foreground">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center text-primary text-xs font-extrabold tracking-tight">
              LFS
            </div>
            <span className="text-sm">Linux From Scratch</span>
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="lg:hidden p-1.5 rounded-md hover:bg-muted transition-colors"
            aria-label="Fechar menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="h-[calc(100vh-3.5rem)] overflow-y-auto px-3 py-4 pb-20">
          {NAVIGATION.map((section) => (
            <div key={section.title} className="mb-6">
              <div className="px-2 mb-2 text-[11px] uppercase tracking-wider font-bold text-muted-foreground">
                {section.title}
              </div>
              <ul className="space-y-0.5">
                {section.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = location === item.path;
                  return (
                    <li key={item.path}>
                      <Link
                        href={item.path}
                        className={cn(
                          "flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-colors",
                          isActive
                            ? "bg-primary/15 text-primary font-semibold"
                            : "text-foreground/75 hover:bg-muted hover:text-foreground",
                        )}
                      >
                        <Icon className="w-4 h-4 shrink-0" />
                        <span className="truncate">{item.label}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>
    </>
  );
}

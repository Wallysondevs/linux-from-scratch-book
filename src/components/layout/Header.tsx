import { Menu, ExternalLink } from "lucide-react";

export function Header({ onMenuClick }: { onMenuClick: () => void }) {
  return (
    <header
      className="sticky top-0 z-20 flex items-center justify-between px-5 py-3 backdrop-blur lg:px-10"
      style={{ background: "hsl(var(--lfs-bg) / 0.85)", borderBottom: "1px solid hsl(var(--lfs-orange) / 0.12)" }}
    >
      <button className="lg:hidden p-1.5" onClick={onMenuClick} style={{ color: "hsl(var(--lfs-fg))" }} aria-label="Abrir menu">
        <Menu size={22} />
      </button>
      <div className="text-sm font-medium hidden sm:block" style={{ color: "hsl(var(--lfs-dim))" }}>
        Manual oficial traduzido · LFS 12.4 (systemd)
      </div>
      <a
        href="https://www.linuxfromscratch.org/lfs/view/12.4-systemd/"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1.5 text-sm no-underline px-3 py-1.5 rounded-lg transition-colors"
        style={{ color: "hsl(var(--lfs-amber))", background: "hsl(var(--lfs-bg-2))" }}
      >
        Fonte oficial <ExternalLink size={14} />
      </a>
    </header>
  );
}

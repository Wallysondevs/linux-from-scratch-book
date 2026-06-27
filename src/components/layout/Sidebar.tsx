import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { Terminal, Search, X, ChevronDown } from "lucide-react";

interface Page { slug: string; title: string; }
interface ChapterGroup { id: string; name: string; pages: Page[]; }
interface Props {
  groups: ChapterGroup[];
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
}

export function Sidebar({ groups, isOpen, setIsOpen }: Props) {
  const [location] = useLocation(useHashLocation as any);
  const [query, setQuery] = useState("");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});

  const toggle = (id: string) => setCollapsed((c) => ({ ...c, [id]: !c[id] }));

  const q = query.trim().toLowerCase();
  const filtered = groups
    .map((g) => ({
      ...g,
      pages: q ? g.pages.filter((p) => p.title.toLowerCase().includes(q)) : g.pages,
    }))
    .filter((g) => g.pages.length > 0);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-30 bg-black/60 lg:hidden" onClick={() => setIsOpen(false)} />
      )}
      <aside
        className={`fixed top-0 left-0 z-40 h-screen w-80 flex flex-col transition-transform lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ background: "hsl(var(--lfs-bg-2))", borderRight: "1px solid hsl(var(--lfs-orange) / 0.15)" }}
      >
        {/* Brand */}
        <div className="flex items-center justify-between p-5" style={{ borderBottom: "1px solid hsl(var(--lfs-orange) / 0.15)" }}>
          <Link href="/" className="flex items-center gap-3 no-underline" onClick={() => setIsOpen(false)}>
            <div className="grid place-items-center rounded-lg" style={{ width: 40, height: 40, background: "hsl(var(--lfs-orange))" }}>
              <Terminal size={22} color="#1a1208" />
            </div>
            <div>
              <div className="font-extrabold text-base leading-tight" style={{ color: "hsl(var(--lfs-fg))" }}>Linux From Scratch</div>
              <div className="text-xs" style={{ color: "hsl(var(--lfs-dim))" }}>Versão 12.4 · PT-BR</div>
            </div>
          </Link>
          <button className="lg:hidden p-1" onClick={() => setIsOpen(false)} style={{ color: "hsl(var(--lfs-dim))" }}>
            <X size={20} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "hsl(var(--lfs-dim))" }} />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Buscar capítulo…"
              className="w-full pl-9 pr-3 py-2 rounded-lg text-sm outline-none"
              style={{ background: "hsl(var(--lfs-bg-3))", color: "hsl(var(--lfs-fg))", border: "1px solid hsl(var(--lfs-orange) / 0.15)" }}
            />
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 pb-6">
          {filtered.map((g) => {
            const isCollapsed = collapsed[g.id] && !q;
            return (
              <div key={g.id} className="mb-1">
                <button
                  onClick={() => toggle(g.id)}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-md text-xs font-bold uppercase tracking-wide"
                  style={{ color: "hsl(var(--lfs-amber))" }}
                >
                  <span>{g.name}</span>
                  <ChevronDown size={14} className="transition-transform" style={{ transform: isCollapsed ? "rotate(-90deg)" : "none" }} />
                </button>
                {!isCollapsed && (
                  <ul className="mt-0.5 mb-2">
                    {g.pages.map((p) => {
                      const active = location === `/page/${p.slug}`;
                      return (
                        <li key={p.slug}>
                          <Link
                            href={`/page/${p.slug}`}
                            onClick={() => setIsOpen(false)}
                            className="block pl-5 pr-3 py-1.5 rounded-md text-sm no-underline transition-colors"
                            style={{
                              color: active ? "hsl(var(--lfs-orange))" : "hsl(var(--lfs-fg) / 0.75)",
                              background: active ? "hsl(var(--lfs-orange) / 0.12)" : "transparent",
                              borderLeft: active ? "2px solid hsl(var(--lfs-orange))" : "2px solid transparent",
                              fontWeight: active ? 600 : 400,
                            }}
                          >
                            {p.title}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </div>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

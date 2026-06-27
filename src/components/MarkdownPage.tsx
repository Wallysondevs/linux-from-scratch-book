import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Link } from "wouter";
import { ChevronLeft, ChevronRight, Copy, Check } from "lucide-react";

interface NavItem { slug: string; title: string; }
interface Props {
  path: string;
  found?: boolean;
  prev?: NavItem | null;
  next?: NavItem | null;
}

function CodeBlock({ children }: { children?: React.ReactNode }) {
  const [copied, setCopied] = useState(false);
  const getText = (node: React.ReactNode): string => {
    if (typeof node === "string") return node;
    if (Array.isArray(node)) return node.map(getText).join("");
    if (node && typeof node === "object" && "props" in (node as any))
      return getText((node as any).props.children);
    return "";
  };
  const copy = () => {
    const text = getText(children);
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };
  return (
    <pre className="group">
      <button
        onClick={copy}
        className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-md"
        style={{ background: "hsl(var(--lfs-bg-3))", color: copied ? "hsl(var(--lfs-green))" : "hsl(var(--lfs-dim))" }}
        title="Copiar"
        aria-label="Copiar código"
      >
        {copied ? <Check size={15} /> : <Copy size={15} />}
      </button>
      {children}
    </pre>
  );
}

export function MarkdownPage({ path, found = true, prev, next }: Props) {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    setLoading(true);
    fetch(`${import.meta.env.BASE_URL}docs/${path}`)
      .then((r) => (r.ok ? r.text() : "# Página não encontrada"))
      .then((text) => { setContent(text); setLoading(false); })
      .catch(() => { setContent("# Erro ao carregar a página"); setLoading(false); });
  }, [path]);

  if (loading)
    return <div className="animate-pulse" style={{ color: "hsl(var(--lfs-dim))" }}>Carregando…</div>;

  return (
    <div className="fade-in">
      <article className="prose">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          rehypePlugins={[rehypeRaw]}
          components={{ pre: ({ children }) => <CodeBlock>{children}</CodeBlock> }}
        >
          {content}
        </ReactMarkdown>
      </article>

      <nav className="flex justify-between gap-4 mt-12 pt-6" style={{ borderTop: "1px solid hsl(var(--lfs-orange) / 0.15)" }}>
        {prev ? (
          <Link href={`/page/${prev.slug}`} className="flex items-center gap-2 px-4 py-3 rounded-lg flex-1 no-underline transition-colors"
            style={{ background: "hsl(var(--lfs-bg-2))", color: "hsl(var(--lfs-fg))" }}>
            <ChevronLeft size={18} style={{ color: "hsl(var(--lfs-orange))" }} />
            <span className="text-sm truncate">{prev.title}</span>
          </Link>
        ) : <div className="flex-1" />}
        {next ? (
          <Link href={`/page/${next.slug}`} className="flex items-center justify-end gap-2 px-4 py-3 rounded-lg flex-1 no-underline transition-colors text-right"
            style={{ background: "hsl(var(--lfs-bg-2))", color: "hsl(var(--lfs-fg))" }}>
            <span className="text-sm truncate">{next.title}</span>
            <ChevronRight size={18} style={{ color: "hsl(var(--lfs-orange))" }} />
          </Link>
        ) : <div className="flex-1" />}
      </nav>
    </div>
  );
}

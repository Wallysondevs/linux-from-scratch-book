import { Menu, Moon, Sun, Github } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 glass-panel border-b border-border">
      <div className="flex items-center justify-between h-14 px-4 sm:px-6">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 -ml-2 rounded-md hover:bg-muted transition-colors"
          aria-label="Abrir menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="hidden lg:block text-sm text-muted-foreground font-medium">
          Linux From Scratch — Livro Completo em Português
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://www.linuxfromscratch.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground"
            title="Site oficial do LFS"
          >
            <Github className="w-5 h-5" />
          </a>
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md hover:bg-muted transition-colors text-muted-foreground"
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}

import { Link } from "wouter";
import { Home as HomeIcon } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
      <div className="text-7xl font-extrabold text-primary mb-4">404</div>
      <h1 className="text-2xl font-bold text-foreground mb-2">Página não encontrada</h1>
      <p className="text-muted-foreground mb-6">A página que você procura não existe neste livro.</p>
      <Link href="/">
        <a className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-semibold hover:opacity-90 transition-opacity">
          <HomeIcon className="w-4 h-4" />
          Voltar ao início
        </a>
      </Link>
    </div>
  );
}

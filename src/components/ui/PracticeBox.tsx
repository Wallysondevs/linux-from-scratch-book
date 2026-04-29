import { Wrench } from "lucide-react";

interface PracticeBoxProps {
  title: string;
  children: React.ReactNode;
}

export function PracticeBox({ title, children }: PracticeBoxProps) {
  return (
    <div className="my-6 rounded-xl border border-primary/30 bg-primary/5 overflow-hidden">
      <div className="flex items-center gap-2 px-5 py-3 bg-primary/10 border-b border-primary/20">
        <Wrench className="w-4 h-4 text-primary" />
        <span className="text-sm font-bold uppercase tracking-wider text-primary">
          Prática Guiada — {title}
        </span>
      </div>
      <div className="p-5 space-y-3 text-sm text-foreground/90 leading-relaxed">
        {children}
      </div>
    </div>
  );
}

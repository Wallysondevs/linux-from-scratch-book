import { cn } from "@/lib/utils";

type Level = "iniciante" | "intermediario" | "avancado";

interface DifficultyBadgeProps {
  level: Level;
}

const styles: Record<Level, string> = {
  iniciante: "bg-green-500/15 text-green-400 border-green-500/30",
  intermediario: "bg-yellow-500/15 text-yellow-400 border-yellow-500/30",
  avancado: "bg-red-500/15 text-red-400 border-red-500/30",
};

const labels: Record<Level, string> = {
  iniciante: "Iniciante",
  intermediario: "Intermediário",
  avancado: "Avançado",
};

export function DifficultyBadge({ level }: DifficultyBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border uppercase tracking-wide",
        styles[level],
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {labels[level]}
    </span>
  );
}

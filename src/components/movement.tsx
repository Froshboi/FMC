import { ArrowDown, ArrowUp, Minus } from "lucide-react";
import { cn } from "@/lib/utils";

export function Movement({ curr, prev, className }: { curr: number; prev: number | null; className?: string }) {
  if (prev === null) {
    return <span className={cn("inline-flex items-center gap-1 text-xs font-semibold text-warning", className)}>NEW</span>;
  }
  const diff = prev - curr;
  if (diff === 0) return <span className={cn("inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground", className)}><Minus className="h-3 w-3" /> —</span>;
  if (diff > 0) return <span className={cn("inline-flex items-center gap-1 text-xs font-semibold text-[oklch(0.72_0.17_155)]", className)}><ArrowUp className="h-3 w-3" /> {diff}</span>;
  return <span className={cn("inline-flex items-center gap-1 text-xs font-semibold text-primary", className)}><ArrowDown className="h-3 w-3" /> {Math.abs(diff)}</span>;
}

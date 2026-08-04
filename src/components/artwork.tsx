import { cn } from "@/lib/utils";

const isAssetPath = (value: string) => value.startsWith("/") || value.startsWith("http");

export function Artwork({
  gradient,
  title,
  artist,
  size = "md",
  className,
}: {
  gradient: string;
  title: string;
  artist?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}) {
  const sizes: Record<string, string> = {
    xs: "h-8 w-8 text-[8px]",
    sm: "h-10 w-10 text-[9px]",
    md: "h-14 w-14 text-[10px]",
    lg: "h-24 w-24 text-xs",
    xl: "h-full w-full text-lg",
  };

  const commonClasses = cn("overflow-hidden rounded-md shrink-0 shadow-lg", sizes[size], className);

  if (isAssetPath(gradient)) {
    return (
      <div className={commonClasses}>
        <img src={gradient} alt={title} className="h-full w-full object-cover" />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-gradient-to-br shrink-0 shadow-lg",
        gradient,
        sizes[size],
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.25),transparent_60%)]" />
      <div className="absolute inset-0 mix-blend-overlay bg-[repeating-linear-gradient(45deg,transparent,transparent_8px,rgba(0,0,0,0.08)_8px,rgba(0,0,0,0.08)_9px)]" />
      <div className="relative flex h-full w-full flex-col items-center justify-center p-1 text-center font-display font-bold uppercase tracking-tight leading-tight text-white/95 drop-shadow">
        <span className="line-clamp-2 break-words">{title}</span>
        {artist && size !== "xs" && size !== "sm" && (
          <span className="mt-1 text-[0.6em] font-medium tracking-wider text-white/70">
            {artist}
          </span>
        )}
      </div>
    </div>
  );
}

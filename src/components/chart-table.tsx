import { Link } from "@tanstack/react-router";
import { Play } from "lucide-react";
import { Artwork } from "./artwork";
import { Movement } from "./movement";
import { getAppleMusicSearchUrl, HOME_CONTENT, SONGS } from "@/lib/data";
import { fmt } from "@/lib/format";
import { useMemo, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowUpDown } from "lucide-react";

const isAssetPath = (value?: string) => !!value && (value.startsWith("/") || value.startsWith("http"));

type Key = "rank" | "title" | "artistName" | "peak" | "weeks" | "score" | "streams";

export function ChartTable({ songs = SONGS, limit }: { songs?: typeof SONGS; limit?: number }) {
  const [sort, setSort] = useState<Key>("rank");
  const [asc, setAsc] = useState(true);
  const [page, setPage] = useState(1);
  const perPage = limit ?? 25;
  const showRankNumbers = HOME_CONTENT.showChartNumbers;

  const sorted = useMemo(() => {
    const arr = [...songs].sort((a, b) => {
      const av = a[sort] as number | string;
      const bv = b[sort] as number | string;
      if (typeof av === "number" && typeof bv === "number") return asc ? av - bv : bv - av;
      return asc ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
    });
    return arr;
  }, [songs, sort, asc]);

  const totalPages = Math.ceil(sorted.length / perPage);
  const paged = limit ? sorted.slice(0, limit) : sorted.slice((page - 1) * perPage, page * perPage);

  const toggle = (k: Key) => { if (sort === k) setAsc(!asc); else { setSort(k); setAsc(true); } };
  const th = (label: string, k?: Key, cls?: string) => (
    <th className={cn("sticky top-0 z-10 bg-surface/80 backdrop-blur px-3 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground", cls)}>
      {k ? (
        <button onClick={() => toggle(k)} className="inline-flex items-center gap-1 hover:text-foreground">
          {label} <ArrowUpDown className="h-3 w-3 opacity-50" />
        </button>
      ) : label}
    </th>
  );

  return (
    <div className="glass overflow-hidden rounded-[20px] border border-border/50">
      <div className="max-h-[720px] overflow-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              {showRankNumbers && th("#", "rank", "w-14")}
              {th("Mvt", undefined, "w-14")}
              {th("Song", "title")}
              {th("Artist", "artistName", "hidden md:table-cell")}
              {th("Label", undefined, "hidden lg:table-cell")}
              {th("Peak", "peak", "w-16 text-center")}
              {th("Wks", "weeks", "w-16 text-center")}
              {th("Streams", "streams", "hidden md:table-cell w-28 text-right")}
              {th("Score", "score", "w-20 text-right")}
              <th className="w-12" />
            </tr>
          </thead>
          <tbody>
            {paged.map((s) => (
              <tr key={s.id} className="group border-b border-border/50 transition-colors hover:bg-white/[0.03]">
                {showRankNumbers && (
                  <td className="px-3 py-2.5">
                    <div className={cn(
                      "flex h-9 w-9 items-center justify-center rounded-md font-display text-sm font-bold tabular-nums",
                      s.rank === 1 ? "bg-primary text-primary-foreground shadow-glow" : "bg-surface-2 text-foreground",
                    )}>{s.rank}</div>
                  </td>
                )}
                <td className="px-3 py-2.5"><Movement curr={s.rank} prev={s.prevRank} /></td>
                <td className="px-3 py-2.5">
                  <Link to="/songs/$id" params={{ id: s.id }} className="flex items-center gap-3 min-w-0">
                    {isAssetPath(s.image) || isAssetPath(s.artwork) ? (
                      <img src={s.image ?? s.artwork} alt={s.title} className="h-14 w-14 rounded-md object-cover shadow-lg" />
                    ) : (
                      <Artwork gradient={s.artwork} title={s.title} size="md" />
                    )}
                    <div className="min-w-0">
                      <div className="truncate font-semibold text-foreground group-hover:text-primary">{s.title}</div>
                      <div className="truncate text-xs text-muted-foreground md:hidden">{s.artistName}</div>
                    </div>
                  </Link>
                </td>
                <td className="hidden px-3 py-2.5 md:table-cell">
                  <Link to="/artists/$id" params={{ id: s.artistId }} className="text-sm text-foreground/90 hover:text-primary">
                    {s.artistName}
                  </Link>
                </td>
                <td className="hidden px-3 py-2.5 lg:table-cell text-xs text-muted-foreground">{s.label}</td>
                <td className="px-3 py-2.5 text-center font-mono text-xs">#{s.peak}</td>
                <td className="px-3 py-2.5 text-center font-mono text-xs">{s.weeks}</td>
                <td className="hidden px-3 py-2.5 md:table-cell text-right font-mono text-xs text-muted-foreground">{fmt(s.streams)}</td>
                <td className="px-3 py-2.5 text-right font-mono text-sm font-semibold tabular-nums">{s.score.toFixed(2)}</td>
                <td className="px-3 py-2.5">
                  <a
                    href={getAppleMusicSearchUrl(s.title, s.artistName)}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-8 w-8 items-center justify-center rounded-full border border-border text-muted-foreground hover:border-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    <Play className="h-3 w-3 fill-current" />
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!limit && totalPages > 1 && (
        <div className="flex items-center justify-between border-t border-border px-4 py-3 text-xs">
          <div className="text-muted-foreground">
            Page {page} of {totalPages} · {sorted.length} songs
          </div>
          <div className="flex gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={cn(
                  "h-8 min-w-8 rounded-md px-2 text-xs font-semibold",
                  page === i + 1 ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground hover:text-foreground",
                )}
              >{i + 1}</button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { SONGS, gainers, drops } from "@/lib/data";
import { Movement } from "@/components/movement";
import { Artwork } from "@/components/artwork";

export const Route = createFileRoute("/trending")({
  head: () => ({ meta: [{ title: "Trending — FROSHBOI MEDIA" }] }),
  component: () => {
    const debuts = SONGS.filter(s => s.prevRank === null).slice(0, 5);
    const longestRunning = [...SONGS].sort((a,b)=>b.weeks-a.weeks).slice(0,5);
    return (
      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <PageHeader eyebrow="Insights" title="What's Moving This Week" description="The biggest movers, debuts and consistent performers on the Frosh Top 100." />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          <Panel title="Biggest Gainers" accent="text-[oklch(0.72_0.17_155)]" list={gainers} />
          <Panel title="Biggest Drops" accent="text-primary" list={drops} />
          <Panel title="Highest Debuts" accent="text-warning" list={debuts} />
          <Panel title="Longest Running" accent="text-foreground" list={longestRunning} />
        </div>
      </div>
    );
  },
});

function Panel({ title, list, accent }: { title: string; list: typeof SONGS; accent: string }) {
  return (
    <section className="glass rounded-xl p-5">
      <div className={"mb-4 text-[11px] font-bold uppercase tracking-widest " + accent}>{title}</div>
      <ol className="space-y-3">
        {list.map((s, i) => (
          <li key={s.id} className="flex items-center gap-3">
            <span className="w-4 font-mono text-xs text-muted-foreground">{i + 1}</span>
            <Artwork gradient={s.artwork} title={s.title} size="md" />
            <div className="flex-1 min-w-0">
              <div className="truncate font-semibold text-sm">{s.title}</div>
              <div className="truncate text-xs text-muted-foreground">{s.artistName}</div>
            </div>
            <Movement curr={s.rank} prev={s.prevRank} />
          </li>
        ))}
      </ol>
    </section>
  );
}

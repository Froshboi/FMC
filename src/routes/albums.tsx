import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ALBUMS } from "@/lib/data";
import { Artwork } from "@/components/artwork";
import { fmt } from "@/lib/format";
import { Movement } from "@/components/movement";

export const Route = createFileRoute("/albums")({
  head: () => ({ meta: [{ title: "Albums Chart — FROSHBOI MEDIA" }] }),
  component: () => (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <PageHeader eyebrow="Chart" title="Top 50 Albums" description="The best-performing albums on Frosh this week." />
      <div className="grid gap-6 lg:grid-cols-2">
        {ALBUMS.map((a) => (
          <Link to="/albums/$id" params={{ id: a.id }} key={a.id} className="glass group flex gap-5 rounded-xl p-5 transition-transform hover:-translate-y-0.5">
            <div className="relative">
              <Artwork gradient={a.artwork} title={a.title} artist={a.artistName} size="xl" className="h-32 w-32" />
              <div className="absolute -left-2 -top-2 flex h-10 w-10 items-center justify-center rounded-md bg-primary font-display text-lg font-black text-primary-foreground shadow-glow">{a.rank}</div>
            </div>
            <div className="flex flex-1 flex-col justify-between min-w-0">
              <div>
                <div className="truncate font-display text-2xl font-bold group-hover:text-primary">{a.title}</div>
                <div className="text-sm text-muted-foreground">{a.artistName} · {a.label}</div>
                <div className="mt-2 inline-flex rounded bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">{a.certification}</div>
              </div>
              <div className="grid grid-cols-4 gap-3 text-sm">
                <div><div className="text-[10px] uppercase text-muted-foreground">Streams</div><div className="font-mono font-semibold">{fmt(a.streams)}</div></div>
                <div><div className="text-[10px] uppercase text-muted-foreground">Peak</div><div className="font-mono font-semibold">#{a.peak}</div></div>
                <div><div className="text-[10px] uppercase text-muted-foreground">Weeks</div><div className="font-mono font-semibold">{a.weeks}</div></div>
                <div><div className="text-[10px] uppercase text-muted-foreground">Movement</div><Movement curr={a.rank} prev={a.prevRank} /></div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ),
});

import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getAlbum, getArtist } from "@/lib/data";
import { Artwork } from "@/components/artwork";
import { fmt } from "@/lib/format";
import { Play } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";
import { CHART_METRICS } from "@/lib/data";

export const Route = createFileRoute("/albums/$id")({
  loader: ({ params }) => {
    const album = getAlbum(params.id);
    if (!album) throw notFound();
    return { album, artist: getArtist(album.artistId)! };
  },
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
  notFoundComponent: () => <div className="p-10 text-center">Album not found.</div>,
  component: AlbumPage,
});

function AlbumPage() {
  const { album, artist } = Route.useLoaderData();
  const trend = Array.from({ length: 12 }, (_, i) => ({ w: `W${i + 1}`, rank: Math.max(1, album.peak + Math.round(Math.sin(i / 2) * 3) + (i > 8 ? 1 : 0)) }));

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <div className="glass rounded-2xl p-8 md:p-10">
        <div className="grid gap-8 md:grid-cols-[280px_minmax(0,1fr)]">
          <Artwork gradient={album.artwork} title={album.title} artist={album.artistName} size="xl" className="aspect-square" />
          <div className="flex flex-col justify-between gap-4">
            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-primary">Album · {album.genre}</div>
              <h1 className="font-display text-5xl font-black tracking-tight md:text-6xl">{album.title}</h1>
              <Link to="/artists/$id" params={{ id: artist.id }} className="mt-2 block font-display text-2xl font-bold text-primary">{artist.name}</Link>
              <div className="mt-2 text-sm text-muted-foreground">{album.label} · Released {album.release}</div>
            </div>
            <div className="grid grid-cols-5 gap-3">
              {[
                ["Rank", `#${album.rank}`], ["Peak", `#${album.peak}`], ["Weeks", album.weeks],
                ["Streams", fmt(album.streams)], ["Cert.", album.certification],
              ].map(([k, v]) => (
                <div key={k}><div className="text-[10px] uppercase tracking-widest text-muted-foreground">{k}</div><div className="mt-1 font-display text-xl font-bold">{v}</div></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <section className="glass rounded-xl p-6">
          <h2 className="mb-4 font-display text-xl font-bold">Tracklist</h2>
          <ul className="divide-y divide-border">
            {album.tracklist.map((t: any) => (
              <li key={t.n} className="flex items-center gap-4 py-3 hover:bg-white/5">
                <span className="w-6 text-right font-mono text-sm text-muted-foreground">{t.n}</span>
                <div className="flex-1"><div className="font-semibold">{t.title}</div></div>
                <div className="hidden text-xs text-muted-foreground md:block">{fmt(t.streams)} streams</div>
                <div className="w-14 text-right font-mono text-xs text-muted-foreground">{t.duration}</div>
                <button className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground"><Play className="h-3 w-3 fill-current" /></button>
              </li>
            ))}
          </ul>
        </section>
        <aside className="space-y-6">
          <section className="glass rounded-xl p-6">
            <h2 className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">Chart Trajectory</h2>
            <div className="h-48">
              <ResponsiveContainer>
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                  <XAxis dataKey="w" stroke="oklch(1 0 0 / 0.4)" fontSize={10} />
                  <YAxis reversed domain={[1, 50]} stroke="oklch(1 0 0 / 0.4)" fontSize={10} />
                  <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }} />
                  <Line type="monotone" dataKey="rank" stroke="var(--color-primary)" strokeWidth={2.5} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </section>
          <section className="glass rounded-xl p-6">
            <h2 className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">Streaming Breakdown</h2>
            <div className="h-40">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={CHART_METRICS} dataKey="value" innerRadius={30} outerRadius={60} paddingAngle={2} stroke="none">
                    {CHART_METRICS.map((m, i) => <Cell key={i} fill={m.color} />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

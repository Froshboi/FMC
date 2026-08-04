import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getArtist, songsByArtist, albumsByArtist } from "@/lib/data";
import { fmt } from "@/lib/format";
import { BadgeCheck, Play } from "lucide-react";
import { Artwork } from "@/components/artwork";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/artists/$id")({
  loader: ({ params }) => {
    const artist = getArtist(params.id);
    if (!artist) throw notFound();
    return { artist };
  },
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
  notFoundComponent: () => <div className="p-10 text-center">Artist not found.</div>,
  component: ArtistPage,
});

function ArtistPage() {
  const { artist } = Route.useLoaderData();
  const songs = songsByArtist(artist.id);
  const albums = albumsByArtist(artist.id);
  const growth = Array.from({ length: 12 }, (_, i) => ({
    m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i],
    listeners: Math.round(artist.monthlyListeners * (0.6 + i * 0.035 + Math.sin(i) * 0.04)),
  }));

  return (
    <div>
      <div className="relative h-72 overflow-hidden md:h-96">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/60 via-rose-900 to-neutral-950" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(255,49,49,0.35),transparent_50%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="relative mx-auto flex h-full max-w-[1600px] items-end gap-6 px-6 pb-8">
          <div className="h-32 w-32 shrink-0 rounded-full border-4 border-background bg-gradient-to-br from-primary to-neutral-900 shadow-2xl md:h-44 md:w-44">
            <div className="flex h-full w-full items-center justify-center font-display text-5xl font-black text-white">
              {artist.name.split(" ").map((w: string) => w[0]).join("")}
            </div>
          </div>
          <div className="pb-2">
            <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-primary">Verified Artist <BadgeCheck className="h-4 w-4 fill-primary text-primary-foreground" /></div>
            <h1 className="font-display text-5xl font-black tracking-tight md:text-7xl">{artist.name}</h1>
            <div className="mt-2 text-sm text-muted-foreground">{artist.label} · {artist.genres.join(" · ")}</div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,2.4fr)_minmax(0,1fr)]">
          <div className="space-y-6">
            <div className="glass grid grid-cols-2 gap-px overflow-hidden rounded-xl md:grid-cols-4">
              {[
                ["Monthly Listeners", fmt(artist.monthlyListeners)],
                ["Followers", fmt(artist.followers)],
                ["Chart Entries", songs.length],
                ["Highest Peak", "#1"],
              ].map(([k, v]) => (
                <div key={k} className="bg-surface p-5">
                  <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{k}</div>
                  <div className="mt-2 font-display text-3xl font-bold tabular-nums">{v}</div>
                </div>
              ))}
            </div>

            <section className="glass rounded-xl p-6">
              <h2 className="mb-4 font-display text-xl font-bold">Streaming Growth</h2>
              <div className="h-72">
                <ResponsiveContainer>
                  <AreaChart data={growth}>
                    <defs>
                      <linearGradient id="ga" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.6} />
                        <stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                    <XAxis dataKey="m" stroke="oklch(1 0 0 / 0.4)" fontSize={11} />
                    <YAxis stroke="oklch(1 0 0 / 0.4)" fontSize={11} tickFormatter={fmt} />
                    <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", borderRadius: 8 }} />
                    <Area type="monotone" dataKey="listeners" stroke="var(--color-primary)" strokeWidth={2} fill="url(#ga)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </section>

            <section className="glass rounded-xl p-6">
              <h2 className="mb-4 font-display text-xl font-bold">Top Songs</h2>
              <ul className="divide-y divide-border">
                {songs.slice(0, 8).map((s) => (
                  <li key={s.id}>
                    <Link to="/songs/$id" params={{ id: s.id }} className="flex items-center gap-3 py-3 hover:bg-white/5">
                      <span className="w-6 font-mono text-sm text-muted-foreground">{s.rank}</span>
                      <Artwork gradient={s.artwork} title={s.title} size="md" />
                      <div className="flex-1">
                        <div className="font-semibold">{s.title}</div>
                        <div className="text-xs text-muted-foreground">{fmt(s.streams)} streams · Peak #{s.peak}</div>
                      </div>
                      <button className="flex h-8 w-8 items-center justify-center rounded-full border border-border hover:border-primary hover:bg-primary hover:text-primary-foreground">
                        <Play className="h-3 w-3 fill-current" />
                      </button>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>

            {albums.length > 0 && (
              <section className="glass rounded-xl p-6">
                <h2 className="mb-4 font-display text-xl font-bold">Albums</h2>
                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
                  {albums.map((a) => (
                    <Link to="/albums/$id" key={a.id} params={{ id: a.id }} className="group">
                      <Artwork gradient={a.artwork} title={a.title} artist={a.artistName} size="xl" className="aspect-square" />
                      <div className="mt-2 font-semibold group-hover:text-primary">{a.title}</div>
                      <div className="text-xs text-muted-foreground">{a.certification} · {fmt(a.streams)}</div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-6">
            <div className="glass rounded-xl p-6">
              <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">Biography</h3>
              <p className="text-sm leading-relaxed text-foreground/90">{artist.bio}</p>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">Details</h3>
              <dl className="space-y-3 text-sm">
                {[
                  ["Country", artist.country],
                  ["Label", artist.label],
                  ["Genres", artist.genres.join(", ")],
                  ["Management", "Frosh Talent Agency"],
                ].map(([k, v]) => (
                  <div key={k} className="flex justify-between gap-3">
                    <dt className="text-muted-foreground">{k}</dt>
                    <dd className="text-right font-medium">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="glass rounded-xl p-6">
              <h3 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">Career Milestones</h3>
              <ul className="space-y-3 text-sm">
                {[
                  ["#1 Songs", "8"], ["#1 Albums", "3"], ["Weeks at #1", "47"], ["Awards Won", "24"],
                ].map(([k, v]) => (
                  <li key={k} className="flex items-center justify-between">
                    <span className="text-muted-foreground">{k}</span>
                    <span className="font-display text-lg font-bold text-primary">{v}</span>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

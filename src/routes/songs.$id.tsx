import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { getSong, getArtist } from "@/lib/data";
import { Artwork } from "@/components/artwork";
import { fmt } from "@/lib/format";
import { Play, Share2 } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell } from "recharts";

export const Route = createFileRoute("/songs/$id")({
  loader: ({ params }) => {
    const song = getSong(params.id);
    if (!song) throw notFound();
    return { song, artist: getArtist(song.artistId)! };
  },
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
  notFoundComponent: () => <div className="p-10 text-center">Song not found.</div>,
  component: SongPage,
});

function SongPage() {
  const { song, artist } = Route.useLoaderData();

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <section className="glass overflow-hidden rounded-2xl">
        <div className="grid gap-8 p-8 md:grid-cols-[320px_minmax(0,1fr)] md:p-10">
          <Artwork gradient={song.artwork} title={song.title} artist={artist.name} size="xl" className="aspect-square" />
          <div className="flex flex-col justify-between gap-6">
            <div>
              <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-primary">{song.genre} · Single</div>
              <h1 className="font-display text-5xl font-black tracking-tight md:text-6xl">{song.title}</h1>
              <Link to="/artists/$id" params={{ id: artist.id }} className="mt-2 block font-display text-2xl font-bold uppercase text-primary">{artist.name}</Link>
              <div className="mt-3 text-sm text-muted-foreground">
                {song.label} · Released {song.release} · ISRC {song.isrc}
              </div>
            </div>
            <div className="grid grid-cols-4 gap-4">
              <Stat label="Chart Position" value={`#${song.rank}`} />
              <Stat label="Peak" value={`#${song.peak}`} />
              <Stat label="Weeks" value={song.weeks} />
              <Stat label="Score" value={song.score.toFixed(2)} accent />
            </div>
            <div className="flex flex-wrap gap-3">
              <button className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary-glow">
                <Play className="h-4 w-4 fill-current" /> Play
              </button>
              {["Spotify", "Apple Music", "Audiomack", "Boomplay", "YouTube"].map((p) => (
                <button key={p} className="rounded-full border border-border px-4 py-2 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-muted">{p}</button>
              ))}
              <button className="ml-auto inline-flex h-11 w-11 items-center justify-center rounded-full border border-border hover:bg-muted"><Share2 className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <div className="space-y-6">
          <Panel title="Chart History">
            <div className="h-72">
              <ResponsiveContainer>
                <LineChart data={song.history}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                  <XAxis dataKey="week" stroke="oklch(1 0 0 / 0.4)" fontSize={11} />
                  <YAxis reversed domain={[1, 100]} stroke="oklch(1 0 0 / 0.4)" fontSize={11} />
                  <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }} />
                  <Line type="monotone" dataKey="rank" stroke="var(--color-primary)" strokeWidth={2.5} dot={{ r: 3 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Daily Streams">
            <div className="h-56">
              <ResponsiveContainer>
                <BarChart data={song.daily}>
                  <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                  <XAxis dataKey="day" stroke="oklch(1 0 0 / 0.4)" fontSize={11} />
                  <YAxis stroke="oklch(1 0 0 / 0.4)" fontSize={11} tickFormatter={fmt} />
                  <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }} formatter={(v: number) => fmt(v)} />
                  <Bar dataKey="streams" fill="var(--color-primary)" radius={[4,4,0,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Platform Breakdown">
            <div className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)]">
              <div className="h-56">
                <ResponsiveContainer>
                  <PieChart>
                    <Pie data={song.breakdown} dataKey="value" innerRadius={44} outerRadius={80} paddingAngle={2} stroke="none">
                      {song.breakdown.map((b: any, i: number) => <Cell key={i} fill={b.color} />)}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="space-y-2 self-center">
                {song.breakdown.map((b: any) => (
                  <li key={b.platform} className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2">
                      <span className="h-3 w-3 rounded-sm" style={{ background: b.color }} />
                      <span className="uppercase tracking-wider text-muted-foreground text-xs">{b.platform}</span>
                    </span>
                    <span className="font-mono font-semibold">{b.value}%</span>
                  </li>
                ))}
              </ul>
            </div>
          </Panel>
        </div>

        <aside className="space-y-6">
          <Panel title="Credits">
            <dl className="space-y-3 text-sm">
              <Row k="Artist" v={artist.name} />
              <Row k="Label" v={song.label} />
              <Row k="Genre" v={song.genre} />
              <Row k="Release" v={song.release} />
              <Row k="ISRC" v={song.isrc} />
              <Row k="Producers" v={song.producers.join(", ")} />
              <Row k="Writers" v={song.writers.join(", ")} />
            </dl>
          </Panel>
          <Panel title="Streaming Stats">
            <ul className="space-y-3 text-sm">
              {[
                ["Daily Streams", fmt(Math.round(song.streams / 7))],
                ["Weekly Streams", fmt(song.streams)],
                ["Monthly Streams", fmt(song.streams * 4)],
                ["TikTok Videos", fmt(23400 + song.rank * 120)],
                ["YouTube Views", fmt(song.streams * 3)],
              ].map(([k, v]) => (
                <li key={k} className="flex items-center justify-between">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-mono font-semibold">{v}</span>
                </li>
              ))}
            </ul>
          </Panel>
          <Panel title="Achievements">
            <ul className="space-y-2 text-sm">
              {[
                song.peak === 1 ? "🥇 Reached #1 on Frosh Top 100" : `🏅 Peaked at #${song.peak}`,
                `🔥 ${song.weeks} weeks on chart`,
                `💿 Certified ${song.streams > 50_000_000 ? "Diamond" : "Platinum"}`,
                "📺 Featured on Editorial 'This Week in Afrobeats'",
              ].map((m) => (
                <li key={m} className="rounded-md bg-surface-2 px-3 py-2 text-xs">{m}</li>
              ))}
            </ul>
          </Panel>
        </aside>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass rounded-xl p-6">
      <h2 className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h2>
      {children}
    </section>
  );
}
function Row({ k, v }: { k: string; v: string }) {
  return <div className="flex justify-between gap-4"><dt className="text-muted-foreground">{k}</dt><dd className="text-right font-medium">{v}</dd></div>;
}
function Stat({ label, value, accent }: { label: string; value: React.ReactNode; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={"mt-1 font-display text-2xl font-bold tabular-nums " + (accent ? "text-primary" : "")}>{value}</div>
    </div>
  );
}

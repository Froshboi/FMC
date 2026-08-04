import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { SONGS, ARTISTS, ALBUMS } from "@/lib/data";
import { useState, useMemo } from "react";
import { Search as SearchIcon } from "lucide-react";
import { Artwork } from "@/components/artwork";

export const Route = createFileRoute("/search")({
  head: () => ({ meta: [{ title: "Search — FROSHBOI MEDIA" }] }),
  component: () => {
    const [q, setQ] = useState("");
    const ql = q.toLowerCase();
    const songs = useMemo(() => q ? SONGS.filter(s => s.title.toLowerCase().includes(ql) || s.artistName.toLowerCase().includes(ql)).slice(0, 10) : [], [ql, q]);
    const artists = useMemo(() => q ? ARTISTS.filter(a => a.name.toLowerCase().includes(ql)).slice(0, 8) : [], [ql, q]);
    const albums = useMemo(() => q ? ALBUMS.filter(a => a.title.toLowerCase().includes(ql) || a.artistName.toLowerCase().includes(ql)).slice(0, 6) : [], [ql, q]);

    return (
      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <PageHeader eyebrow="Global Search" title="Search Everything" description="Songs, artists, albums, labels and genres — all in one place." />
        <div className="glass mb-8 flex items-center gap-3 rounded-2xl px-6 py-4">
          <SearchIcon className="h-5 w-5 text-muted-foreground" />
          <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="Try 'Davido', 'Amapiano', 'Timeless'…" className="flex-1 bg-transparent text-lg outline-none placeholder:text-muted-foreground" />
        </div>
        {!q ? (
          <div className="text-center text-muted-foreground py-24">Start typing to search across songs, artists and albums.</div>
        ) : (
          <div className="grid gap-8 lg:grid-cols-3">
            <Section title={`Songs (${songs.length})`}>
              {songs.map((s) => (
                <Link to="/songs/$id" params={{ id: s.id }} key={s.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/5">
                  <Artwork gradient={s.artwork} title={s.title} size="md" />
                  <div className="min-w-0"><div className="truncate font-semibold">{s.title}</div><div className="truncate text-xs text-muted-foreground">{s.artistName}</div></div>
                </Link>
              ))}
            </Section>
            <Section title={`Artists (${artists.length})`}>
              {artists.map((a) => (
                <Link to="/artists/$id" params={{ id: a.id }} key={a.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/5">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary to-neutral-900" />
                  <div><div className="font-semibold">{a.name}</div><div className="text-xs text-muted-foreground">{a.genres[0]}</div></div>
                </Link>
              ))}
            </Section>
            <Section title={`Albums (${albums.length})`}>
              {albums.map((a) => (
                <Link to="/albums/$id" params={{ id: a.id }} key={a.id} className="flex items-center gap-3 rounded-lg p-2 hover:bg-white/5">
                  <Artwork gradient={a.artwork} title={a.title} size="md" />
                  <div className="min-w-0"><div className="truncate font-semibold">{a.title}</div><div className="truncate text-xs text-muted-foreground">{a.artistName}</div></div>
                </Link>
              ))}
            </Section>
          </div>
        )}
      </div>
    );
  },
});

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="glass rounded-xl p-5">
      <h2 className="mb-3 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h2>
      <div className="space-y-1">{children}</div>
    </section>
  );
}

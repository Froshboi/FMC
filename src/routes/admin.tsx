import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { SONGS, ARTISTS, ALBUMS, NEWS } from "@/lib/data";
import { LayoutDashboard, Music, Users, Disc, Radio, FileText, Lock, Settings } from "lucide-react";
import { useState } from "react";

const SIDEBAR = [
  { icon: LayoutDashboard, label: "Dashboard", key: "dash" },
  { icon: Music, label: "Songs", key: "songs" },
  { icon: Disc, label: "Albums", key: "albums" },
  { icon: Users, label: "Artists", key: "artists" },
  { icon: Radio, label: "Charts", key: "charts" },
  { icon: FileText, label: "Editorial", key: "editorial" },
  { icon: Lock, label: "Users", key: "users" },
  { icon: Settings, label: "Settings", key: "settings" },
] as const;

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin Console — FROSHBOI MEDIA" }] }),
  component: Admin,
});

function Admin() {
  const [active, setActive] = useState<(typeof SIDEBAR)[number]["key"]>("dash");
  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <PageHeader eyebrow="Console" title="Frosh Admin" description="Manage the catalog, publish weekly charts, override rankings and inspect audit logs." right={
        <div className="flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs">
          <span className="h-2 w-2 rounded-full bg-[oklch(0.72_0.17_155)]" /> Signed in as <span className="font-semibold">admin@froshboi.media</span>
        </div>
      } />
      <div className="grid gap-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <aside className="glass h-fit rounded-xl p-2">
          {SIDEBAR.map((s) => (
            <button key={s.key} onClick={() => setActive(s.key)} className={"flex w-full items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold transition-colors " + (active === s.key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground")}>
              <s.icon className="h-4 w-4" /> {s.label}
            </button>
          ))}
        </aside>
        <div className="space-y-6">
          {active === "dash" && <Dashboard />}
          {active === "songs" && <SongsAdmin />}
          {active === "artists" && <ArtistsAdmin />}
          {active === "albums" && <AlbumsAdmin />}
          {active === "charts" && <ChartsAdmin />}
          {active === "editorial" && <EditorialAdmin />}
          {active === "users" && <UsersAdmin />}
          {active === "settings" && <SettingsAdmin />}
        </div>
      </div>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[["Songs", SONGS.length], ["Artists", ARTISTS.length], ["Albums", ALBUMS.length], ["Articles", NEWS.length]].map(([k,v]) => (
          <div key={k} className="glass rounded-xl p-5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{k}</div>
            <div className="mt-1 font-display text-3xl font-bold">{v}</div>
          </div>
        ))}
      </div>
      <div className="glass rounded-xl p-6">
        <h3 className="mb-3 font-display text-lg font-bold">Audit Log</h3>
        <ul className="divide-y divide-border text-sm">
          {[
            ["12:04", "admin@froshboi.media", "Published Week 20 Top 100"],
            ["11:58", "editor@froshboi.media", "Locked ranking for '5IVE'"],
            ["10:32", "admin@froshboi.media", "Manual score adjustment on 'KAI' (+0.42)"],
            ["09:15", "system", "Weekly gainer/drop calculation completed"],
          ].map(([t, u, m]) => (
            <li key={m} className="grid grid-cols-[80px_240px_1fr] gap-4 py-3">
              <span className="font-mono text-xs text-muted-foreground">{t}</span>
              <span className="text-xs text-muted-foreground">{u}</span>
              <span>{m}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

function AdminTable<T extends { id: string }>({ title, rows, cols, cta }: { title: string; rows: T[]; cols: { k: string; v: (r: T) => React.ReactNode }[]; cta: string }) {
  return (
    <div className="glass rounded-xl">
      <div className="flex items-center justify-between border-b border-border p-6">
        <h3 className="font-display text-lg font-bold">{title}</h3>
        <button className="rounded-md bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground">{cta}</button>
      </div>
      <div className="max-h-[560px] overflow-auto">
        <table className="w-full text-sm">
          <thead className="sticky top-0 bg-surface">
            <tr className="border-b border-border">
              {cols.map((c) => <th key={c.k} className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{c.k}</th>)}
              <th className="w-24"/>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-border/50 hover:bg-white/5">
                {cols.map((c) => <td key={c.k} className="px-4 py-3">{c.v(r)}</td>)}
                <td className="px-4 py-3 text-right"><button className="text-xs text-muted-foreground hover:text-primary">Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function SongsAdmin() {
  return <AdminTable title="Manage Songs" cta="Add Song" rows={SONGS.slice(0, 30)} cols={[
    { k: "Rank", v: (r) => <span className="font-mono">{r.rank}</span> },
    { k: "Title", v: (r) => <Link className="font-semibold hover:text-primary" to="/songs/$id" params={{ id: r.id }}>{r.title}</Link> },
    { k: "Artist", v: (r) => r.artistName },
    { k: "Score", v: (r) => <span className="font-mono">{r.score.toFixed(2)}</span> },
    { k: "Locked", v: () => <span className="text-xs text-muted-foreground">—</span> },
  ]} />;
}
function ArtistsAdmin() {
  return <AdminTable title="Manage Artists" cta="Add Artist" rows={ARTISTS} cols={[
    { k: "Name", v: (r) => <Link className="font-semibold hover:text-primary" to="/artists/$id" params={{ id: r.id }}>{r.name}</Link> },
    { k: "Label", v: (r) => r.label },
    { k: "Country", v: (r) => r.country },
    { k: "Verified", v: (r) => r.verified ? "✓" : "—" },
  ]} />;
}
function AlbumsAdmin() {
  return <AdminTable title="Manage Albums" cta="Add Album" rows={ALBUMS} cols={[
    { k: "Title", v: (r) => <Link className="font-semibold hover:text-primary" to="/albums/$id" params={{ id: r.id }}>{r.title}</Link> },
    { k: "Artist", v: (r) => r.artistName },
    { k: "Cert.", v: (r) => r.certification },
    { k: "Rank", v: (r) => <span className="font-mono">#{r.rank}</span> },
  ]} />;
}
function ChartsAdmin() {
  return (
    <div className="glass rounded-xl p-6">
      <h3 className="mb-4 font-display text-lg font-bold">Publish Weekly Chart</h3>
      <div className="space-y-4">
        <div className="flex items-center justify-between rounded-lg bg-surface-2 p-4"><div><div className="font-semibold">Week 20, 2026 · Top 100</div><div className="text-xs text-muted-foreground">100 entries · calculated 2h ago</div></div><button className="rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Publish</button></div>
        <div className="flex items-center justify-between rounded-lg bg-surface-2 p-4"><div><div className="font-semibold">Week 20, 2026 · Albums Top 50</div><div className="text-xs text-muted-foreground">Ready to publish</div></div><button className="rounded-md border border-border px-4 py-2 text-sm font-semibold">Preview</button></div>
        <div className="flex items-center justify-between rounded-lg bg-surface-2 p-4"><div><div className="font-semibold">Archive Week 19</div><div className="text-xs text-muted-foreground">Historical positions preserved</div></div><button className="rounded-md border border-border px-4 py-2 text-sm font-semibold">Archive</button></div>
      </div>
    </div>
  );
}
function EditorialAdmin() {
  return <AdminTable title="Editorial Articles" cta="New Article" rows={NEWS.map(n => ({ ...n, id: n.id }))} cols={[
    { k: "Title", v: (r: any) => <span className="font-semibold">{r.title}</span> },
    { k: "Category", v: (r: any) => r.category },
    { k: "Date", v: (r: any) => r.date },
  ]} />;
}
function UsersAdmin() {
  const users = [
    { id: "u1", name: "Ada Obi", email: "ada@froshboi.media", role: "Admin" },
    { id: "u2", name: "Kwame Boateng", email: "kwame@froshboi.media", role: "Editor" },
    { id: "u3", name: "Naledi Ndlovu", email: "naledi@froshboi.media", role: "Analyst" },
  ];
  return <AdminTable title="Manage Users" cta="Invite" rows={users} cols={[
    { k: "Name", v: (r) => <span className="font-semibold">{r.name}</span> },
    { k: "Email", v: (r) => r.email },
    { k: "Role", v: (r) => <span className="rounded bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-primary">{r.role}</span> },
  ]} />;
}
function SettingsAdmin() {
  return (
    <div className="glass rounded-xl p-6 space-y-4">
      <h3 className="font-display text-lg font-bold">FROSH SCORE™ Weights</h3>
      {[["Streaming", 60],["Airplay",20],["Sales",10],["TikTok",5],["YouTube",5]].map(([k,v]) => (
        <div key={k as string} className="flex items-center gap-4">
          <div className="w-28 text-sm font-semibold">{k}</div>
          <input type="range" min={0} max={100} defaultValue={v as number} className="flex-1 accent-primary" />
          <div className="w-14 text-right font-mono text-sm">{v}%</div>
        </div>
      ))}
      <button className="mt-4 rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground">Save Weights</button>
    </div>
  );
}

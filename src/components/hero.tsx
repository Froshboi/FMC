import { Link } from "@tanstack/react-router";
import { Plus, Play } from "lucide-react";
import { getAppleMusicSearchUrl, HOME_CONTENT, SONGS } from "@/lib/data";
import { Movement } from "./movement";
import { fmt } from "@/lib/format";

const isAssetPath = (value?: string) => !!value && (value.startsWith("/") || value.startsWith("http"));

export function Hero() {
  const s = SONGS[0];
  const showNumbers = HOME_CONTENT.showChartNumbers;
  const heroImage = isAssetPath(s.image) ? s.image : isAssetPath(s.artwork) ? s.artwork : "/assets/hero-artist.jpg";
  return (
    <section className="glass relative overflow-hidden rounded-[24px] border border-border/50">
      <div className="grid gap-0 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[420px]">
          <img src={heroImage} alt={s.artistName} className="absolute inset-0 h-full w-full object-cover object-top" width={1280} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-r from-background/20 via-background/10 to-background" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent lg:hidden" />
        </div>
        <div className="relative flex flex-col justify-center gap-5 p-6 sm:p-8 lg:p-10">
          <div className="flex flex-wrap items-baseline gap-4">
            <div className="font-display text-6xl font-black leading-none text-gradient sm:text-7xl lg:text-8xl">
              {showNumbers ? <><span className="text-primary">#</span>1</> : <span className="text-primary">Top</span>}
            </div>
            <div>
              <Movement curr={s.rank} prev={s.prevRank} />
              <div className="mt-1 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{showNumbers ? "On the chart" : "Trending now"}</div>
            </div>
          </div>
          <div>
            <div className="font-display text-3xl font-black tracking-tight sm:text-4xl lg:text-5xl">{s.title}</div>
            <Link to="/artists/$id" params={{ id: s.artistId }} className="mt-1 block font-display text-lg font-bold uppercase tracking-wider text-primary sm:text-xl">{s.artistName}</Link>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={getAppleMusicSearchUrl(s.title, s.artistName)}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-glow transition hover:bg-primary-glow"
            >
              <Play className="h-4 w-4 fill-current" /> Play Song
            </a>
            <button className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-foreground hover:bg-muted">
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <div className="mt-2 grid gap-2 border-t border-border pt-5 sm:grid-cols-2 lg:grid-cols-4">
            <Stat label="Chart Score" value={s.score.toFixed(2)} accent />
            <Stat label="Weeks on Chart" value={s.weeks} />
            <Stat label="Peak" value={`#${s.peak}`} />
            <Stat label="Previous" value={showNumbers ? `#${s.prevRank}` : "—"} />
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
            <span>{fmt(s.streams)} streams this week</span>·<span>ISRC {s.isrc}</span>·<span>{s.label}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ label, value, accent }: { label: string; value: React.ReactNode; accent?: boolean }) {
  return (
    <div>
      <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{label}</div>
      <div className={"mt-1 font-display text-2xl font-bold tabular-nums " + (accent ? "text-primary" : "")}>{value}</div>
    </div>
  );
}

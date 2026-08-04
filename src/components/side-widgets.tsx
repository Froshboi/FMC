import { Link } from "@tanstack/react-router";
import { ArrowRight, Radio, Sparkles } from "lucide-react";
import { COUNTRIES, HOME_CONTENT, NEWS } from "@/lib/data";

export function PageHeader({ eyebrow, title, description, right }: {
  eyebrow?: string; title: string; description?: string; right?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-primary">{eyebrow}</div>}
        <h1 className="font-display text-4xl font-black tracking-tight md:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{description}</p>}
      </div>
      {right}
    </div>
  );
}

export function LiveMusicTicker() {
  const items = HOME_CONTENT.livePulseItems;
  return (
    <section className="glass overflow-hidden rounded-[20px] border border-border/50 p-3 sm:p-4">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-[10px] font-bold uppercase tracking-[0.28em] text-primary">{HOME_CONTENT.livePulseTitle}</div>
          <h3 className="mt-1 font-display text-lg font-semibold sm:text-xl">{HOME_CONTENT.livePulseSubtitle}</h3>
        </div>
        <Link to="/news" className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-glow">
          See all <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {items.map((item) => (
          <article key={item.title} className="min-w-[220px] rounded-[16px] border border-border/60 bg-background/70 p-3 shadow-sm sm:min-w-[240px]">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.24em] text-primary">
              <Radio className="h-3.5 w-3.5" /> {item.tag}
            </div>
            <div className="mt-3 font-display text-base font-semibold">{item.title}</div>
            <p className="mt-2 text-sm text-muted-foreground">{item.detail}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SideWidgets() {
  return (
    <div className="space-y-4 rounded-[24px] border border-border/50 bg-card/70 p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold">Quick Picks</h3>
        <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-primary">Live</span>
      </div>
      <div className="space-y-3 text-sm text-muted-foreground">
        <div className="rounded-2xl border border-border/70 bg-background/70 p-3">Top streamed this week</div>
        <div className="rounded-2xl border border-border/70 bg-background/70 p-3">New releases to watch</div>
        <div className="rounded-2xl border border-border/70 bg-background/70 p-3">Artist spotlight</div>
      </div>
    </div>
  );
}

export function TrendingWidget() {
  return (
    <div className="rounded-[24px] border border-border/50 bg-card/70 p-4 shadow-sm sm:p-5">
      <h3 className="mb-3 font-display text-lg font-semibold">Trending Now</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        <li>• Viral songs climbing fast</li>
        <li>• Rising playlists across the continent</li>
        <li>• Weekend chart momentum</li>
      </ul>
    </div>
  );
}

export function LatestNewsWidget() {
  return (
    <div className="rounded-[24px] border border-border/50 bg-card/70 p-4 shadow-sm sm:p-5">
      <div className="flex items-center justify-between gap-3">
        <h3 className="font-display text-lg font-semibold">{HOME_CONTENT.newsTitle}</h3>
        <Link to="/news" className="text-sm font-semibold text-primary hover:text-primary-glow">View all</Link>
      </div>
      <p className="mt-2 text-sm text-muted-foreground">{HOME_CONTENT.newsSubtitle}</p>
      <div className="mt-4 space-y-3">
        {NEWS.slice(0, 3).map((item) => (
          <div key={item.id} className="rounded-2xl border border-border/60 bg-background/70 p-3">
            <div className="text-[10px] font-bold uppercase tracking-[0.24em] text-primary">{item.category}</div>
            <div className="mt-1 font-semibold text-foreground">{item.title}</div>
            <div className="mt-1 text-xs text-muted-foreground">{item.date}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArtistSpotlightWidget() {
  return (
    <div className="rounded-[24px] border border-border/50 bg-card/70 p-4 shadow-sm sm:p-5">
      <div className="flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-primary" />
        <h3 className="font-display text-lg font-semibold">Artist Spotlight</h3>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">A featured artist with the momentum to watch this week.</p>
    </div>
  );
}

export function CountryCharts() {
  return (
    <div className="rounded-[24px] border border-border/50 bg-card/70 p-4 shadow-sm sm:p-5">
      <h3 className="mb-3 font-display text-lg font-semibold">Country Charts</h3>
      <div className="space-y-2">
        {COUNTRIES.slice(0, 5).map((country) => (
          <div key={country.code} className="flex items-center justify-between rounded-2xl border border-border/60 bg-background/70 px-3 py-2 text-sm">
            <span className="font-medium">{country.flag} {country.name}</span>
            <span className="text-xs uppercase tracking-[0.24em] text-muted-foreground">{country.code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

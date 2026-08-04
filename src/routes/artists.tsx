import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ARTISTS } from "@/lib/data";
import { fmt } from "@/lib/format";
import { BadgeCheck } from "lucide-react";

export const Route = createFileRoute("/artists")({
  head: () => ({ meta: [{ title: "Artists — FROSHBOI MEDIA" }] }),
  component: () => (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <PageHeader eyebrow="Directory" title="Artists" description="Every artist on the Frosh charts, ranked by monthly listeners." />
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {[...ARTISTS].sort((a, b) => b.monthlyListeners - a.monthlyListeners).map((a) => (
          <Link key={a.id} to="/artists/$id" params={{ id: a.id }} className="glass group overflow-hidden rounded-xl transition-transform hover:-translate-y-1">
            <div className="relative aspect-square bg-gradient-to-br from-primary/40 via-neutral-800 to-neutral-950">
              <div className="absolute inset-0 flex items-center justify-center font-display text-5xl font-black text-white/95">
                {a.name.split(" ").map(w => w[0]).slice(0, 2).join("")}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/95 to-transparent p-4">
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-lg font-bold">{a.name}</span>
                  {a.verified && <BadgeCheck className="h-4 w-4 fill-primary text-primary-foreground" />}
                </div>
                <div className="text-xs text-muted-foreground">{a.genres.join(" · ")}</div>
              </div>
            </div>
            <div className="grid grid-cols-2 divide-x divide-border">
              <div className="p-3">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Monthly</div>
                <div className="font-mono text-sm font-semibold">{fmt(a.monthlyListeners)}</div>
              </div>
              <div className="p-3">
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Followers</div>
                <div className="font-mono text-sm font-semibold">{fmt(a.followers)}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  ),
});

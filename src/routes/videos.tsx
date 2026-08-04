import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { SONGS } from "@/lib/data";
import { Artwork } from "@/components/artwork";
import { Play } from "lucide-react";
import { fmt } from "@/lib/format";

export const Route = createFileRoute("/videos")({
  head: () => ({ meta: [{ title: "Video Chart — FROSHBOI MEDIA" }] }),
  component: () => (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <PageHeader eyebrow="Chart" title="Top Music Videos" description="Ranked by weighted views on YouTube, Instagram and TikTok." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {SONGS.slice(0, 24).map((s, i) => (
          <div key={s.id} className="glass group overflow-hidden rounded-xl">
            <div className="relative aspect-video">
              <Artwork gradient={s.artwork} title={s.title} size="xl" className="h-full w-full rounded-none" />
              <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary shadow-glow"><Play className="h-6 w-6 fill-current text-primary-foreground" /></div>
              </div>
              <div className="absolute left-2 top-2 rounded bg-black/70 px-2 py-1 font-mono text-xs font-bold">#{i + 1}</div>
              <div className="absolute right-2 top-2 rounded bg-black/70 px-2 py-1 text-xs">{Math.floor(3 + Math.random() * 4)}:{String(10 + Math.floor(Math.random() * 50)).padStart(2, "0")}</div>
            </div>
            <div className="p-4">
              <div className="truncate font-semibold group-hover:text-primary">{s.title}</div>
              <div className="text-xs text-muted-foreground">{s.artistName}</div>
              <div className="mt-2 text-xs text-muted-foreground">{fmt(s.streams * 3)} views · this week</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  ),
});

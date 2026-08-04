import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { ChartTable } from "@/components/chart-table";
import { SONGS } from "@/lib/data";

const MAP: Record<string, { title: string; genre?: string; eyebrow: string; description: string }> = {
  afrobeats:  { title: "Afrobeats 50", eyebrow: "Genre Chart", description: "The definitive Afrobeats ranking.", genre: "Afrobeats" },
  "hip-hop":  { title: "Hip Hop 50", eyebrow: "Genre Chart", description: "Rap, drill and Nigerian hip hop.", genre: "Hip Hop" },
  amapiano:   { title: "Amapiano 50", eyebrow: "Genre Chart", description: "The log-drum sound taking over the world.", genre: "Amapiano" },
  streaming:  { title: "Streaming Chart", eyebrow: "Consumption", description: "Ranked purely by streams across Spotify, Apple Music, Audiomack, Boomplay and YouTube." },
  airplay:    { title: "Airplay Chart", eyebrow: "Radio", description: "Spins across 240+ terrestrial radio stations across Africa." },
  tiktok:     { title: "TikTok Chart", eyebrow: "Virality", description: "Fastest-rising sounds and videos on TikTok this week." },
};

export const Route = createFileRoute("/charts/$slug")({
  loader: ({ params }) => {
    const meta = MAP[params.slug];
    if (!meta) throw notFound();
    return { meta, slug: params.slug };
  },
  notFoundComponent: () => <div className="p-10 text-center">Chart not found.</div>,
  errorComponent: ({ error }) => <div className="p-10 text-center">{error.message}</div>,
  component: () => {
    const { meta } = Route.useLoaderData();
    const filtered = meta.genre ? SONGS.filter(s => s.genre === meta.genre) : SONGS;
    const reranked = filtered.map((s, i) => ({ ...s, rank: i + 1 }));
    return (
      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <PageHeader eyebrow={meta.eyebrow} title={meta.title} description={meta.description} />
        <ChartTable songs={reranked} />
      </div>
    );
  },
});

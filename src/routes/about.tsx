import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — FROSHBOI MEDIA" }] }),
  component: () => (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <PageHeader eyebrow="About" title="Africa's Music Intelligence Platform" />
      <div className="prose prose-invert max-w-none space-y-6 text-foreground/90">
        <p className="text-lg">
          FROSHBOI MEDIA is the definitive source for African music charts, analytics and editorial. From the Frosh Top 100 to regional charts across Nigeria, Ghana, Kenya, South Africa, Tanzania and Uganda, we combine streaming, airplay, sales, TikTok and YouTube data into a single proprietary ranking: the <strong className="text-primary">FROSH SCORE™</strong>.
        </p>
        <h2 className="font-display text-2xl font-bold">Methodology</h2>
        <p>The Frosh Top 100 is refreshed every Sunday at 00:00 WAT. Rankings are computed from a weighted composite of streaming (60%), airplay (20%), sales (10%), TikTok usage (5%) and YouTube views (5%), with editorial weighting for virality, momentum and recency.</p>
        <h2 className="font-display text-2xl font-bold">Data Partners</h2>
        <p>Spotify, Apple Music, YouTube Music, Audiomack, Boomplay, LastFM and MusicBrainz. Airplay data from 240+ radio stations across the continent.</p>
      </div>
    </div>
  ),
});

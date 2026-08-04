import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/hero";
import { ChartTable } from "@/components/chart-table";
import {
  SideWidgets,
  TrendingWidget,
  LatestNewsWidget,
  ArtistSpotlightWidget,
  CountryCharts,
  LiveMusicTicker,
} from "@/components/side-widgets";
import { HOME_CONTENT } from "@/lib/data";
import { BarChart3 } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Frosh Top 100 — FROSHBOI MEDIA" },
      { name: "description", content: "This week's Frosh Top 100 — Africa's definitive music chart." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div className="mx-auto max-w-[1600px] px-3 py-3 sm:px-5 sm:py-5 lg:px-8 lg:py-8">
      <div className="grid gap-3 xl:grid-cols-[minmax(0,1fr)_320px] xl:gap-4">
        <div className="space-y-3 sm:space-y-4">
          <Hero />
          <LiveMusicTicker />
          <section>
            <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5 text-primary" />
                <h2 className="font-display text-2xl font-bold">{HOME_CONTENT.chartTitle}</h2>
              </div>
              <div className="text-xs text-muted-foreground">{HOME_CONTENT.chartSubtitle}</div>
            </div>
            <ChartTable limit={10} />
          </section>
        </div>
        <aside className="space-y-3 sm:space-y-4">
          <SideWidgets />
          <TrendingWidget />
          <LatestNewsWidget />
          <ArtistSpotlightWidget />
          <CountryCharts />
        </aside>
      </div>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { ChartTable } from "@/components/chart-table";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/top-100")({
  head: () => ({ meta: [{ title: "Frosh Top 100 — Full Chart" }] }),
  component: () => (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <PageHeader
        eyebrow="Frosh Top 100"
        title="The Official Nigeria Top 100"
        description="Africa's definitive weekly ranking. Powered by the FROSH SCORE™ — a proprietary blend of streaming, airplay, sales, TikTok, YouTube and editorial weighting."
      />
      <ChartTable />
    </div>
  ),
});

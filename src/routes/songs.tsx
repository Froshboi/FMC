import { createFileRoute } from "@tanstack/react-router";
import { ChartTable } from "@/components/chart-table";
import { PageHeader } from "@/components/page-header";

export const Route = createFileRoute("/songs")({
  head: () => ({ meta: [{ title: "All Songs — FROSHBOI MEDIA" }] }),
  component: () => (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <PageHeader eyebrow="Catalog" title="All Songs" description="Every song currently active on the Frosh charts." />
      <ChartTable />
    </div>
  ),
});

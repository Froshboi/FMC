import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { AWARDS_2026 } from "@/lib/data";
import { Trophy } from "lucide-react";

export const Route = createFileRoute("/awards")({
  head: () => ({ meta: [{ title: "Frosh Music Awards 2026" }] }),
  component: () => (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <PageHeader eyebrow="Frosh Awards 2026" title="Africa's Music Awards" description="Voting is open across all major categories. Winners announced live from Eko Convention Center on December 14." right={<button className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-glow">Vote Now</button>} />
      <div className="grid gap-6 md:grid-cols-2">
        {AWARDS_2026.map((c) => (
          <section key={c.category} className="glass rounded-xl p-6">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary"><Trophy className="h-5 w-5" /></div>
              <h2 className="font-display text-xl font-bold">{c.category}</h2>
            </div>
            <ol className="space-y-2">
              {c.nominees.map((n, i) => (
                <li key={n} className="flex items-center gap-3 rounded-lg bg-surface-2 px-4 py-3">
                  <span className="font-display text-sm font-bold text-muted-foreground">{String(i + 1).padStart(2, "0")}</span>
                  <span className="flex-1 font-semibold">{n}</span>
                  <button className="rounded-full border border-border px-3 py-1 text-xs font-semibold hover:border-primary hover:text-primary">Vote</button>
                </li>
              ))}
            </ol>
          </section>
        ))}
      </div>
    </div>
  ),
});

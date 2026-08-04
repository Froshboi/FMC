import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { NEWS } from "@/lib/data";
import { Artwork } from "@/components/artwork";

export const Route = createFileRoute("/news")({
  head: () => ({ meta: [{ title: "Newsroom — FROSHBOI MEDIA" }] }),
  component: () => {
    const [featured, ...rest] = NEWS;
    return (
      <div className="mx-auto max-w-[1600px] px-6 py-8">
        <PageHeader eyebrow="Newsroom" title="Editorial & Analysis" description="Breaking news, reviews, and long-form storytelling from the Frosh newsroom." />
        <article className="glass overflow-hidden rounded-2xl">
          <div className="grid md:grid-cols-2">
            <Artwork gradient="from-primary via-rose-900 to-neutral-950" title={featured.title} size="xl" className="aspect-[4/3] rounded-none md:aspect-auto" />
            <div className="flex flex-col justify-center gap-4 p-8 md:p-12">
              <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{featured.category}</div>
              <h2 className="font-display text-3xl font-black md:text-4xl">{featured.title}</h2>
              <p className="text-sm text-muted-foreground">{featured.excerpt}</p>
              <div className="text-xs text-muted-foreground">{featured.date} · 6 min read</div>
              <button className="mt-2 w-fit rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground">Read Story</button>
            </div>
          </div>
        </article>
        <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((n) => (
            <article key={n.id} className="glass overflow-hidden rounded-xl">
              <Artwork gradient="from-fuchsia-600 via-purple-800 to-neutral-900" title={n.title} size="xl" className="aspect-[16/10] rounded-none" />
              <div className="p-5">
                <div className="text-[11px] font-bold uppercase tracking-widest text-primary">{n.category}</div>
                <h3 className="mt-2 font-display text-lg font-bold leading-snug">{n.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{n.excerpt}</p>
                <div className="mt-3 text-xs text-muted-foreground">{n.date}</div>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  },
});

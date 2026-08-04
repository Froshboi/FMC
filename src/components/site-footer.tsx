import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="mt-16 border-t border-border">
      <div className="mx-auto grid max-w-[1600px] gap-6 px-4 py-8 sm:gap-8 sm:px-6 sm:py-12 md:grid-cols-5 md:gap-8 md:py-12">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="font-display text-xl font-black">FROSHBOI</div>
            <div className="rounded bg-primary px-1.5 py-0.5 font-display text-[10px] font-bold uppercase tracking-widest text-primary-foreground">Media</div>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Africa's official music intelligence platform. Charts, analytics and editorial powered by the FROSH SCORE™.
          </p>
        </div>
        {[
          { title: "Charts", links: [["Top 100", "/top-100"], ["Albums", "/albums"], ["Artists", "/artists"], ["Videos", "/videos"]] },
          { title: "Insights", links: [["Analytics", "/analytics"], ["Trending", "/trending"], ["News", "/news"], ["Awards", "/awards"]] },
          { title: "Company", links: [["About", "/about"], ["Admin", "/admin"], ["Sign In", "/login"], ["Search", "/search"]] },
        ].map((col) => (
          <div key={col.title} className="flex flex-col gap-4 md:gap-3">
            <div className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{col.title}</div>
            <ul className="flex flex-col gap-3 md:gap-2">
              {col.links.map(([label, to]) => (
                <li key={to}><Link to={to} className="text-base text-foreground/80 transition-colors hover:text-primary md:text-sm">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-4 py-6 text-xs text-muted-foreground sm:px-6 sm:py-8 md:flex-row md:gap-2">
          <div>© 2026 FROSHBOI MEDIA. All rights reserved.</div>
          <div>FROSH SCORE™ methodology · v4.2</div>
        </div>
      </div>
    </footer>
  );
}

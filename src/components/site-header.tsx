import { Link, useRouterState } from "@tanstack/react-router";
import { Bell, Search, User } from "lucide-react";
import { useLayoutEffect, useRef, useState } from "react";
import { COUNTRIES } from "@/lib/data";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/top-100", label: "Charts" },
  { to: "/artists", label: "Artists" },
  { to: "/songs", label: "Songs" },
  { to: "/albums", label: "Albums" },
  { to: "/videos", label: "Videos" },
  { to: "/news", label: "News" },
  { to: "/awards", label: "Awards" },
  { to: "/analytics", label: "Analytics" },
];

const SUB_NAV: { to: string; label: string; params?: Record<string, string> }[] = [
  { to: "/top-100", label: "Top 100" },
  { to: "/albums", label: "Albums" },
  { to: "/artists", label: "Artists" },
  { to: "/charts/$slug", label: "Afrobeats", params: { slug: "afrobeats" } },
  { to: "/charts/$slug", label: "Hip Hop", params: { slug: "hip-hop" } },
  { to: "/charts/$slug", label: "Amapiano", params: { slug: "amapiano" } },
  { to: "/charts/$slug", label: "Streaming", params: { slug: "streaming" } },
  { to: "/charts/$slug", label: "Airplay", params: { slug: "airplay" } },
  { to: "/charts/$slug", label: "TikTok", params: { slug: "tiktok" } },
  { to: "/videos", label: "Videos" },
];

export function SiteHeader() {
  const [country, setCountry] = useState(COUNTRIES[0]);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const headerRef = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const updateHeaderHeight = () => {
      const height = headerRef.current?.offsetHeight;
      if (typeof height === "number") {
        document.documentElement.style.setProperty("--site-header-height", `${height}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener("resize", updateHeaderHeight);
    return () => window.removeEventListener("resize", updateHeaderHeight);
  }, []);

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 border-b border-border glass-strong">
      <div className="mx-auto flex flex-wrap items-center gap-3 px-4 py-2 sm:px-5 sm:py-3 max-w-[1600px]">
        <Link to="/" className="flex items-center gap-2">
          <div className="font-display text-xl font-black tracking-tight">
            FROSHBOI
          </div>
          <div className="rounded bg-primary px-1.5 py-0.5 font-display text-[10px] font-bold uppercase tracking-widest text-primary-foreground">
            Media
          </div>
        </Link>
        <nav className="hidden flex-1 items-center justify-center gap-1 md:flex">
          {NAV.map((n) => {
            const active = pathname === n.to || (n.to !== "/" && pathname.startsWith(n.to));
            return (
              <Link
                key={n.to}
                to={n.to}
                className={cn(
                  "rounded-md px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {n.label}
              </Link>
            );
          })}
        </nav>
        <div className="ml-auto flex items-center gap-2">
          <Link to="/search" className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <Search className="h-4 w-4" />
          </Link>
          <button className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground">
            <Bell className="h-4 w-4" />
          </button>
          <Link to="/login" className="hidden rounded-md border border-border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-muted sm:inline-flex">
            Sign In
          </Link>
          <Link to="/login" className="rounded-md bg-primary px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary-foreground shadow-glow hover:bg-primary-glow">
            Register
          </Link>
          <Link to="/admin" className="rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground" aria-label="Admin">
            <User className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto flex h-11 max-w-[1600px] items-center gap-2 overflow-x-auto px-4 py-2 sm:px-5">
          <DropdownMenu>
            <DropdownMenuTrigger className="mr-3 flex items-center gap-2 rounded-md px-2 py-1 text-xs font-semibold uppercase tracking-wider text-foreground hover:bg-muted">
              <span>{country.flag}</span>
              <span>{country.name}</span>
              <span className="text-muted-foreground">▾</span>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="glass-strong">
              {COUNTRIES.map((c) => (
                <DropdownMenuItem key={c.code} onClick={() => setCountry(c)}>
                  <span className="mr-2">{c.flag}</span>{c.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
          {SUB_NAV.map((n, idx) => {
            const active = pathname === n.to || (n.params && pathname === `/charts/${n.params.slug}`);
            return (
              <Link
                key={idx}
                to={n.to as any}
                params={n.params as any}
                className={cn(
                  "relative shrink-0 px-3 py-1.5 text-[11px] font-bold uppercase tracking-wider transition-colors",
                  active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {n.label}
                {active && <span className="absolute inset-x-2 -bottom-[13px] h-[2px] bg-primary" />}
              </Link>
            );
          })}
          <div className="ml-auto hidden shrink-0 items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground md:flex">
            <span>📅</span> Week 20, 2026
          </div>
        </div>
      </div>
    </header>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign In — FROSHBOI MEDIA" }] }),
  component: () => (
    <div className="mx-auto flex min-h-[calc(100dvh-140px)] max-w-md items-center px-6">
      <div className="glass w-full rounded-2xl p-8">
        <div className="mb-6 text-center">
          <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-primary">Frosh ID</div>
          <h1 className="font-display text-3xl font-black">Sign in</h1>
          <p className="mt-2 text-sm text-muted-foreground">Vote in awards, save charts and personalize your feed.</p>
        </div>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Email</span>
            <input type="email" placeholder="you@example.com" className="w-full rounded-md border border-border bg-surface-2 px-4 py-3 outline-none focus:border-primary" />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">Password</span>
            <input type="password" placeholder="••••••••" className="w-full rounded-md border border-border bg-surface-2 px-4 py-3 outline-none focus:border-primary" />
          </label>
          <button className="w-full rounded-md bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-glow hover:bg-primary-glow">Sign In</button>
        </form>
        <div className="my-6 flex items-center gap-3 text-xs text-muted-foreground"><div className="h-px flex-1 bg-border" />or continue with<div className="h-px flex-1 bg-border" /></div>
        <div className="grid grid-cols-3 gap-2">
          {["Google", "Apple", "Spotify"].map((p) => (
            <button key={p} className="rounded-md border border-border py-2 text-xs font-semibold hover:bg-muted">{p}</button>
          ))}
        </div>
        <div className="mt-6 text-center text-xs text-muted-foreground">
          New here? <Link to="/login" className="font-semibold text-primary">Create an account</Link>
        </div>
      </div>
    </div>
  ),
});

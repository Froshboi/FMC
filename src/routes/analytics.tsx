import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/page-header";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";
import { fmt } from "@/lib/format";
import { CHART_METRICS } from "@/lib/data";

export const Route = createFileRoute("/analytics")({
  head: () => ({ meta: [{ title: "Analytics Dashboard — FROSHBOI MEDIA" }] }),
  component: Analytics,
});

function Analytics() {
  const streams = Array.from({ length: 30 }, (_, i) => ({ d: `${i + 1}`, s: Math.round(900_000_000 + Math.sin(i / 3) * 120_000_000 + i * 12_000_000) }));
  const audience = Array.from({ length: 12 }, (_, i) => ({ m: ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"][i], listeners: 32_000_000 + i * 1_600_000, subs: 4_000_000 + i * 340_000 }));
  const cities = [
    { name: "Lagos", value: 42.1 }, { name: "Abuja", value: 12.6 }, { name: "Accra", value: 9.4 }, { name: "Nairobi", value: 7.1 }, { name: "Johannesburg", value: 6.8 }, { name: "Kampala", value: 4.9 },
  ];
  const age = [
    { name: "13-17", value: 8 }, { name: "18-24", value: 34 }, { name: "25-34", value: 32 }, { name: "35-44", value: 16 }, { name: "45-54", value: 7 }, { name: "55+", value: 3 },
  ];
  const gender = [
    { name: "Female", value: 52, color: "var(--color-primary)" }, { name: "Male", value: 46, color: "oklch(0.65 0.18 265)" }, { name: "Other", value: 2, color: "oklch(0.72 0.17 155)" },
  ];
  const revenue = Array.from({ length: 6 }, (_, i) => ({ m: ["Dec","Jan","Feb","Mar","Apr","May"][i], streaming: 1.2 + i * 0.14, sync: 0.3 + i * 0.05, sales: 0.15 + i * 0.02 }));

  return (
    <div className="mx-auto max-w-[1600px] px-6 py-8">
      <PageHeader eyebrow="Frosh Analytics" title="Industry Dashboard" description="A Bloomberg-Terminal-style view of the African music market. Refreshed every hour." />

      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        {[
          ["Total Streams (7d)", "12.8B", "+8.4%"],
          ["Active Artists", "18,420", "+2.1%"],
          ["Weekly Chart Entries", "312", "+14"],
          ["Revenue Est. (Mo)", "$48.6M", "+11.2%"],
        ].map(([k, v, d]) => (
          <div key={k} className="glass rounded-xl p-5">
            <div className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{k}</div>
            <div className="mt-2 font-display text-3xl font-bold">{v}</div>
            <div className="mt-1 text-xs font-semibold text-[oklch(0.72_0.17_155)]">{d} WoW</div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Panel title="Streaming Growth · Last 30 Days">
          <div className="h-72">
            <ResponsiveContainer>
              <AreaChart data={streams}>
                <defs><linearGradient id="sg" x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="var(--color-primary)" stopOpacity={0.55} /><stop offset="100%" stopColor="var(--color-primary)" stopOpacity={0} /></linearGradient></defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="d" stroke="oklch(1 0 0 / 0.4)" fontSize={11} />
                <YAxis stroke="oklch(1 0 0 / 0.4)" fontSize={11} tickFormatter={fmt} />
                <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }} formatter={(v: number) => fmt(v)} />
                <Area type="monotone" dataKey="s" stroke="var(--color-primary)" strokeWidth={2} fill="url(#sg)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Chart Score Composition">
          <div className="h-72 grid grid-cols-[1fr_auto] items-center gap-4">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={CHART_METRICS} dataKey="value" innerRadius={50} outerRadius={90} paddingAngle={2} stroke="none">
                  {CHART_METRICS.map((m,i)=><Cell key={i} fill={m.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
            <ul className="space-y-2 pr-4">
              {CHART_METRICS.map((m)=>(<li key={m.name} className="flex items-center gap-2 text-xs"><span className="h-3 w-3 rounded-sm" style={{background:m.color}} /><span className="uppercase tracking-wider text-muted-foreground">{m.name}</span><span className="ml-auto font-mono font-semibold">{m.value}%</span></li>))}
            </ul>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Panel title="Audience & Followers">
          <div className="h-56">
            <ResponsiveContainer>
              <LineChart data={audience}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="m" stroke="oklch(1 0 0 / 0.4)" fontSize={11} />
                <YAxis stroke="oklch(1 0 0 / 0.4)" fontSize={11} tickFormatter={fmt} />
                <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }} formatter={(v: number) => fmt(v)} />
                <Line type="monotone" dataKey="listeners" stroke="var(--color-primary)" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="subs" stroke="oklch(0.72 0.17 155)" strokeWidth={2} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Top Cities">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={cities} layout="vertical" margin={{ left: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis type="number" stroke="oklch(1 0 0 / 0.4)" fontSize={11} />
                <YAxis type="category" dataKey="name" stroke="oklch(1 0 0 / 0.4)" fontSize={11} width={90} />
                <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
        <Panel title="Age Demographics">
          <div className="h-56">
            <ResponsiveContainer>
              <BarChart data={age}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="name" stroke="oklch(1 0 0 / 0.4)" fontSize={11} />
                <YAxis stroke="oklch(1 0 0 / 0.4)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }} />
                <Bar dataKey="value" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)]">
        <Panel title="Gender">
          <div className="h-56">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={gender} dataKey="value" innerRadius={40} outerRadius={80} paddingAngle={2} stroke="none">
                  {gender.map((g,i)=><Cell key={i} fill={g.color} />)}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          <ul className="mt-3 space-y-1 text-sm">
            {gender.map((g)=>(<li key={g.name} className="flex items-center justify-between"><span className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm" style={{background:g.color}}/>{g.name}</span><span className="font-mono">{g.value}%</span></li>))}
          </ul>
        </Panel>
        <Panel title="Revenue Estimates ($M)">
          <div className="h-64">
            <ResponsiveContainer>
              <BarChart data={revenue}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(1 0 0 / 0.06)" />
                <XAxis dataKey="m" stroke="oklch(1 0 0 / 0.4)" fontSize={11} />
                <YAxis stroke="oklch(1 0 0 / 0.4)" fontSize={11} />
                <Tooltip contentStyle={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }} />
                <Bar dataKey="streaming" stackId="a" fill="var(--color-primary)" />
                <Bar dataKey="sync" stackId="a" fill="oklch(0.65 0.18 265)" />
                <Bar dataKey="sales" stackId="a" fill="oklch(0.72 0.17 155)" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return <section className="glass rounded-xl p-6"><h2 className="mb-4 font-display text-xs font-bold uppercase tracking-widest text-muted-foreground">{title}</h2>{children}</section>;
}

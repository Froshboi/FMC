export function PageHeader({ eyebrow, title, description, right }: {
  eyebrow?: string; title: string; description?: string; right?: React.ReactNode;
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow && <div className="mb-2 text-[11px] font-bold uppercase tracking-widest text-primary">{eyebrow}</div>}
        <h1 className="font-display text-4xl font-black tracking-tight md:text-5xl">{title}</h1>
        {description && <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{description}</p>}
      </div>
      {right}
    </div>
  );
}

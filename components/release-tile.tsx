type ReleaseTileProps = {
  title: string;
  date: string;
  coverSvg: string;
  description: string;
};

export function ReleaseTile({ title, date, coverSvg, description }: ReleaseTileProps) {
  return (
    <div className="grid grid-cols-1 gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-[0_6px_24px_rgba(0,0,0,0.04)] md:grid-cols-[160px,1fr]">
      <div
        className="overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50"
        dangerouslySetInnerHTML={{ __html: coverSvg }}
      />
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <p className="font-display text-xl">{title}</p>
          <p className="text-xs font-mono uppercase tracking-[0.16em] text-neutral-500">{date}</p>
        </div>
        <p className="text-sm text-neutral-700">{description}</p>
      </div>
    </div>
  );
}

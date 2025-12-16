import Link from "next/link";
import { SectionLabel } from "./section-label";

type UniverseCardProps = {
  slug: string;
  name: string;
  manifesto: string;
  paletteNotes: string;
  accentColor: string;
};

export function UniverseCard({ slug, name, manifesto, paletteNotes, accentColor }: UniverseCardProps) {
  return (
    <Link
      href={`/universes/${slug}`}
      className="group flex flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <SectionLabel text="Universe" />
        <div className="h-8 w-8 rounded-full" style={{ background: accentColor }} />
      </div>
      <div className="space-y-2">
        <h3 className="font-display text-2xl">{name}</h3>
        <p className="text-sm leading-relaxed text-neutral-700 line-clamp-4">{manifesto}</p>
      </div>
      <div className="flex items-center justify-between text-xs text-neutral-600">
        <p className="font-mono uppercase tracking-[0.14em]">{paletteNotes}</p>
        <span className="text-neutral-400 group-hover:text-neutral-700">→</span>
      </div>
    </Link>
  );
}

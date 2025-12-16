import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

type ProductCardProps = {
  slug: string;
  title: string;
  description: string;
  priceCents: number;
  imageSvg: string;
  universe: string;
};

export function ProductCard({ slug, title, description, priceCents, imageSvg, universe }: ProductCardProps) {
  return (
    <Link
      href={`/drops/${slug}`}
      className="group flex h-full flex-col gap-4 rounded-3xl border border-neutral-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="overflow-hidden rounded-xl border border-neutral-100 bg-neutral-50">
        <div dangerouslySetInnerHTML={{ __html: imageSvg }} />
      </div>
      <div className="flex items-center justify-between text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">
        <span>{universe}</span>
        <span>{formatCurrency(priceCents)}</span>
      </div>
      <div className="space-y-2">
        <h3 className="font-display text-xl">{title}</h3>
        <p className="text-sm text-neutral-700 line-clamp-3">{description}</p>
      </div>
    </Link>
  );
}

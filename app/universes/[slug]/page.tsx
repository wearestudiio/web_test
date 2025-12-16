import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import { ReleaseTile } from "@/components/release-tile";
import { ProductCard } from "@/components/product-card";
import { SectionLabel } from "@/components/section-label";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const rules: Record<string, { do: string[]; dont: string[] }> = {
  worm: {
    do: ["Keep the low-end tactile", "Use neon notes sparingly", "Honor the warehouse hymn energy"],
    dont: ["Introduce beige moods", "Over-quantize grooves", "Flatten dynamics"],
  },
  tarns: {
    do: ["Leave negative space", "Cut every element with discipline", "Let silence act as percussion"],
    dont: ["Over-saturate palettes", "Crowd the stereo field", "Abandon precision"],
  },
};

export const dynamic = "force-dynamic";

export default async function UniversePage({ params }: { params: { slug: string } }) {
  const universe = await prisma.universe.findUnique({
    where: { slug: params.slug },
    include: { releases: { orderBy: { date: "desc" } }, products: true },
  });

  if (!universe) return notFound();
  const manifestoLines = universe.manifesto.split(". ").filter(Boolean);
  const ruleSet = rules[universe.slug] || rules.worm;

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-10">
      <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr]">
        <div className="space-y-4">
          <SectionLabel text="Universe" />
          <h1 className="font-display text-5xl">{universe.name}</h1>
          <p className="font-mono uppercase tracking-[0.16em] text-neutral-600">{universe.paletteNotes}</p>
          <div className="space-y-2 text-neutral-700">
            {manifestoLines.map((line, i) => (
              <p key={i}>{line.trim()}</p>
            ))}
          </div>
          <div className="flex gap-3">
            <Link href={`/app/generate?universe=${universe.slug}`}>
              <Button>Generate inside this universe</Button>
            </Link>
            <Link href="/drops">
              <Button variant="outline">View drops</Button>
            </Link>
          </div>
        </div>
        <div className="rounded-3xl border border-neutral-200 bg-neutral-50 p-6">
          <SectionLabel text="Rules" />
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Do</p>
              <ul className="mt-2 space-y-2 text-sm text-neutral-800">
                {ruleSet.do.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Don’t</p>
              <ul className="mt-2 space-y-2 text-sm text-neutral-800">
                {ruleSet.dont.map((item) => (
                  <li key={item}>• {item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="mt-6 text-sm text-neutral-700">
            Signature signer address: <span className="font-mono text-xs">{universe.signerAddress}</span>
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <SectionLabel text="Releases" />
        <div className="space-y-4">
          {universe.releases.map((release) => (
            <ReleaseTile
              key={release.id}
              title={release.title}
              date={release.date.toISOString().slice(0, 10)}
              coverSvg={release.coverSvg}
              description={release.description}
            />
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <SectionLabel text="Drops" />
        <div className="grid gap-4 md:grid-cols-3">
          {universe.products.map((product) => (
            <ProductCard
              key={product.id}
              slug={product.slug}
              title={product.title}
              description={product.description}
              priceCents={product.priceCents}
              imageSvg={product.images[0]}
              universe={universe.name}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { ProductCard } from "@/components/product-card";
import { SectionLabel } from "@/components/section-label";

export const dynamic = "force-dynamic";

export default async function DropsPage() {
  const products = await prisma.product.findMany({ include: { universe: true } });

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 space-y-8">
      <div className="space-y-3">
        <SectionLabel text="Drops" />
        <h1 className="font-display text-4xl">Line sheets for each universe.</h1>
        <p className="text-neutral-700">
          Editorial product stories with transparent pricing. Checkout via Stripe test mode or demo checkout if keys are
          missing.
        </p>
      </div>
      <div className="grid gap-5 md:grid-cols-3">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            slug={product.slug}
            title={product.title}
            description={product.description}
            priceCents={product.priceCents}
            imageSvg={product.images[0]}
            universe={product.universe.name}
          />
        ))}
      </div>
    </div>
  );
}

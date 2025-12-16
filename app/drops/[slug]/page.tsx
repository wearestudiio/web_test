// @ts-nocheck
import { prisma } from "@/lib/prisma";
import { notFound, redirect } from "next/navigation";
import { SectionLabel } from "@/components/section-label";
import { formatCurrency } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getStripeClient, stripeEnabled } from "@/lib/stripe";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth/next";
import { revalidatePath } from "next/cache";

export const dynamic = "force-dynamic";

async function purchaseProduct(formData: FormData) {
  "use server";
  const productId = formData.get("productId") as string;
  const slug = formData.get("slug") as string;
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect(`/auth/login?callbackUrl=/drops/${slug}`);
  }

  const product = await prisma.product.findUnique({ where: { id: productId }, include: { universe: true } });
  if (!product) throw new Error("Product not found");

  const order = await prisma.order.create({
    data: {
      userId: session.user.id,
      status: stripeEnabled ? "PENDING" : "PAID",
      totalCents: product.priceCents,
      items: {
        create: {
          productId: product.id,
          priceCents: product.priceCents,
          qty: 1,
        },
      },
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const successUrl = `${baseUrl}/drops/${slug}?order=${order.id}`;
  const cancelUrl = `${baseUrl}/drops/${slug}?cancelled=1`;

  if (stripeEnabled) {
    const stripe = getStripeClient();
    const checkout = await stripe!.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "usd",
            product_data: { name: product.title, description: product.description },
            unit_amount: product.priceCents,
          },
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { orderId: order.id, productId: product.id },
    });
    await prisma.order.update({ where: { id: order.id }, data: { stripeSessionId: checkout.id } });
    redirect(checkout.url!);
  } else {
    revalidatePath(`/drops/${slug}`);
    redirect(`${successUrl}&demo=1`);
  }
}

export default async function DropDetail({ params, searchParams }: { params: { slug: string }; searchParams: any }) {
  const product = await prisma.product.findUnique({
    where: { slug: params.slug },
    include: { universe: true },
  });
  if (!product) return notFound();

  const confirmedOrder = searchParams.order;
  const isDemo = Boolean(searchParams.demo);

  return (
    <div className="mx-auto max-w-5xl px-4 py-12 space-y-8">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="space-y-2">
          <SectionLabel text={`Drop / ${product.universe.name}`} />
          <h1 className="font-display text-4xl">{product.title}</h1>
          <p className="text-neutral-700">{product.description}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-neutral-600">Price</p>
          <p className="font-display text-3xl">{formatCurrency(product.priceCents)}</p>
        </div>
      </div>

      {confirmedOrder && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          <p className="font-mono uppercase tracking-[0.14em]">Order confirmed</p>
          <p className="mt-1">Order {confirmedOrder} is saved to your library {isDemo ? "(demo checkout)" : ""}.</p>
        </div>
      )}

      <div className="grid gap-8 md:grid-cols-[1.1fr,0.9fr]">
        <div className="overflow-hidden rounded-3xl border border-neutral-200 bg-neutral-50">
          <div dangerouslySetInnerHTML={{ __html: product.images[0] }} />
        </div>
        <div className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
          <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">What’s inside</p>
          <ul className="space-y-2 text-sm text-neutral-800">
            <li>• Universe alignment with signature-ready palette</li>
            <li>• Delivery-ready assets packaged in your library</li>
            <li>• Stripe test checkout or demo checkout fallback</li>
          </ul>
          <form action={purchaseProduct} className="space-y-4">
            <input type="hidden" name="productId" value={product.id} />
            <input type="hidden" name="slug" value={product.slug} />
            <Button type="submit" className="w-full">
              {stripeEnabled ? "Checkout via Stripe" : "Checkout (demo mode)"}
            </Button>
            <p className="text-xs text-neutral-500">
              After payment you’ll be redirected to this page with confirmation and the order will appear in your app
              library.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

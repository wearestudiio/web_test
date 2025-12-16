// @ts-nocheck
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { notFound } from "next/navigation";
import { Stamp } from "@/components/stamp";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function LibraryPage({ searchParams }: { searchParams: { work?: string; demo?: string } }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return notFound();

  const [works, orders] = await Promise.all([
    prisma.work.findMany({ where: { userId: session.user.id }, include: { universe: true }, orderBy: { createdAt: "desc" } }),
    prisma.order.findMany({
      where: { userId: session.user.id },
      include: { items: { include: { product: true } } },
      orderBy: { createdAt: "desc" },
    }),
  ]);

  return (
    <div className="space-y-8">
      {searchParams.work && (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
          Work {searchParams.work} is saved {searchParams.demo ? "(demo signature)" : ""}.
        </div>
      )}
      <div className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Signed works</p>
          <p className="text-xs text-neutral-600">{works.length} total</p>
        </div>
        <div className="grid gap-3">
          {works.map((work) => (
            <div key={work.id} className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-xl">{work.type}</p>
                  <p className="text-xs text-neutral-600">
                    {work.universe.name} · {new Date(work.createdAt).toLocaleString()}
                  </p>
                </div>
                <Stamp state={work.chainTxHash ? "verified" : "demo"} />
              </div>
              <p className="mt-2 text-xs text-neutral-600">Hash: {work.hash}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium">Drop purchases</p>
          <p className="text-xs text-neutral-600">{orders.length} orders</p>
        </div>
        <div className="grid gap-3">
          {orders.map((order) => (
            <div key={order.id} className="rounded-xl border border-neutral-200 bg-neutral-50 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-display text-lg">{order.items[0]?.product.title}</p>
                  <p className="text-xs text-neutral-600">
                    {order.status} · {new Date(order.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <p className="text-sm text-neutral-700">{formatCurrency(order.totalCents)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

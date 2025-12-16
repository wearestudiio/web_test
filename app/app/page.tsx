// @ts-nocheck
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";
import { Stamp } from "@/components/stamp";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;

  const [works, orders] = await Promise.all([
    prisma.work.findMany({ where: { userId: session.user.id }, include: { universe: true }, orderBy: { createdAt: "desc" }, take: 3 }),
    prisma.order.findMany({ where: { userId: session.user.id }, include: { items: { include: { product: true } } }, orderBy: { createdAt: "desc" }, take: 3 }),
  ]);

  return (
    <div className="space-y-8">
      <div className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">Dashboard</p>
            <h1 className="font-display text-3xl">Welcome back</h1>
          </div>
          <Link href="/app/generate" className="text-sm underline underline-offset-4">
            Generate new work →
          </Link>
        </div>
        <p className="mt-2 text-neutral-700">
          Track your signed works, drop orders, and collaborator requests. Demo data is seeded for every role.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Recent works</p>
            <Link href="/app/library" className="text-xs text-neutral-600 underline underline-offset-4">
              View all
            </Link>
          </div>
          {works.length === 0 && <p className="text-sm text-neutral-600">No works yet. Generate your first piece.</p>}
          <div className="space-y-2">
            {works.map((work) => (
              <div key={work.id} className="flex items-center justify-between rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <div>
                  <p className="font-display text-lg">{work.type}</p>
                  <p className="text-xs text-neutral-600">
                    {work.universe.name} · {new Date(work.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <Stamp state={work.chainTxHash ? "verified" : "demo"} />
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-3 rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <p className="text-sm font-medium">Recent orders</p>
            <Link href="/app/orders" className="text-xs text-neutral-600 underline underline-offset-4">
              View all
            </Link>
          </div>
          {orders.length === 0 && <p className="text-sm text-neutral-600">No orders yet.</p>}
          <div className="space-y-2">
            {orders.map((order) => (
              <div key={order.id} className="rounded-xl border border-neutral-200 bg-neutral-50 px-4 py-3">
                <div className="flex items-center justify-between">
                  <p className="font-display text-lg">{order.items[0]?.product.title ?? "Drop"}</p>
                  <p className="text-sm text-neutral-700">{formatCurrency(order.totalCents)}</p>
                </div>
                <p className="text-xs text-neutral-600">
                  {order.status} · {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

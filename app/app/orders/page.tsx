// @ts-nocheck
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { formatCurrency } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const isAdmin = session.user.role === "ADMIN" || session.user.role === "ARTIST_ADMIN";

  const orders = await prisma.order.findMany({
    where: isAdmin ? {} : { userId: session.user.id },
    include: { items: { include: { product: true } }, user: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl">Orders</h1>
        <p className="text-sm text-neutral-600">{isAdmin ? "Admin view" : "Personal view"}</p>
      </div>
      <div className="grid gap-3">
        {orders.map((order) => (
          <div key={order.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-display text-xl">{order.items[0]?.product.title}</p>
                <p className="text-xs text-neutral-600">
                  {order.user.email} · {new Date(order.createdAt).toLocaleString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm text-neutral-700">{formatCurrency(order.totalCents)}</p>
                <p className="text-xs text-neutral-500 uppercase">{order.status}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

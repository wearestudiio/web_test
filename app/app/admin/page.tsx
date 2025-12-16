// @ts-nocheck
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id || session.user.role !== "ADMIN") {
    return <p className="text-sm text-neutral-700">Admin only.</p>;
  }

  const [leads, users] = await Promise.all([
    prisma.lead.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
    prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 10 }),
  ]);

  return (
    <div className="grid gap-6 md:grid-cols-2">
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-2xl">Leads</h2>
        <div className="mt-3 space-y-2 text-sm text-neutral-700">
          {leads.map((lead) => (
            <div key={lead.id} className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <p className="font-medium">{lead.email}</p>
              <p className="text-xs text-neutral-600">{lead.note}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
        <h2 className="font-display text-2xl">Users</h2>
        <div className="mt-3 space-y-2 text-sm text-neutral-700">
          {users.map((user) => (
            <div key={user.id} className="rounded-lg border border-neutral-200 bg-neutral-50 p-3">
              <p className="font-medium">{user.email}</p>
              <p className="text-xs text-neutral-600 uppercase">{user.role}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

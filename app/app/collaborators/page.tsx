// @ts-nocheck
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

async function requestCollab(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/login");
  const collaboratorUserId = String(formData.get("collaboratorUserId") || "");
  const universeId = String(formData.get("universeId") || "");
  await prisma.collabRequest.create({
    data: {
      collaboratorUserId,
      universeId,
      requesterUserId: session.user.id,
      message: "Request initiated from dashboard",
    },
  });
}

export default async function CollaboratorsAppPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const universes = await prisma.universe.findMany();
  const collaborators = await prisma.collaboratorProfile.findMany({ include: { user: true } });

  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl">Collaborators</h1>
      <div className="grid gap-4 md:grid-cols-3">
        {collaborators.map((profile) => (
          <div key={profile.id} className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-mono uppercase tracking-[0.14em] text-neutral-500">{profile.disciplines.join(" · ")}</p>
            <h3 className="font-display text-xl">{profile.displayName}</h3>
            <p className="text-sm text-neutral-700">{profile.bio}</p>
            <form action={requestCollab} className="mt-3 space-y-2">
              <input type="hidden" name="collaboratorUserId" value={profile.userId} />
              <select
                name="universeId"
                className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
              >
                {universes.map((u) => (
                  <option key={u.id} value={u.id}>
                    {u.name}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="w-full rounded-full bg-neutral-900 px-4 py-2 text-sm font-medium text-white hover:bg-neutral-800"
              >
                Request collab
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}

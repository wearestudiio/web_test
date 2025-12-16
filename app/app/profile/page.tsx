// @ts-nocheck
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function updateProfile(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/login");
  const name = String(formData.get("name") || "");
  await prisma.user.update({
    where: { id: session.user.id },
    data: { name },
  });
  revalidatePath("/app/profile");
}

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return null;

  return (
    <div className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h1 className="font-display text-3xl">Profile</h1>
      <p className="text-sm text-neutral-700">Update your display name. Email + role are tied to your authentication.</p>
      <form action={updateProfile} className="space-y-4">
        <div className="space-y-1">
          <label className="text-sm text-neutral-700">Email</label>
          <input
            value={user.email}
            disabled
            className="w-full rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-neutral-500"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-700">Name</label>
          <input
            name="name"
            defaultValue={user.name || ""}
            className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Save changes
        </button>
      </form>
    </div>
  );
}

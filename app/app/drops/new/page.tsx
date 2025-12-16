// @ts-nocheck
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

async function createDrop(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) redirect("/auth/login");
  if (session.user.role !== "ADMIN" && session.user.role !== "ARTIST_ADMIN") {
    throw new Error("Only admins can create drops");
  }
  const title = String(formData.get("title") || "");
  const universeId = String(formData.get("universeId") || "");
  const priceCents = Number(formData.get("priceCents") || 0);
  const slug = String(formData.get("slug") || "").trim();
  const description = String(formData.get("description") || "");
  const imageSvg = String(formData.get("imageSvg") || "");

  await prisma.product.create({
    data: {
      title,
      slug,
      description,
      priceCents,
      images: [imageSvg],
      universeId,
    },
  });
  revalidatePath("/drops");
  redirect(`/drops/${slug}`);
}

export default async function NewDropPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return null;
  if (session.user.role !== "ADMIN" && session.user.role !== "ARTIST_ADMIN") {
    return <p className="text-sm text-neutral-700">Only artist admins can create drops.</p>;
  }
  const universes = await prisma.universe.findMany();
  return (
    <div className="space-y-6 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h1 className="font-display text-3xl">Create drop</h1>
      <form action={createDrop} className="space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <input name="title" required placeholder="Title" className="rounded-xl border border-neutral-200 px-3 py-2" />
          <input name="slug" required placeholder="slug" className="rounded-xl border border-neutral-200 px-3 py-2" />
        </div>
        <select name="universeId" className="w-full rounded-xl border border-neutral-200 px-3 py-2">
          {universes.map((u) => (
            <option key={u.id} value={u.id}>
              {u.name}
            </option>
          ))}
        </select>
        <input
          name="priceCents"
          type="number"
          required
          placeholder="Price in cents"
          className="rounded-xl border border-neutral-200 px-3 py-2"
        />
        <textarea
          name="description"
          required
          rows={3}
          placeholder="Description"
          className="w-full rounded-xl border border-neutral-200 px-3 py-2"
        />
        <textarea
          name="imageSvg"
          rows={4}
          placeholder="<svg>…</svg>"
          className="w-full rounded-xl border border-neutral-200 px-3 py-2"
        />
        <button
          type="submit"
          className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Create drop
        </button>
      </form>
    </div>
  );
}

import { prisma } from "@/lib/prisma";
import { SectionLabel } from "@/components/section-label";
import { redirect } from "next/navigation";
import { hash } from "bcryptjs";
import { z } from "zod";

const roleOptions = ["FAN", "COLLABORATOR", "ARTIST_ADMIN"] as const;
type RoleType = (typeof roleOptions)[number];

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
  name: z.string().min(2),
  role: z.enum(roleOptions).default("FAN"),
});

async function registerAction(formData: FormData) {
  "use server";
  const parsed = schema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
    name: formData.get("name"),
    role: formData.get("role"),
  });

  const passwordHash = await hash(parsed.password, 10);
  await prisma.user.create({
    data: {
      email: parsed.email.toLowerCase(),
      name: parsed.name,
      role: parsed.role,
      passwordHash,
    },
  });
  redirect("/auth/login");
}

export default function RegisterPage({ searchParams }: { searchParams: { role?: RoleType } }) {
  const role = searchParams.role || "FAN";
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <SectionLabel text="Register" />
      <h1 className="font-display text-4xl">Join studiio</h1>
      <p className="text-neutral-700">Create an account to generate, purchase drops, or accept collaborations.</p>
      <form action={registerAction} className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="space-y-1">
          <label className="text-sm text-neutral-700">Name</label>
          <input
            name="name"
            required
            className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-700">Email</label>
          <input
            name="email"
            type="email"
            required
            className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-700">Password</label>
          <input
            name="password"
            type="password"
            required
            className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-700">Role</label>
          <select
            name="role"
            defaultValue={role}
            className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
          >
            {roleOptions.map((option) => (
              <option key={option} value={option}>
                {option === "FAN" ? "Fan" : option === "COLLABORATOR" ? "Collaborator" : "Artist / Admin"}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Create account
        </button>
      </form>
    </div>
  );
}

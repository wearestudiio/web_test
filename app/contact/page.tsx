import { SectionLabel } from "@/components/section-label";
import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

async function submitLead(formData: FormData) {
  "use server";
  const email = String(formData.get("email") || "");
  const name = String(formData.get("name") || "");
  const note = String(formData.get("note") || "");
  if (!email) return;
  await prisma.lead.create({ data: { email, name, note } });
  revalidatePath("/contact");
}

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 space-y-6">
      <SectionLabel text="Contact" />
      <h1 className="font-display text-4xl">Join the waitlist or book a studio call.</h1>
      <p className="text-neutral-700">
        Drop a note about what you want to build—fan packages, a couture drop, or a custom signature flow. The team will
        respond with a calendar link.
      </p>
      <form action={submitLead} className="space-y-4 rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-1">
            <label className="text-sm text-neutral-700">Name</label>
            <input
              name="name"
              className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
              placeholder="Your name"
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-neutral-700">Email</label>
            <input
              name="email"
              required
              type="email"
              className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
              placeholder="you@studi.io"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="text-sm text-neutral-700">Project notes</label>
          <textarea
            name="note"
            rows={4}
            className="w-full rounded-xl border border-neutral-200 px-3 py-2 focus:border-neutral-900 focus:outline-none"
            placeholder="What you want to launch"
          />
        </div>
        <button
          type="submit"
          className="rounded-full bg-neutral-900 px-6 py-3 text-sm font-medium text-white hover:bg-neutral-800"
        >
          Send
        </button>
      </form>
    </div>
  );
}

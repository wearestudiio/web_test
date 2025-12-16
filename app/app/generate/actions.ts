// @ts-nocheck
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { generateWorkContent } from "@/lib/generator";
import { signWork } from "@/lib/signature";
import { registerOnChain } from "@/lib/blockchain";
import { getStripeClient, generationPriceCents, stripeEnabled } from "@/lib/stripe";
import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { z } from "zod";

type WorkStatusType = "PENDING" | "COMPLETED" | "FAILED";
const WorkStatus = {
  PENDING: "PENDING" as WorkStatusType,
  COMPLETED: "COMPLETED" as WorkStatusType,
  FAILED: "FAILED" as WorkStatusType,
};

const schema = z.object({
  universeId: z.string(),
  type: z.string(),
  occasion: z.string(),
  mood: z.string(),
  references: z.string().optional(),
  notes: z.string().optional(),
});

export async function startGeneration(formData: FormData) {
  "use server";
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    redirect("/auth/login?callbackUrl=/app/generate");
  }
  const parsed = schema.parse({
    universeId: formData.get("universeId"),
    type: formData.get("type"),
    occasion: formData.get("occasion"),
    mood: formData.get("mood"),
    references: formData.get("references") || "",
    notes: formData.get("notes") || "",
  });

  const universe = await prisma.universe.findUnique({ where: { id: parsed.universeId } });
  if (!universe) throw new Error("Universe not found");

  if (!stripeEnabled) {
    const work = await generateAndSign({
      parsed,
      universe,
      userId: session.user.id,
      status: WorkStatus.COMPLETED,
    });
    redirect(`/app/library?work=${work.id}&demo=1`);
  }

  const work = await prisma.work.create({
    data: {
      userId: session.user.id,
      universeId: universe.id,
      type: parsed.type,
      inputJson: parsed,
      outputJson: {},
      hash: "",
      signature: "",
      status: WorkStatus.PENDING,
    },
  });

  const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const stripe = getStripeClient();
  const sessionStripe = await stripe!.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: { name: `${universe.name} ${parsed.type}`, description: parsed.occasion },
          unit_amount: generationPriceCents,
        },
        quantity: 1,
      },
    ],
    success_url: `${baseUrl}/app/generate?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${baseUrl}/app/generate?cancelled=1`,
    metadata: { workId: work.id },
  });

  await prisma.work.update({ where: { id: work.id }, data: { stripeSessionId: sessionStripe.id } });
  redirect(sessionStripe.url!);
}

export async function completeGenerationFromSession(sessionId: string) {
  const stripe = getStripeClient();
  if (!stripe) return null;
  const checkout = await stripe.checkout.sessions.retrieve(sessionId);
  if (checkout.payment_status !== "paid") return null;
  const workId = checkout.metadata?.workId;
  if (!workId) return null;
  const work = await prisma.work.findUnique({ where: { id: workId } });
  if (!work) return null;
  if (work.status === WorkStatus.COMPLETED) return work;

  const universe = await prisma.universe.findUniqueOrThrow({ where: { id: work.universeId } });
  const userId = work.userId;

  return generateAndSign({
    parsed: work.inputJson as any,
    universe,
    userId,
    status: WorkStatus.COMPLETED,
    existingWorkId: work.id,
    stripeSessionId: sessionId,
  });
}

async function generateAndSign({
  parsed,
  universe,
  userId,
  status,
  existingWorkId,
  stripeSessionId,
}: {
  parsed: z.infer<typeof schema>;
  universe: { id: string; slug: string; name: string };
  userId: string;
  status: WorkStatusType;
  existingWorkId?: string;
  stripeSessionId?: string;
}) {
  const output = await generateWorkContent({
    universe: universe.name,
    type: parsed.type,
    occasion: parsed.occasion,
    mood: parsed.mood,
    references: parsed.references || "",
    notes: parsed.notes || "",
  });
  const signed = await signWork({ input: parsed, output, universe: universe.slug });
  const privateKey =
    universe.slug === "worm" ? process.env.WORM_SIGNER_PRIVATE_KEY : process.env.TARNS_SIGNER_PRIVATE_KEY;

  const registerResult = await registerOnChain({
    hash: signed.hash,
    universeSlug: universe.slug,
    signature: signed.signature,
    uri: `${process.env.NEXTAUTH_URL || "http://localhost:3000"}/app/library`,
    privateKey,
  });

  const data = {
    userId,
    universeId: universe.id,
    type: parsed.type,
    inputJson: parsed,
    outputJson: output,
    hash: signed.hash,
    signature: signed.signature,
    chainTxHash: registerResult.txHash || null,
    chainId: registerResult.txHash ? 31337 : null,
    status,
    stripeSessionId,
  };

  if (existingWorkId) {
    return prisma.work.update({ where: { id: existingWorkId }, data });
  }
  return prisma.work.create({ data });
}

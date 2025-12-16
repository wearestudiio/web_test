import { prisma } from "@/lib/prisma";
import { getStripeClient } from "@/lib/stripe";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: Request) {
  const stripe = getStripeClient();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  const body = await req.text();

  if (!stripe || !secret) {
    return new Response(JSON.stringify({ demo: true }), { status: 200 });
  }

  const headerList = await headers();
  const sig = headerList.get("stripe-signature") as string;
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, secret);
  } catch (err: any) {
    return new Response(`Webhook Error: ${err.message}`, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const orderId = session.metadata?.orderId;
    if (orderId) {
      await prisma.order.update({
        where: { id: orderId },
        data: { status: "PAID", stripeSessionId: session.id },
      });
    }
  }

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}

"use client";

import { Button } from "@/app/_components/ui/button";
import createStripeCheckout from "../_actions/create-checkout";
import { loadStripe } from "@stripe/stripe-js";

export default function AcquirePlanButton() {
  const handleAcquirePlanClick = async () => {
    // Implement the acquire plan logic here
    const { sessionId } = await createStripeCheckout();
    if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
      throw new Error("Missing Stripe publishable key");
    }
    const stripe = await loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,
    );
    if (!stripe) {
      throw new Error("Stripe is not loaded");
    }
    await stripe.redirectToCheckout({ sessionId });
  };

  return (
    <Button
      className="w-full rounded-full font-bold"
      onClick={handleAcquirePlanClick}
    >
      Adquirir plano
    </Button>
  );
}

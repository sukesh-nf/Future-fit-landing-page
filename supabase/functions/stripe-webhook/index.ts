import { createClient } from "npm:@supabase/supabase-js@2.57.4";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

async function verifyStripeSignature(payload: string, signature: string, secret: string): Promise<boolean> {
  const encoder = new TextEncoder();

  const parts = signature.split(",");
  const sigParts: Record<string, string> = {};
  for (const part of parts) {
    const [key, value] = part.split("=");
    sigParts[key] = value;
  }

  const timestamp = sigParts["t"];
  const sig = sigParts["v1"];

  if (!timestamp || !sig) return false;

  const signedPayload = `${timestamp}.${payload}`;
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );

  const expectedSig = await crypto.subtle.sign("HMAC", key, encoder.encode(signedPayload));
  const expectedHex = Array.from(new Uint8Array(expectedSig))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return expectedHex === sig;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

    if (!stripeSecretKey || !webhookSecret) {
      return new Response(
        JSON.stringify({ error: "Stripe secrets not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const payload = await req.text();
    const signature = req.headers.get("stripe-signature") || "";

    const verified = await verifyStripeSignature(payload, signature, webhookSecret);
    if (!verified) {
      return new Response(
        JSON.stringify({ error: "Invalid signature" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const event = JSON.parse(payload);

    if (event.type === "checkout.session.completed") {
      const session = event.data.object;
      const registrationId = session.metadata?.registration_id;
      const email = session.metadata?.email;
      const stripeSessionId = session.id;

      if (registrationId) {
        const supabase = createClient(
          Deno.env.get("SUPABASE_URL")!,
          Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
        );

        const { error } = await supabase
          .from("webinar_registrations")
          .update({
            payment_status: "paid",
            stripe_session_id: stripeSessionId,
          })
          .eq("id", registrationId);

        if (error) {
          return new Response(
            JSON.stringify({ error: `DB update failed: ${error.message}` }),
            { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
          );
        }
      }
    }

    return new Response(
      JSON.stringify({ received: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

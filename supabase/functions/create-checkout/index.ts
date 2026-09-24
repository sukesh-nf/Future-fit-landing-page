Deno.serve(async (req: Request) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
  };

  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const { registration_id, email, preferred_session } = await req.json();

    if (!registration_id || !email) {
      return new Response(
        JSON.stringify({ error: "registration_id and email are required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const stripeSecretKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeSecretKey) {
      return new Response(
        JSON.stringify({ error: "STRIPE_SECRET_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const origin = req.headers.get("origin") || "https://futurefitnow.bolt.host";

    const session = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "mode": "payment",
        "customer_email": email,
        "line_items[0][price_data][currency]": "usd",
        "line_items[0][price_data][product_data][name]": "AI-Era Business Strategy Workbook",
        "line_items[0][price_data][product_data][description]": "268-page fillable PDF workbook for applying the AI-era business strategy framework to your business. Companion to the FutureFitNow executive briefing webinar.",
        "line_items[0][price_data][unit_amount]": "4700",
        "line_items[0][quantity]": "1",
        "success_url": `${origin}/?payment=success`,
        "cancel_url": `${origin}/?payment=cancelled`,
        "metadata[registration_id]": registration_id,
        "metadata[email]": email,
        "metadata[preferred_session]": String(preferred_session || 1),
      }),
    });

    if (!session.ok) {
      const errText = await session.text();
      return new Response(
        JSON.stringify({ error: `Stripe error: ${errText}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const sessionData = await session.json();

    return new Response(
      JSON.stringify({ url: sessionData.url }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

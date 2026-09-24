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
    const { first_name, last_name, email, preferred_session, wants_workbook, wants_recording, payment_status } = await req.json();

    if (!email) {
      return new Response(
        JSON.stringify({ error: "Email is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const fullName = [first_name, last_name].filter(Boolean).join(" ") || "there";
    const sessionNum = preferred_session === 2 ? 2 : 1;

    const sessionDates: Record<number, { start: string; end: string; link: string }> = {
      1: {
        start: "2026-10-15T13:00:00+13:00",
        end: "2026-10-15T14:00:00+13:00",
        link: "https://us06web.zoom.us/j/FutureFitNowSession1",
      },
      2: {
        start: "2026-10-21T13:00:00+13:00",
        end: "2026-10-21T14:00:00+13:00",
        link: "https://us06web.zoom.us/j/FutureFitNowSession2",
      },
    };

    const sess = sessionDates[sessionNum];
    const webinarTitle = "FutureFitNow: AI Business Navigation Executive Briefing";
    const webinarStart = new Date(sess.start);
    const webinarEnd = new Date(sess.end);
    const webinarLink = sess.link;
    const location = "Live Online (Zoom)";

    const formatDate = (d: Date) =>
      d.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");

    const startStr = formatDate(webinarStart);
    const endStr = formatDate(webinarEnd);
    const dateStr = webinarStart.toLocaleDateString("en-NZ", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    const timeStr = "1:00 PM NZST";

    const details = `${webinarTitle}\n\nDate: ${dateStr}\nTime: ${timeStr}\nLocation: ${location}\n\nJoin link: ${webinarLink}`;
    const encodedTitle = encodeURIComponent(webinarTitle);
    const encodedDetails = encodeURIComponent(details);
    const encodedLocation = encodeURIComponent(location);

    const googleCal = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodedTitle}&dates=${startStr}/${endStr}&details=${encodedDetails}&location=${encodedLocation}`;
    const yahooCal = `https://calendar.yahoo.com/?v=60&view=d&type=20&title=${encodedTitle}&st=${startStr}&et=${endStr}&desc=${encodedDetails}&in_loc=${encodedLocation}`;
    const icsContent = `BEGIN:VCALENDAR\nVERSION:2.0\nBEGIN:VEVENT\nDTSTART:${startStr}\nDTEND:${endStr}\nSUMMARY:${webinarTitle}\nDESCRIPTION:${details.replace(/\\n/g, "\n")}\nLOCATION:${location}\nEND:VEVENT\nEND:VCALENDAR`;
    const outlookCal = `https://outlook.live.com/calendar/0/deeplink/compose?subject=${encodedTitle}&startdt=${startStr}&enddt=${endStr}&body=${encodedDetails}&location=${encodedLocation}`;
    const appleCal = `data:text/calendar;charset=utf8,${encodeURIComponent(icsContent)}`;

    const workbookSection = wants_workbook && payment_status === "pending"
      ? `<div style="margin:24px 0;padding:16px;background:#f0fdfa;border:1px solid #99f6e4;border-radius:8px;">
          <p style="margin:0;font-size:15px;font-weight:600;color:#0f766e;">AI-Era Business Strategy Workbook</p>
          <p style="margin:8px 0 0;font-size:14px;color:#0f766e;">A secure payment link for the workbook ($47) will follow in a separate email. Payment is processed via Stripe. If you decide not to complete the purchase, your webinar registration remains valid.</p>
        </div>`
      : "";

    const recordingNote = wants_recording
      ? `<p style="margin:8px 0 0;font-size:14px;color:#0f766e;">You will receive the recording after the live sessions.</p>`
      : "";

    const calendarButtons = `
      <table role="presentation" cellpadding="0" cellspacing="0" style="margin:16px 0;">
        <tr>
          <td style="padding:4px;">
            <a href="${googleCal}" style="display:inline-block;padding:8px 16px;font-size:14px;font-weight:600;color:#0f766e;background:#f0fdfa;border:1px solid #99f6e4;border-radius:6px;text-decoration:none;">Google Calendar</a>
          </td>
          <td style="padding:4px;">
            <a href="${outlookCal}" style="display:inline-block;padding:8px 16px;font-size:14px;font-weight:600;color:#0f766e;background:#f0fdfa;border:1px solid #99f6e4;border-radius:6px;text-decoration:none;">Outlook</a>
          </td>
          <td style="padding:4px;">
            <a href="${appleCal}" style="display:inline-block;padding:8px 16px;font-size:14px;font-weight:600;color:#0f766e;background:#f0fdfa;border:1px solid #99f6e4;border-radius:6px;text-decoration:none;">Apple Calendar</a>
          </td>
          <td style="padding:4px;">
            <a href="${yahooCal}" style="display:inline-block;padding:8px 16px;font-size:14px;font-weight:600;color:#0f766e;background:#f0fdfa;border:1px solid #99f6e4;border-radius:6px;text-decoration:none;">Yahoo Calendar</a>
          </td>
        </tr>
      </table>`;

    const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f8fafc;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 24px;">
    <div style="text-align:center;margin-bottom:24px;">
      <span style="font-size:18px;font-weight:700;color:#0f172a;">FutureFitNow</span>
      <span style="font-size:14px;color:#94a3b8;"> | AI Business Navigation</span>
    </div>
    <div style="background:#ffffff;border:1px solid #e2e8f0;border-radius:12px;padding:32px;">
      <h1 style="margin:0 0 8px;font-size:22px;font-weight:600;color:#0f172a;">You're registered, ${fullName}</h1>
      <p style="margin:0 0 20px;font-size:15px;color:#64748b;line-height:1.6;">Here are your session details and calendar links so you don't miss it.</p>

      <div style="background:#f8fafc;border-radius:8px;padding:16px;margin:20px 0;">
        <p style="margin:0 0 8px;font-size:16px;font-weight:600;color:#0f172a;">${webinarTitle}</p>
        <p style="margin:0 0 4px;font-size:14px;color:#64748b;">Session ${sessionNum}</p>
        <p style="margin:0 0 4px;font-size:14px;color:#64748b;">${dateStr}</p>
        <p style="margin:0 0 4px;font-size:14px;color:#64748b;">${timeStr}</p>
        <p style="margin:0 0 4px;font-size:14px;color:#64748b;">${location}</p>
        <p style="margin:12px 0 0;font-size:14px;color:#0f766e;font-weight:600;">
          <a href="${webinarLink}" style="color:#0f766e;text-decoration:none;">Join the session</a>
        </p>
        ${recordingNote}
      </div>

      ${calendarButtons}
      ${workbookSection}

      <div style="margin-top:24px;padding-top:20px;border-top:1px solid #e2e8f0;">
        <p style="margin:0 0 8px;font-size:14px;font-weight:600;color:#0f172a;">Optional: 30 seconds</p>
        <p style="margin:0;font-size:14px;color:#64748b;line-height:1.6;">
          <strong>NexFrontier Logic Leadership Pulse</strong> a brief survey whose aggregate
          responses may help ground the webinar in what leaders are seeing now.
          <a href="https://nexfrontierlogic.nz/leadership-pulse" style="color:#0f766e;text-decoration:none;font-weight:600;">Take the survey</a>
        </p>
      </div>

      <p style="margin:24px 0 0;font-size:13px;color:#94a3b8;line-height:1.6;">
        FutureFitNow | AI Business Navigation<br/>
        &copy; 2026 FutureFitNow
      </p>
    </div>
  </div>
</body></html>`;

    const resendApiKey = Deno.env.get("RESEND_API_KEY");
    if (!resendApiKey) {
      return new Response(
        JSON.stringify({ error: "RESEND_API_KEY not configured" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "FutureFitNow <noreply@resend.dev>",
        to: [email],
        subject: `You're registered: ${webinarTitle}`,
        html,
      }),
    });

    if (!resendResponse.ok) {
      const errText = await resendResponse.text();
      return new Response(
        JSON.stringify({ error: `Resend error: ${errText}` }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err instanceof Error ? err.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  }
});

import type { VercelRequest, VercelResponse } from "@vercel/node";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { name, email, phone, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "Campi obbligatori mancanti" });
  }

  try {
    await resend.emails.send({
      from: "GLG Costruzioni <onboarding@resend.dev>",
      to: "luca.andreoli00@gmail.com",
      replyTo: email,
      subject: `[Sito Web] ${subject} — ${name}`,
      html: `
        <h2>Nuova richiesta dal sito web</h2>
        <table style="border-collapse:collapse;width:100%;max-width:600px">
          <tr><td style="padding:8px;font-weight:bold;width:140px">Nome</td><td style="padding:8px">${name}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold">Email</td><td style="padding:8px"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold">Telefono</td><td style="padding:8px">${phone || "Non fornito"}</td></tr>
          <tr style="background:#f9f9f9"><td style="padding:8px;font-weight:bold">Oggetto</td><td style="padding:8px">${subject}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;vertical-align:top">Messaggio</td><td style="padding:8px;white-space:pre-wrap">${message}</td></tr>
        </table>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Errore invio email:", error);
    return res.status(500).json({ error: "Errore durante l'invio" });
  }
}
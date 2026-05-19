import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

const SITE_URL = process.env.VITE_SITE_URL ?? "https://glg-costruzioni-git-alternativa-lucandreoli00s-projects.vercel.app";

// Cerca un utente per email scorrendo tutte le pagine. listUsers pagina
// a 50 di default: senza questo gli utenti oltre la prima pagina non
// venivano trovati -> inviti duplicati/falliti con la crescita.
async function findUserByEmail(email: string) {
  const target = email.trim().toLowerCase();
  const perPage = 1000;
  for (let page = 1; page <= 100; page++) {
    const { data, error } = await supabase.auth.admin.listUsers({ page, perPage });
    if (error) throw error;
    const found = data.users.find(
      (u) => (u.email ?? "").toLowerCase() === target
    );
    if (found) return found;
    if (data.users.length < perPage) break;
  }
  return null;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, nome, cognome, azienda, cantiere_id } = req.body;

  if (!email || !nome || !cognome || !cantiere_id) {
    return res.status(400).json({ error: "Campi obbligatori mancanti" });
  }

  try {
    const existing = await findUserByEmail(email);

    let userId: string;
    let isNew = false;

    if (existing) {
      userId = existing.id;
    } else {
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password: email,
        email_confirm: true,
        user_metadata: {
          nome,
          cognome,
          azienda,
          ruolo: "cliente",
          password_set: false,
        },
      });
      if (error) throw error;
      userId = data.user.id;
      isNew = true;
    }

    await supabase.from("cantieri_utenti").upsert(
      { cantiere_id, user_id: userId, ruolo_cantiere: "cliente" },
      { onConflict: "cantiere_id,user_id" }
    );

    if (isNew) {
      // Genera link firmato con token — il click crea una sessione valida direttamente
      const { data: linkData, error: linkError } = await supabase.auth.admin.generateLink({
        type: "recovery",
        email,
        options: { redirectTo: `${SITE_URL}/set-password` },
      });
      if (linkError) throw linkError;

      const { error: emailError } = await resend.emails.send({
        from: "GLG Costruzioni <onboarding@resend.dev>",
        to: email,
        subject: "Accesso al Portale Clienti GLG Costruzioni",
        html: `
          <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
            <h2 style="color:#1a1a1a">Benvenuto nel Portale Clienti GLG Costruzioni</h2>
            <p>Gentile ${nome} ${cognome},</p>
            <p>È stato creato un account per accedere al portale clienti dove potrà seguire l'avanzamento del suo cantiere.</p>
            <p>Clicchi il pulsante qui sotto per impostare la sua password e accedere al portale.</p>
            <a href="${linkData.properties.action_link}" style="display:inline-block;padding:12px 24px;background:#1a1a1a;color:#fff;text-decoration:none;border-radius:6px;margin:16px 0">
              Imposta la tua password
            </a>
            <p style="color:#666;font-size:13px;margin-top:32px">
              Il link è valido per 24 ore. Per qualsiasi problema contatti GLG Costruzioni.
            </p>
          </div>
        `,
      });
      if (emailError) throw new Error(emailError.message);
    }

    return res.status(200).json({ success: true });
  } catch (error: any) {
    return res.status(500).json({ error: error.message });
  }
}
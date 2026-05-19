import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// Client service-role: bypassa RLS, usato per fetch documento + signed URL.
const admin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const TTL = 300; // signed URL valido 5 minuti

// Estrae il path storage sia da URL pubblico (righe vecchie) sia da path nudo.
function storagePath(stored: string) {
  return stored.includes("/documenti/")
    ? stored.split("/documenti/")[1]
    : stored;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  // 1. Valida il token utente
  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Non autenticato" });

  const {
    data: { user },
    error: userErr,
  } = await admin.auth.getUser(token);
  if (userErr || !user) {
    return res.status(401).json({ error: "Sessione non valida" });
  }

  const { documento_id, azione } = req.body;
  if (!documento_id) {
    return res.status(400).json({ error: "documento_id mancante" });
  }

  // 2. Recupera il documento (service role, bypassa RLS)
  const { data: doc, error: docErr } = await admin
    .from("documenti")
    .select("id, url, cantiere_id, visibile, caricato_da")
    .eq("id", documento_id)
    .single();
  if (docErr || !doc) {
    return res.status(404).json({ error: "Documento non trovato" });
  }

  // 3. Autorizzazione: admin OPPURE membro del cantiere
  //    AND (documento visibile OPPURE è stato caricato dall'utente stesso)
  const { data: profile } = await admin
    .from("profiles")
    .select("ruolo")
    .eq("id", user.id)
    .single();
  const isAdmin = profile?.ruolo === "admin";

  if (!isAdmin) {
    const { data: membership } = await admin
      .from("cantieri_utenti")
      .select("user_id")
      .eq("cantiere_id", doc.cantiere_id)
      .eq("user_id", user.id)
      .maybeSingle();

    const authorized =
      !!membership && (doc.visibile === true || doc.caricato_da === user.id);
    if (!authorized) {
      return res.status(403).json({ error: "Non autorizzato" });
    }
  }

  // 4. Genera signed URL
  const { data: signed, error: signErr } = await admin.storage
    .from("documenti")
    .createSignedUrl(storagePath(doc.url), TTL);
  if (signErr || !signed) {
    return res.status(500).json({ error: "Impossibile generare l'URL" });
  }

  // 5. Log accesso (best-effort, non blocca la risposta)
  if (azione) {
    await admin
      .from("log_accessi")
      .insert({ user_id: user.id, documento_id, azione })
      .then(
        () => {},
        () => {}
      );
  }

  return res.status(200).json({ url: signed.signedUrl });
}

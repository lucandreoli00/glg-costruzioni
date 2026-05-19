import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

// Client service-role: bypassa RLS. La mutazione del flag avviene solo qui,
// dopo aver verificato che chi richiede è il cliente che ha caricato il file.
const admin = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = (req.headers.authorization || "").replace("Bearer ", "");
  if (!token) return res.status(401).json({ error: "Non autenticato" });

  const {
    data: { user },
    error: userErr,
  } = await admin.auth.getUser(token);
  if (userErr || !user) {
    return res.status(401).json({ error: "Sessione non valida" });
  }

  const { documento_id } = req.body;
  if (!documento_id) {
    return res.status(400).json({ error: "documento_id mancante" });
  }

  const { data: doc, error: docErr } = await admin
    .from("documenti")
    .select("id, caricato_da")
    .eq("id", documento_id)
    .single();
  if (docErr || !doc) {
    return res.status(404).json({ error: "Documento non trovato" });
  }

  // Solo il cliente che ha caricato il documento può rimuoverlo (soft-delete)
  if (doc.caricato_da !== user.id) {
    return res.status(403).json({ error: "Non autorizzato" });
  }

  const { error: upErr } = await admin
    .from("documenti")
    .update({ eliminato_da_cliente: true })
    .eq("id", documento_id);
  if (upErr) {
    return res.status(500).json({ error: "Errore durante la rimozione" });
  }

  return res.status(200).json({ success: true });
}

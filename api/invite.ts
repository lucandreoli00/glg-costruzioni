import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email, nome, cognome, azienda, cantiere_id } = req.body;

  if (!email || !nome || !cognome || !cantiere_id) {
    return res.status(400).json({ error: "Campi obbligatori mancanti" });
  }

  try {
    const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
      data: { nome, cognome, azienda, ruolo: 'cliente' }
    })

    if (error) throw error

    await supabase.from('cantieri_utenti').insert({
      cantiere_id,
      user_id: data.user.id,
      ruolo_cantiere: 'cliente'
    })

    return res.status(200).json({ success: true })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

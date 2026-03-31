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
    // controlla se l'utente esiste già
    const { data: utentiEsistenti } = await supabase
      .from('profiles')
      .select('id')
      .eq('id', (
        await supabase.auth.admin.listUsers()
      ).data.users.find(u => u.email === email)?.id ?? '')
      .single()

    let userId: string

    if (utentiEsistenti) {
      // utente esiste — prendi solo l'id
      const { data: { users } } = await supabase.auth.admin.listUsers()
      const existing = users.find(u => u.email === email)
      if (!existing) throw new Error('Utente non trovato')
      userId = existing.id
    } else {
      // utente non esiste — invia invito
      const { data, error } = await supabase.auth.admin.inviteUserByEmail(email, {
        data: { nome, cognome, azienda, ruolo: 'cliente' }
      })
      if (error) throw error
      userId = data.user.id
    }

    // assegna al cantiere (ignora se già assegnato)
    await supabase.from('cantieri_utenti').upsert({
      cantiere_id,
      user_id: userId,
      ruolo_cantiere: 'cliente'
    }, { onConflict: 'cantiere_id,user_id' })

    return res.status(200).json({ success: true })
  } catch (error: any) {
    return res.status(500).json({ error: error.message })
  }
}

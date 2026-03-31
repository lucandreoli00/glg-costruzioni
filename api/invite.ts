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
    const { data: { users } } = await supabase.auth.admin.listUsers()
    const existing = users.find(u => u.email === email)

    let userId: string

    if (existing) {
      userId = existing.id
    } else {
      // invito via email Supabase + password temporanea = email
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password: email,
        email_confirm: true,
        user_metadata: {
          nome,
          cognome,
          azienda,
          ruolo: 'cliente',
          password_set: false
        }
      })
      if (error) throw error
      userId = data.user.id

      // manda email di invito con Supabase
      await supabase.auth.admin.inviteUserByEmail(email, {
        data: { nome, cognome, azienda, ruolo: 'cliente' }
      })
    }

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
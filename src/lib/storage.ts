import { supabase } from './supabase'

// Estrae il path storage sia da URL pubblico (righe vecchie) sia da path nudo.
export function docPath(stored: string) {
  return stored.includes('/documenti/')
    ? stored.split('/documenti/')[1]
    : stored
}

// Ottiene un signed URL temporaneo via endpoint serverless e apre il documento.
// La finestra viene aperta sincronicamente nel gesto utente per evitare il
// blocco popup, poi reindirizzata all'URL firmato.
export async function openDocumento(documentoId: string, azione?: string) {
  const w = window.open('', '_blank')
  try {
    const { data: { session } } = await supabase.auth.getSession()
    const res = await fetch('/api/document-url', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session?.access_token ?? ''}`,
      },
      body: JSON.stringify({ documento_id: documentoId, azione }),
    })
    if (!res.ok) {
      const { error } = await res.json().catch(() => ({ error: 'Errore' }))
      throw new Error(error || 'Impossibile aprire il documento')
    }
    const { url } = await res.json()
    if (w) w.location.href = url
    else window.open(url, '_blank')
  } catch (e) {
    if (w) w.close()
    throw e
  }
}

// Soft-delete lato cliente: marca il documento come rimosso dal cliente
// (resta visibile all'ufficio). Mutazione eseguita server-side col service-role.
export async function softDeleteDocumento(documentoId: string) {
  const { data: { session } } = await supabase.auth.getSession()
  const res = await fetch('/api/document-soft-delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.access_token ?? ''}`,
    },
    body: JSON.stringify({ documento_id: documentoId }),
  })
  if (!res.ok) {
    const { error } = await res.json().catch(() => ({ error: 'Errore' }))
    throw new Error(error || 'Impossibile rimuovere il documento')
  }
}

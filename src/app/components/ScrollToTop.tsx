import { useEffect } from 'react'
import { useLocation } from 'react-router'

/**
 * Al cambio di route (pathname o hash):
 *  - se la URL ha un hash (es. #nuove-costruzioni), scrolla alla sezione
 *    corrispondente (identificata da id). scroll-mt-* nelle section
 *    gestisce l'offset per la navbar sticky.
 *  - altrimenti porta lo scroll al top (invece di preservarlo come fa
 *    di default React Router nelle SPA).
 */
export function ScrollToTop() {
  const { pathname, hash } = useLocation()

  useEffect(() => {
    if (hash) {
      const id = hash.slice(1)
      const scrollToEl = () => {
        const el = document.getElementById(id)
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' })
          return true
        }
        return false
      }
      // Prova subito; se il DOM non e' ancora pronto (componente appena
      // montato a cambio route), riprova dopo due frame.
      if (!scrollToEl()) {
        requestAnimationFrame(() => requestAnimationFrame(scrollToEl))
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior })
    }
  }, [pathname, hash])

  return null
}

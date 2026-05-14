import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase.ts";

export default function App() {
  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'PASSWORD_RECOVERY') {
        window.location.href = '/set-password'
      }
      if (event === 'SIGNED_IN') {
        if (session?.user?.user_metadata?.password_set === false) {
          if (window.location.pathname !== '/set-password') {
            window.location.href = '/set-password'
          }
        }
      }
      // Sessione con utente eliminato da Supabase → sign-out automatico
      if (event === 'TOKEN_REFRESHED' && !session) {
        await supabase.auth.signOut()
        window.location.href = '/'
      }
    })
  }, [])

  return <RouterProvider router={router} />;
}
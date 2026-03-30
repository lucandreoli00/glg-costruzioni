import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase.ts";

export default function App() {
  useEffect(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      window.location.href = '/set-password'
    }
    if (event === 'USER_UPDATED') {
      window.location.href = '/login'
    }
    if (event === 'SIGNED_IN' && session?.user) {
      // controlla se l'utente non ha ancora una password impostata
      // gli utenti invitati hanno confirmed_at ma non hanno mai fatto login con password
      const isInvitedUser = session.user.app_metadata?.provider === 'email' && 
        !session.user.user_metadata?.password_set
      
      if (isInvitedUser) {
        window.location.href = '/set-password'
      }
    }
  })
}, [])

  return <RouterProvider router={router} />;
}
import { RouterProvider } from "react-router";
import { router } from "./routes";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase.ts";

export default function App() {
  useEffect(() => {
  supabase.auth.onAuthStateChange((event) => {
    if (event === 'PASSWORD_RECOVERY') {
      window.location.href = '/set-password'
    }
    if (event === 'SIGNED_IN') {
      // controlla se è un invito (primo accesso)
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user && !session.user.last_sign_in_at) {
          window.location.href = '/set-password'
        }
      })
    }
  })
}, [])

  return <RouterProvider router={router} />;
}
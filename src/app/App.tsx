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
      if (
        event === 'SIGNED_IN' &&
        session?.user?.user_metadata?.password_set === false &&
        window.location.pathname !== '/set-password'
      ) {
        window.location.href = '/set-password'
      }
    })
  }, [])

  return <RouterProvider router={router} />;
}
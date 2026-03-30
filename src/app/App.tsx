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
    })
  }, [])

  return <RouterProvider router={router} />;
}
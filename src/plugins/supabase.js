import { createClient } from "@supabase/supabase-js";
const url = import.meta.env.VITE_SUPABASE_URL;
const annonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const options = {
  autoRefreshToken: true,
  persistSession: true,
  detectSessionInUrl: true,
};
const supabase = createClient(url, annonKey, options);
export default supabase;

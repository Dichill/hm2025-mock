import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://demo.supabase.co";
const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "demo-anon-key";

if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
    console.warn(
        "Supabase env vars are missing. Using demo placeholder values."
    );
}

const supabase = createClient(
    supabaseUrl,
    supabaseAnonKey
);

export default supabase;

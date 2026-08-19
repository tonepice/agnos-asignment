import { createClient, SupabaseClient } from '@supabase/supabase-js';

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  '';

let supabaseClient: SupabaseClient | null = null;

// Initialize Supabase Client only when a valid non-placeholder URL and key are provided
if (
  SUPABASE_URL &&
  SUPABASE_KEY &&
  !SUPABASE_URL.includes('xxxxx') &&
  !SUPABASE_KEY.includes('xxxxx')
) {
  try {
    supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);
  } catch (error) {
    console.warn('[Supabase] Initialization warning:', error);
  }
}

export const supabase = supabaseClient;

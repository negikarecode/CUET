import { createClient } from '@supabase/supabase-js';

const rawUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const rawAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isValidUrl = (url?: string): boolean => {
  if (!url || url === 'your_supabase_url') return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

const supabaseUrl = isValidUrl(rawUrl) ? rawUrl! : 'https://demo-cuet-supabase.supabase.co';
const supabaseAnonKey = rawAnonKey && rawAnonKey !== 'your_supabase_anon_key' ? rawAnonKey : 'demo-anon-key-valid-string';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export function getServiceSupabase() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  const validServiceKey = serviceKey && serviceKey !== 'your_service_role_key' ? serviceKey : supabaseAnonKey;
  return createClient(supabaseUrl, validServiceKey);
}

export const isSupabaseConfigured = () => {
  return isValidUrl(process.env.NEXT_PUBLIC_SUPABASE_URL);
};

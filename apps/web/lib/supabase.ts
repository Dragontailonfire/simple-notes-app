import { createClient } from '@supabase/supabase-js';
import { Database } from '@template/types/src/supabase.js';

export const supabase = createClient<Database>(
    (import.meta as any).env.VITE_SUPABASE_URL,
    (import.meta as any).env.VITE_SUPABASE_ANON_KEY
);

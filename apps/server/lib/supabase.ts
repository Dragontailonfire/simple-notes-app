import { createClient } from "@supabase/supabase-js";
import { Database } from "@template/types/src/supabase";

export const getSupabase = (c: any) => {
    const authHeader = c.req.header("Authorization");
    return createClient<Database>(
        process.env.SUPABASE_URL!,
        process.env.SUPABASE_ANON_KEY!,
        { global: { headers: { Authorization: authHeader } } },
    );
};

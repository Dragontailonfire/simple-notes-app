import { getSupabase } from "../../lib/supabase";
import { createMiddleware } from "hono/factory";

export const messageMiddleware = createMiddleware(async (c, next) => {
    await next();
    c.res.headers.set("X-Message", "Good morning!");
});

export const authMiddleware = createMiddleware(async (c, next) => {
    const supabase = getSupabase(c);
    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
        return c.json(
            { error: authError?.message },
            (authError?.status as any) || 401,
        );
    } else {
        c.set("userId", user.id);
        return await next();
    }
});

export type Variables = {
    userId: string;
};

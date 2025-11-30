import { Hono } from "hono";
import "dotenv/config";
import { serve } from "@hono/node-server";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { createClient } from "@supabase/supabase-js";
import z from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono().basePath("/api");

app.use("*", secureHeaders());
app.use("*", cors());

const getSupabase = (c: any) => {
  const authHeader = c.req.headers.get("Authorization");
  return createClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    { global: { headers: { Authorization: authHeader } } }
  );
};

const noteSchema = z.object({
  content: z
    .string()
    .min(1)
    .max(500)
    .transform((val) => val.trim()),
});

app.get("/notes", async (c) => {
  const supabase = getSupabase(c);

  const { data, error } = await supabase
    .from("notes")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json(data);
});

app.post("/notes", zValidator("json", noteSchema), async (c) => {
  const content = c.req.valid("json");
  const supabase = getSupabase(c);

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();
  if (authError || !user) {
    return c.json({ error: "Unauthorized" }, 401);
  }

  const { data, error } = await supabase
    .from("notes")
    .insert({
      content,
      user_id: user.id,
    })
    .select();

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  return c.json(data);
});

const port = parseInt(process.env.PORT || "4000");
console.log(`Server running on http://localhost:${port}`);

serve({ fetch: app.fetch, port });

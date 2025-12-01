import { Hono } from "hono";
import "dotenv/config";
import { serve } from "@hono/node-server";
import { secureHeaders } from "hono/secure-headers";
import { cors } from "hono/cors";
import { getSupabase } from "../lib/supabase";
import z from "zod";
import { zValidator } from "@hono/zod-validator";

const app = new Hono().basePath("/api");

app.use("*", secureHeaders());
app.use("*", cors());

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
  const content = c.req.valid("json").content;
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

app.delete("/notes/:id", async (c) => {
  const idParam = c.req.param("id");
  const id = parseInt(idParam, 10);
  if (Number.isNaN(id)) {
    return c.json({ error: "Invalid id" }, 400);
  }

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
    .delete()
    .eq("id", id)
    .eq("user_id", user.id)
    .select();

  if (error) {
    return c.json({ error: error.message }, 500);
  }

  if (!data || data.length === 0) {
    return c.json({ error: "Not found" }, 404);
  }

  return c.json(data[0]);
});

if (process.env.CI === "dev") {
  const port = parseInt(process.env.PORT || "4000");
  console.log(`Server running on http://localhost:${port}`);
  serve({ fetch: app.fetch, port });
}

export default app;

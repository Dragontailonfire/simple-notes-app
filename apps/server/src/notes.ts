import { Hono } from "hono";
import { getSupabase } from "../lib/supabase";
import z from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "./db/connect";
import { notes } from "./db/schema";
import { eq, desc, and } from "drizzle-orm";

const noteSchema = z.object({
    title: z
        .string()
        .min(1)
        .max(100)
        .transform((val) => val.trim()),
    content: z
        .string()
        .min(1)
        .max(1000)
        .transform((val) => val.trim()),
});

const app = new Hono();

app.get("/", async (c) => {
    const supabase = getSupabase(c);

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
        return c.json({ error: authError?.message }, authError?.status as any || 401);
    }

    try {
        const result = await db.select()
            .from(notes)
            .where(eq(notes.userId, user.id))
            .orderBy(desc(notes.createdAt));

        return c.json(result);
    }
    catch (error) {
        console.error(`GET - ${error}`);
        return c.json({ error: "Unable to fetch notes!" }, 500);
    }

});

app.post("/", zValidator("json", noteSchema), async (c) => {
    const { content, title } = c.req.valid("json");
    const supabase = getSupabase(c);

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
        return c.json({ error: authError?.message }, authError?.status as any || 401);
    }

    const note: typeof notes.$inferInsert = {
        title: title,
        content: content,
        userId: user.id
    };

    try {
        const result = await db.insert(notes).values(note).returning();
        return c.json(result);
    }
    catch (error) {
        console.error(`GET - ${error}`);
        return c.json({ error: "Unable to add new note!" }, 500);
    }
});

app.patch("/:id", zValidator("json", noteSchema), async (c) => {
    const idParam = c.req.param("id");
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
        return c.json({ error: "Invalid id" }, 400);
    }
    const { content, title } = c.req.valid("json");
    const supabase = getSupabase(c);

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
        return c.json({ error: authError?.message }, authError?.status as any || 401);
    }

    try {
        const result = await db
            .update(notes)
            .set({ content: content, title: title })
            .where(and(eq(notes.userId, user.id), eq(notes.id, id)))
            .returning();
        return c.json(result);
    }
    catch (error) {
        console.error(`GET - ${error}`);
        return c.json({ error: "Unable to edit the note!" }, 500);
    }
});

app.delete("/:id", async (c) => {
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
        return c.json({ error: authError?.message }, authError?.status as any || 401);
    }

    try {
        const result = await db
            .delete(notes)
            .where(and(eq(notes.userId, user.id), eq(notes.id, id)))
            .returning();
        return c.json(result);
    }
    catch (error) {
        console.error(`GET - ${error}`);
        return c.json({ error: "Unable to delete the note!" }, 500);
    }
});

export default app;
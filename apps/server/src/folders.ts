import { Hono } from "hono";
import { getSupabase } from "../lib/supabase";
import { db } from "./db/connect";
import { folders } from "./db/schema/folders";
import { eq, desc, and } from "drizzle-orm";
import z from "zod";
import { zValidator } from "@hono/zod-validator";

const folderSchema = z.object({
    name: z
        .string()
        .min(1)
        .max(100)
        .transform((val) => val.trim()),
    parentId: z
        .number()
        .nullable()
        .optional()
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
            .from(folders)
            .where(eq(folders.userId, user.id))
            .orderBy(desc(folders.createdAt));

        return c.json(result);
    }
    catch (error) {
        console.error(`GET folders- ${error}`);
        return c.json({ error: "Unable to fetch folders!" }, 500);
    }
})

app.post("/", zValidator("json", folderSchema), async (c) => {
    const { name, parentId } = c.req.valid("json");
    const supabase = getSupabase(c);

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser();
    if (authError || !user) {
        return c.json({ error: authError?.message }, authError?.status as any || 401);
    }

    const folder: typeof folders.$inferInsert = {
        name: name,
        parentId: parentId,
        userId: user.id
    };

    try {
        const result = await db.insert(folders).values(folder).returning();
        return c.json(result);
    }
    catch (error) {
        console.error(`POST folders - ${error}`);
        return c.json({ error: "Unable to add new folder!" }, 500);
    }
});

app.patch("/:id", zValidator("json", folderSchema), async (c) => {
    const idParam = c.req.param("id");
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
        return c.json({ error: "Invalid id" }, 400);
    }
    const { name, parentId } = c.req.valid("json");
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
            .update(folders)
            .set({ name: name, parentId: parentId })
            .where(and(eq(folders.userId, user.id), eq(folders.id, id)))
            .returning();
        return c.json(result);
    }
    catch (error) {
        console.error(`PATCH folders - ${error}`);
        return c.json({ error: "Unable to edit the folder!" }, 500);
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
            .delete(folders)
            .where(and(eq(folders.userId, user.id), eq(folders.id, id)))
            .returning();
        return c.json(result);
    }
    catch (error) {
        console.error(`DELETE folders - ${error}`);
        return c.json({ error: "Unable to delete the folder!" }, 500);
    }
});

export default app;
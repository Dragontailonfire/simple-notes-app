import { Hono } from "hono";
import z from "zod";
import { zValidator } from "@hono/zod-validator";
import { db } from "./db/connect";
import { notes } from "./db/schema/notes";
import { eq, desc, and } from "drizzle-orm";
import { folders } from "./db/schema/folders";
import { Variables } from "./middleware/auth";

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
    folderId: z.number(),
});

const app = new Hono<{ Variables: Variables }>();

app.get("/", async (c) => {
    const result = await db
        .select({
            id: notes.id,
            userId: notes.userId,
            content: notes.content,
            createdAt: notes.createdAt,
            updatedAt: notes.updatedAt,
            title: notes.title,
            folderDetails: { id: folders.id, name: folders.name },
        })
        .from(notes)
        .where(eq(notes.userId, c.get("userId")))
        .orderBy(desc(notes.createdAt))
        .innerJoin(folders, eq(notes.folderId, folders.id));
    return c.json(result);
});

app.post("/", zValidator("json", noteSchema), async (c) => {
    const { content, title, folderId } = c.req.valid("json");

    const note: typeof notes.$inferInsert = {
        title: title,
        content: content,
        userId: c.get("userId"),
        folderId: folderId,
    };
    const result = await db.insert(notes).values(note).returning();
    return c.json(result);
});

app.patch("/:id", zValidator("json", noteSchema), async (c) => {
    const idParam = c.req.param("id");
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
        return c.json({ error: "Invalid id" }, 400);
    }
    const { content, title, folderId } = c.req.valid("json");
    const result = await db
        .update(notes)
        .set({ content: content, title: title, folderId: folderId })
        .where(and(eq(notes.userId, c.get("userId")), eq(notes.id, id)))
        .returning();
    return c.json(result);
});

app.delete("/:id", async (c) => {
    const idParam = c.req.param("id");
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
        return c.json({ error: "Invalid id" }, 400);
    }
    const result = await db
        .delete(notes)
        .where(and(eq(notes.userId, c.get("userId")), eq(notes.id, id)))
        .returning();
    return c.json(result);
});

export default app;

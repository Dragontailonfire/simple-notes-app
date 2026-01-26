import { Hono } from "hono";
import { db } from "./db/connect";
import { folders } from "./db/schema/folders";
import { eq, desc, and } from "drizzle-orm";
import z from "zod";
import { zValidator } from "@hono/zod-validator";
import { Variables } from "./middleware/auth";

const folderSchema = z.object({
    name: z
        .string()
        .min(1)
        .max(100)
        .transform((val) => val.trim()),
    parentId: z.number().nullable().optional(),
});

const app = new Hono<{ Variables: Variables }>();

app.get("/", async (c) => {
    const result = await db
        .select()
        .from(folders)
        .where(eq(folders.userId, c.get("userId")))
        .orderBy(desc(folders.createdAt));

    return c.json(result);
});

app.post("/", zValidator("json", folderSchema), async (c) => {
    const { name, parentId } = c.req.valid("json");

    const folder: typeof folders.$inferInsert = {
        name: name,
        parentId: parentId,
        userId: c.get("userId"),
    };

    const result = await db.insert(folders).values(folder).returning();
    return c.json(result);
});

app.patch("/:id", zValidator("json", folderSchema), async (c) => {
    const idParam = c.req.param("id");
    const id = parseInt(idParam, 10);
    if (Number.isNaN(id)) {
        return c.json({ error: "Invalid id" }, 400);
    }
    const { name, parentId } = c.req.valid("json");
    const result = await db
        .update(folders)
        .set({ name: name, parentId: parentId })
        .where(and(eq(folders.userId, c.get("userId")), eq(folders.id, id)))
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
        .delete(folders)
        .where(and(eq(folders.userId, c.get("userId")), eq(folders.id, id)))
        .returning();
    return c.json(result);
});

export default app;

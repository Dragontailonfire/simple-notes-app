import { pgTable, foreignKey, pgPolicy, bigint, uuid, text, timestamp, pgSchema } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

const authSchema = pgSchema('auth');

export const users = authSchema.table('users', {
    id: uuid('id').primaryKey(),
});

export const notes = pgTable("notes", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "notes_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 922337203685477, cache: 1 }),
    userId: uuid("user_id").notNull(),
    content: text().notNull(),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
    title: text(),
}, (table) => [
    foreignKey({
        columns: [table.userId],
        foreignColumns: [users.id],
        name: "notes_user_id_fkey"
    }),
    pgPolicy("Individuals can create their own notes.", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`(auth.uid() = user_id)` }),
    pgPolicy("Individuals can delete their own notes.", { as: "permissive", for: "delete", to: ["public"] }),
    pgPolicy("Individuals can update their own notes.", { as: "permissive", for: "update", to: ["public"] }),
    pgPolicy("Individuals can view their own notes.", { as: "permissive", for: "select", to: ["public"] }),
]);

import { pgTable, foreignKey, pgPolicy, bigint, uuid, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"

export const users = pgTable('users', {
    id: uuid('id').primaryKey(),
    fullName: text('full_name'),
    phone: varchar('phone', { length: 256 }),
});

export const notes = pgTable("notes", {
    // You can use { mode: "bigint" } if numbers are exceeding js number limitations
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "notes_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 9223372036854775807, cache: 1 }),
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

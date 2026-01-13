import { pgTable, foreignKey, pgPolicy, bigint, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { users } from "./users";

export const folders = pgTable("folders", {
    id: bigint({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({ name: "folders_id_seq", startWith: 1, increment: 1, minValue: 1, maxValue: 922337203685477, cache: 1 }),
    userId: uuid("user_id").notNull(),
    name: text().notNull(),
    parentId: bigint("parent_id", { mode: "number" }),
    createdAt: timestamp("created_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true, mode: 'string' }).default(sql`timezone('utc'::text, now())`).notNull(),
}, (table) => [
    foreignKey({
        columns: [table.userId],
        foreignColumns: [users.id],
        name: "folders_user_id_fkey"
    }).onDelete("cascade"),
    foreignKey({
        columns: [table.parentId],
        foreignColumns: [table.id],
        name: "folders_parent_id_fkey"
    }).onDelete("cascade"),
    pgPolicy("Individuals can create their own folders.", { as: "permissive", for: "insert", to: ["public"], withCheck: sql`(auth.uid() = user_id)` }),
    pgPolicy("Individuals can delete their own folders.", { as: "permissive", for: "delete", to: ["public"], using: sql`(auth.uid() = user_id)` }),
    pgPolicy("Individuals can update their own folders.", { as: "permissive", for: "update", to: ["public"], using: sql`(auth.uid() = user_id)` }),
    pgPolicy("Individuals can view their own folders.", { as: "permissive", for: "select", to: ["public"], using: sql`(auth.uid() = user_id)` }),
]);

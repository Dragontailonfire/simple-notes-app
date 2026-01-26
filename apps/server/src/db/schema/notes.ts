import {
    pgTable,
    foreignKey,
    pgPolicy,
    bigint,
    uuid,
    text,
    timestamp,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./users";
import { folders } from "./folders";

export const notes = pgTable(
    "notes",
    {
        // You can use { mode: "bigint" } if numbers are exceeding js number limitations
        id: bigint({ mode: "number" })
            .primaryKey()
            .generatedByDefaultAsIdentity({
                name: "notes_id_seq",
                startWith: 1,
                increment: 1,
                minValue: 1,
                maxValue: 922337203685477,
                cache: 1,
            }),
        userId: uuid("user_id").notNull(),
        content: text().notNull(),
        folderId: bigint("folder_id", { mode: "number" }).notNull(),
        createdAt: timestamp("created_at", {
            withTimezone: true,
            mode: "string",
        })
            .default(sql`timezone('utc'::text, now())`)
            .notNull(),
        updatedAt: timestamp("updated_at", {
            withTimezone: true,
            mode: "string",
        })
            .default(sql`timezone('utc'::text, now())`)
            .notNull(),
        title: text().notNull(),
    },
    (table) => [
        foreignKey({
            columns: [table.userId],
            foreignColumns: [users.id],
            name: "notes_user_id_fkey",
        }).onDelete("cascade"),
        foreignKey({
            columns: [table.folderId],
            foreignColumns: [folders.id],
            name: "notes_folder_id_fkey",
        }).onDelete("cascade"),
        pgPolicy("Individuals can create their own notes.", {
            as: "permissive",
            for: "insert",
            to: ["public"],
            withCheck: sql`(auth.uid() = user_id)`,
        }),
        pgPolicy("Individuals can delete their own notes.", {
            as: "permissive",
            for: "delete",
            to: ["public"],
            using: sql`(auth.uid() = user_id)`,
        }),
        pgPolicy("Individuals can update their own notes.", {
            as: "permissive",
            for: "update",
            to: ["public"],
            using: sql`(auth.uid() = user_id)`,
        }),
        pgPolicy("Individuals can view their own notes.", {
            as: "permissive",
            for: "select",
            to: ["public"],
            using: sql`(auth.uid() = user_id)`,
        }),
    ],
);

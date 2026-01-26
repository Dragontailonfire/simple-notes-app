import { relations } from "drizzle-orm/relations";
import { notes } from "./schema/notes";
import { users } from "./schema/users";

export const notesRelations = relations(notes, ({ one }) => ({
    users: one(users, {
        fields: [notes.userId],
        references: [users.id],
    }),
}));

export const usersInAuthRelations = relations(users, ({ many }) => ({
    notes: many(notes),
}));

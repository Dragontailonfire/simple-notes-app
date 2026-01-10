import { relations } from "drizzle-orm/relations";
import { users, notes } from "./schema";

export const notesRelations = relations(notes, ({one}) => ({
	users: one(users, {
		fields: [notes.userId],
		references: [users.id]
	}),
}));

export const usersInAuthRelations = relations(users, ({many}) => ({
	notes: many(notes),
}));
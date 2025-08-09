import { pgTable, text, uuid, varchar, timestamp } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model";

export const blogkModel = pgTable("blogs", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({length: 255}).notNull(),
    content: text(),
    owner: uuid().references(() => usersTable.id).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
})
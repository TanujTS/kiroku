import { pgTable, text, uuid, varchar, timestamp, index } from "drizzle-orm/pg-core";
import { usersTable } from "./user.model";
import { sql } from "drizzle-orm";

export const blogModel = pgTable("blogs", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({length: 255}).notNull(),
    content: text(),
    owner: uuid().references(() => usersTable.id).notNull(),
    createdAt: timestamp().defaultNow().notNull(),
    updatedAt: timestamp().defaultNow().notNull(),
}, (table) => [
    index('blog_search_index').using('gin', sql`to_tsvector('english', ${table.title})`),
]) 
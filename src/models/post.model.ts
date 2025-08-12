import { pgTable, text, uuid, varchar, timestamp, index, pgEnum } from "drizzle-orm/pg-core";
import { Users } from "./user.model";
import { sql } from "drizzle-orm";

export const visibilityEnums = pgEnum("visibility", ["public", "private", "unlisted"])

export const Posts = pgTable("posts", {
    id: uuid().defaultRandom().primaryKey(),
    author_id: uuid().references(() => Users.id, {onDelete: 'cascade'}).notNull(),
    title: varchar({length: 255}).notNull(),
    content: text().notNull(),
    visibility: visibilityEnums().default("public"),
    link_token: text().unique(),
    created_at: timestamp().defaultNow(),
    updated_at: timestamp().defaultNow()

}, (table) => [
    index('blog_search_index').using('gin', sql`to_tsvector('english', ${table.title})`),
]) 
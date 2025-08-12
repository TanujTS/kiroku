import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { Posts } from "./post.model";


export const PostVersions = pgTable("post_versions", {
    id: uuid().defaultRandom().primaryKey(),
    post_id: uuid().references(() => Posts.id, {onDelete: 'cascade'}).notNull(),
    title: varchar({length: 255}).notNull(),
    content: text().notNull(),
    created_at: timestamp().defaultNow(),
})
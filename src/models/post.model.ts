import { pgTable, uuid, varchar, text, timestamp, index, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { users } from "./user.model";

export const visibilityEnums = pgEnum("visibility", ["public", "private", "unlisted"]);

export const Posts = pgTable(
  "posts",
  {
    id: uuid().defaultRandom().primaryKey(),
    author_id: text().references(() => users.id, { onDelete: "cascade" }).notNull(),
    title: varchar({ length: 255 }).notNull(),
    content: text().notNull(),
    visibility: visibilityEnums().default("public").notNull(),
    link_token: text().unique(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().notNull(),
  },
  (table) => [
    index("posts_title_gin").using("gin", sql`to_tsvector('english', ${table.title})`),
  ]
);

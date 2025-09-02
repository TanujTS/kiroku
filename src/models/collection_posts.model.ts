import { index, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { Collections } from "./collection.model";
import { users } from "./user.model";
import { Posts } from "./post.model";

export const CollectionPosts = pgTable(
  "collection_posts",
  {
    owner_id: text().references(() => users.id, { onDelete: "cascade" }).notNull(),
    collection_id: uuid().references(() => Collections.id, { onDelete: "cascade" }).notNull(),
    post_id: uuid().references(() => Posts.id, { onDelete: "cascade" }).notNull(),
  },
  (table) => [
    index("collection_posts_unique").on(table.collection_id, table.post_id),
  ]
);

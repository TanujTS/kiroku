import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { Collections } from "./collection.model";
import { Users } from "./user.model";
import { Posts } from "./post.model";

export const CollectionPosts = pgTable("collection_posts", {
    owner_id: uuid().references(() => Users.id, {onDelete: "cascade"}),
    collection_id: uuid().references(() => Collections.id, {onDelete: "cascade"}),
    post_id: uuid().references(() => Posts.id, {onDelete: "cascade"})
})
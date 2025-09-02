import { pgTable, uuid, varchar, text, timestamp } from "drizzle-orm/pg-core";
import { users } from "./user.model";

export const Collections = pgTable("collections", {
  id: uuid().defaultRandom().primaryKey(),
  owner_id: text().references(() => users.id, { onDelete: "cascade" }).notNull(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
});
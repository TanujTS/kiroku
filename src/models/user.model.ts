import { sql } from "drizzle-orm";
import { integer, pgTable, varchar, uuid, index } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  name: varchar({ length: 255 }).notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
}, (table) => [
    index('index_users_search').using('gin', sql`to_tsvector('english', ${table.name})`),
]);



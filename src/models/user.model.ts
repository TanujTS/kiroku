import { sql } from "drizzle-orm";
import { pgTable, varchar, uuid, index, text, pgEnum, timestamp } from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum('user_role', ['USER', 'ADMIN']);

export const Users = pgTable("users", {
  id: uuid().primaryKey().defaultRandom(),
  username: varchar({ length: 64}).unique().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
  password: text().notNull(),
  role: userRoleEnum().notNull().default('USER'),
  created_at: timestamp().defaultNow().notNull(),
  updated_at: timestamp().defaultNow().notNull(),
}, (table) => [
    index('index_users_search').using('gin', sql`to_tsvector('english', ${table.username})`),
]);



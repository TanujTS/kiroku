import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { Users } from "./user.model";


export const Collections = pgTable("collections", {
    id: uuid().defaultRandom().primaryKey(),
    owner_id: uuid().references(() => Users.id, {onDelete: "cascade"}).notNull(),
    name: varchar({length: 255}).notNull(),
    description: text(),
    created_at: timestamp().defaultNow().notNull(),
    updated_at: timestamp().defaultNow().notNull()
})
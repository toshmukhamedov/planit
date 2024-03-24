import { integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.ts";
import { base } from "@utils/base.schema.ts";

export const groups = pgTable("groups", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 64 }).notNull(),
    image: varchar("image", { length: 256 }),
    userId: integer("user_id")
        .references(() => users.id)
        .notNull(),
    ...base,
});

export type Group = typeof groups.$inferSelect; // return type when queried
export type NewGroup = typeof groups.$inferInsert; // insert type

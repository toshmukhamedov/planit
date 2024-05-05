import { base } from "@utils/base.schema.ts";
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.ts";

export const groups = pgTable("groups", {
    name: varchar("name", { length: 64 }).notNull(),
    image: varchar("image", { length: 256 }),
    userId: integer("user_id")
        .references(() => users.id)
        .notNull(),
    ...base,
});

export type Group = typeof groups.$inferSelect; // return type when queried
export type NewGroup = typeof groups.$inferInsert; // insert type

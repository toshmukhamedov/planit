import { base } from "@utils/base.schema.ts";
import { pgTable, varchar } from "drizzle-orm/pg-core";

export const users = pgTable("users", {
    name: varchar("name", { length: 64 }).notNull(),
    surname: varchar("surname", { length: 64 }),
    image: varchar("image", { length: 256 }),
    email: varchar("email", { length: 64 }).unique().notNull(),
    ...base,
});

export type User = typeof users.$inferSelect; // return type when queried
export type NewUser = typeof users.$inferInsert; // insert type

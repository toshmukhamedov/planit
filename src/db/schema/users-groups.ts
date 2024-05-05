import { base } from "@utils/base.schema.ts";
import { integer, pgTable } from "drizzle-orm/pg-core";
import { groups } from "./groups.ts";
import { users } from "./users.ts";

export const usersGroups = pgTable("users_groups", {
    userId: integer("user_id")
        .references(() => users.id)
        .notNull(),
    groupId: integer("group_id")
        .references(() => groups.id)
        .notNull(),
    ...base,
});

export type UserGroup = typeof usersGroups.$inferSelect;
export type NewUserGroup = typeof usersGroups.$inferInsert;

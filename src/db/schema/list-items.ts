import { ListItemStatus } from "@src/utils/enums.ts";
import { base } from "@utils/base.schema.ts";
import { integer, pgEnum, pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { groups } from "./groups.ts";
import { users } from "./users.ts";

export const statusEnum = pgEnum("status", [ListItemStatus.Bought, ListItemStatus.Actual, ListItemStatus.Future]);

export const listItems = pgTable("list_items", {
    id: serial("id").primaryKey(),
    name: varchar("name", { length: 256 }).notNull(),
    desc: text("desc"),
    image: varchar("image", { length: 256 }),
    groupId: integer("group_id")
        .references(() => groups.id)
        .notNull(),
    status: statusEnum("status").notNull(),
    createdBy: integer("created_by")
        .references(() => users.id)
        .notNull(),
    updatedBy: integer("updated_by").references(() => users.id),
    ...base,
});

import { serial, timestamp } from "drizzle-orm/pg-core";

export const base = {
    id: serial("id").primaryKey(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
    deletedAt: timestamp("deleted_at"),
};

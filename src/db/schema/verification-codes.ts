import { base } from "@utils/base.schema.ts";
import { boolean, integer, pgTable, serial, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.ts";

export const verificationCodes = pgTable("verification_codes", {
    id: serial("id").primaryKey(),
    userId: integer("user_id")
        .references(() => users.id),
    code: varchar("code", { length: 6 }).notNull(),
    email: varchar("email", { length: 64 }).notNull(),
    isVerified: boolean("is_verified").default(false).notNull(),
    ...base,
});

export type VerificationCode = typeof verificationCodes.$inferSelect;
export type NewVerificationCode = typeof verificationCodes.$inferInsert;

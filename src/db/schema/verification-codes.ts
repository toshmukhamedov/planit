import { base } from "@utils/base.schema.ts";
import { timestamp, integer, pgTable, varchar } from "drizzle-orm/pg-core";
import { users } from "./users.ts";

export const verificationCodes = pgTable("verification_codes", {
    userId: integer("user_id")
        .references(() => users.id),
    code: integer("code").notNull(),
    email: varchar("email", { length: 64 }).notNull(),
    verifiedAt: timestamp("verified_at"),
    ...base,
});

export type VerificationCode = typeof verificationCodes.$inferSelect;
export type NewVerificationCode = typeof verificationCodes.$inferInsert;

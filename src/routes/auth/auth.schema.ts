import type { FastifySchema } from "fastify";
import { z } from "zod";
import { Type, type Static } from "@sinclair/typebox";

const baseSchema = {
    tags: ["auth"],
} satisfies FastifySchema;

// INFO: /auth
// const authBody = z.object({
//     email: z.string().email(),
//     code: z.string().min(6).max(6),
// });
const authBody = Type.Object({
    email: Type.String({ format: "email" }),
    code: Type.String({ minLength: 6, maxLength: 6 }),
});
export type AuthBody = Static<typeof authBody>;
export const authSchema = {
    body: authBody,
    ...baseSchema,
} satisfies FastifySchema;

// INFO: /auth/send-code
const sendVerificationCodeBody = z.object({
    email: z.string().email(),
});
export type SendVerificationCodeBody = z.infer<typeof sendVerificationCodeBody>;
export const sendVerificationCodeSchema = {
    body: sendVerificationCodeBody,
    ...baseSchema,
} satisfies FastifySchema;

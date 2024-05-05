import type { FastifySchema } from "fastify";
import { Type, type Static } from "@sinclair/typebox";

const baseSchema = {
    tags: ["auth"],
} satisfies FastifySchema;

/* 
 * INFO: /auth
 */
const authBody = Type.Object({
    email: Type.String({ format: "email" }),
    code: Type.Number({ minimum: 100000, maximum: 999999 }),
});
export const authSchema = {
    body: authBody,
    ...baseSchema,
} satisfies FastifySchema;
export type AuthSchema = typeof authSchema;
export type AuthBody = Static<typeof authBody>;

/* 
 * INFO: /auth/verification/code
 */
const sendVerificationCodeBody = Type.Object({
    email: Type.String({ format: "email" }),
});
export const sendOtpSchema = {
    body: sendVerificationCodeBody,
    ...baseSchema,
} satisfies FastifySchema;
export type SendVerificationCodeSchema = typeof sendOtpSchema;
export type SendVerificationCodeBody = Static<typeof sendVerificationCodeBody>;

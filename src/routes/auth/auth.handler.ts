import { db } from "@src/db/client.ts";
import { users } from "@src/db/schema/users.ts";
import * as sql from "drizzle-orm/sql";
import type { FastifyReply, FastifyRequest } from "fastify";
import type { AuthBody, SendVerificationCodeBody } from "./auth.schema.ts";
import type { TokenPayload } from "./types.ts";
import { generateCode, isValidEmail } from "@src/utils/helpers.ts";
import { verificationCodes } from "@src/db/schema/verification-codes.ts";
import { sendEmail } from "@src/integrations/aws-ses.ts";

export async function authHandler(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as AuthBody;

    const [verificationCode] = await db
        .select()
        .from(verificationCodes)
        .where(
            sql.and(
                sql.eq(verificationCodes.email, body.email),
                sql.eq(verificationCodes.code, body.code),
                sql.eq(verificationCodes.isVerified, false),
                sql.gt(verificationCodes.createdAt, sql.sql`now() - interval '2 minutes'`),
            ),
        );

    if (!verificationCode) {
        return reply.code(200).send({ message: "Invalid code" });
    }

    const [user] = await db
        .insert(users)
        .values({
            email: body.email,
        })
        .returning({
            id: users.id,
        })
        .onConflictDoNothing({ target: users.email });

    await db.update(verificationCodes).set({
        isVerified: true,
        userId: user.id,
    });

    const payload: Partial<TokenPayload> = {
        id: user.id,
        email: body.email,
    };

    const token = await reply.jwtSign(payload);

    reply.code(200).send({ data: token });
}

export async function sendVerificationCodeHandler(request: FastifyRequest, reply: FastifyReply) {
    const body = request.body as SendVerificationCodeBody;

    // TODO: Do it in schema validation layer
    if (!isValidEmail(body.email)) {
        return reply.code(400).send({ message: "Invalid email", data: null });
    }
    const [verificationCode] = await db
        .select()
        .from(verificationCodes)
        .where(
            sql.and(
                sql.eq(verificationCodes.email, body.email),
                sql.eq(verificationCodes.isVerified, false),
                sql.gt(verificationCodes.createdAt, sql.sql`now() - interval '2 minutes'`),
            ),
        );

    if (verificationCode) {
        return reply.code(409).send({ message: "Verification code already sent", data: null });
    }

    const code = generateCode();

    await sendEmail({
        text: code,
        address: body.email,
    });

    await db.insert(verificationCodes).values({
        email: body.email,
        code,
    });

    reply.code(200).send({ data: null, error: null });
}

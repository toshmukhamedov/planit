import { db } from "@src/db/client.ts";
import { users } from "@src/db/schema/users.ts";
import * as sql from "drizzle-orm/sql";
import { generateCode } from "@src/utils/helpers.ts";
import { verificationCodes } from "@src/db/schema/verification-codes.ts";
import type { FastifyReply, FastifyRequest } from "@utils/types.ts";
import type { AuthSchema, SendVerificationCodeSchema } from "./auth.schema.ts";
import type { TokenPayload } from "./types.ts";
import { EmailTemplate, HttpStatus } from "@src/utils/enums.ts";
import { emailService } from "integrations/email.service.ts";

export async function authHandler(request: FastifyRequest<AuthSchema>, reply: FastifyReply<AuthSchema>) {
    const { body } = request;

    const [verificationCode] = await db
        .select()
        .from(verificationCodes)
        .where(
            sql.and(
                sql.eq(verificationCodes.email, body.email),
                sql.eq(verificationCodes.code, body.code),
                sql.isNull(verificationCodes.verifiedAt),
                sql.gt(verificationCodes.createdAt, sql.sql`now() - interval '2 minutes'`),
            ),
        )

    if (!verificationCode) {
        return reply.code(HttpStatus.BAD_REQUEST).send({ message: "Invalid code" });
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

    await db
        .update(verificationCodes)
        .set({
            verifiedAt: sql.sql`now()`,
            userId: user.id,
        })
        .where(sql.eq(verificationCodes.id, verificationCode.id));

    const payload: Partial<TokenPayload> = {
        id: user.id,
        email: body.email,
    };

    const token = await reply.jwtSign(payload);

    reply.code(200).send({ data: token });
}

export async function sendVerificationCodeHandler(
    request: FastifyRequest<SendVerificationCodeSchema>,
    reply: FastifyReply<SendVerificationCodeSchema>,
) {
    const { body } = request;

    const [verificationCode] = await db
        .select()
        .from(verificationCodes)
        .where(
            sql.and(
                sql.eq(verificationCodes.email, body.email),
                sql.eq(verificationCodes.verifiedAt, sql.sql`null`),
                sql.gt(verificationCodes.createdAt, sql.sql`now() - interval '2 minutes'`),
            ),
        );

    if (verificationCode) {
        return reply.code(409).send({ message: "Verification code already sent", data: null });
    }

    const code = generateCode();

    await emailService.sendEmail({
        address: body.email,
        template: EmailTemplate.VerificationCode,
        templateData: { code },
    });

    await db.insert(verificationCodes).values({
        email: body.email,
        code,
    });

    reply.code(HttpStatus.CREATED).send({ data: null, error: null });
}

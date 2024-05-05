import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import type { FastifyPluginAsync } from "fastify";
import { authHandler, sendVerificationCodeHandler } from "./auth.handler.ts";
import { authSchema, sendOtpSchema } from "./auth.schema.ts";

const authRoutes: FastifyPluginAsync = async (instance) => {
    const fastify = instance.withTypeProvider<TypeBoxTypeProvider>();

    fastify.post(
        "/",
        {
            config: {
                public: true,
            },
            schema: authSchema
        },
        authHandler,
    );

    fastify.post(
        "/verification/code",
        {
            config: {
                public: true,
            },
            schema: sendOtpSchema,
        },
        sendVerificationCodeHandler,
    );
};

export default authRoutes;

import type { FastifyPluginAsync } from "fastify";
import { authHandler, sendVerificationCodeHandler } from "./auth.handler.ts";
import { authSchema, sendVerificationCodeSchema } from "./auth.schema.ts";
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'

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

    // fastify.post(
    //     "/send-code",
    //     {
    //         config: {
    //             public: true,
    //         },
    //         schema: sendVerificationCodeSchema,
    //     },
    //     sendVerificationCodeHandler,
    // );
};

export default authRoutes;

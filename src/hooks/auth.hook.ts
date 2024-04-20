import { validateBearerToken } from "@src/utils/helpers.ts";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function authHookHandler(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    // INFO: Skip public routes
    if (request.routeOptions.config.public) {
        return;
    }

    const token = validateBearerToken(request.headers.authorization);

    if (!token) {
        // TODO: Implement response model
        return reply.code(401).send({
            message: "Unauthorized",
            data: null,
        });
    }
}

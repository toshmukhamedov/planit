import type { FastifyRequest } from "fastify";

export async function authHookHandler(request: FastifyRequest): Promise<void> {
    // INFO: Skip public routes
    if (request.routeOptions.config.public) {
        return;
    }

    // TODO: better error handling
    await request.jwtVerify({});
}

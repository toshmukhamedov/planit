import type { FastifyReply, FastifyRequest } from "fastify"

export async function signIn(request: FastifyRequest, reply: FastifyReply) {
    reply.code(200).send({ hello: "world" });
}


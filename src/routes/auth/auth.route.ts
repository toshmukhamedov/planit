import type { FastifyPluginAsync } from "fastify";
import { signIn } from "./auth.handler.ts";

const authRoutes: FastifyPluginAsync = async (fastify, options) => {
    fastify.post("/sign-in", signIn);

    fastify.get("/groups", async (request, reply) => {
        reply.send({ hello: "get" });
    });
};

export default authRoutes;

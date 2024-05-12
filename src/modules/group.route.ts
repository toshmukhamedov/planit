import type { FastifyPluginAsync } from "fastify";

const groupRoutes: FastifyPluginAsync = async (fastify, options) => {
    fastify.post("/groups", async (request, reply) => {
        reply.send({ hello: "post" });
    });

    fastify.get("/groups", async (request, reply) => {
        reply.send({ hello: "get" });
    });

    fastify.get("/groups/:id", async (request, reply) => {
        reply.send({ hello: "get one" });
    });

    fastify.put("/groups", async (request, reply) => {
        reply.send({ hello: "put" });
    });

    fastify.delete("/groups", async (request, reply) => {
        reply.send({ hello: "delete" });
    });
};

export default groupRoutes;

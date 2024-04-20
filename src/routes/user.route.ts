import type { FastifyPluginAsync } from "fastify";
import {SESClient} from "@aws-sdk/client-ses";

const client = new SESClient({
    region: "us-east-1",
});

const userRoutes: FastifyPluginAsync = async (fastify) => {
    fastify.post("/users", async (request, reply) => {
        reply.send({ hello: "post" });
    });

    fastify.get("/users", async (request, reply) => {
        reply.send({ hello: "get" });
    });

    fastify.get("/users/:id", async (request, reply) => {
        reply.send({ hello: "get one" });
    });

    fastify.put("/users", async (request, reply) => {
        reply.send({ hello: "put" });
    });

    fastify.delete("/users", async (request, reply) => {
        reply.send({ hello: "delete" });
    });
};

export default userRoutes;

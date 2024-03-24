import { env } from "@config/env.ts";
import Fastify from "fastify";
import { loggerOptions } from "./config/logging.ts";

const fastify = Fastify({
    logger: loggerOptions[env.NODE_ENV],
});

// Declare a route
fastify.get("/", async (request, reply) => {
    reply.send({ hello: "world" });
});

// Run the server!
try {
    await fastify.listen({ port: env.PORT });
} catch (err) {
    console.error(err);
    process.exit(1);
}

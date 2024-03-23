import Fastify from "fastify";
import { env } from "@config/env.ts";

const fastify = Fastify({
    logger: true,
});

// Declare a route
fastify.get("/", (request, reply) => {
    reply.send({ hello: "world" });
});

// Run the server!
try {
    await fastify.listen({ port: env.PORT });
} catch (err) {
    console.error(err);
    process.exit(1);
}
    
console.info("DONE");

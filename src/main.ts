import { env } from "@config/env.ts";
import { db } from "@db/client.ts";
import Fastify from "fastify";
import { users } from "@db/schema/users.ts";

const fastify = Fastify({
    logger: true,
});

// Declare a route
fastify.get("/", async (request, reply) => {
    console.info(await db.select().from(users))
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

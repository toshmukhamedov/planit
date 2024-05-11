import { env } from "@config/env.ts";
import { loggerOptions } from "@config/logging.ts";
import { registerSwagger } from "@config/swagger.ts";
import cors from "@fastify/cors";
import helmet from "@fastify/helmet";
import jwt from "@fastify/jwt";
import Fastify from "fastify";
import { loggerOptions } from "@config/logging.ts";
import routes from "@src/modules/index.ts";
import { registerSwagger } from "@config/swagger.ts";
import { ProcessCode } from "@utils/enums.ts";
import Fastify from "fastify";

const fastify = Fastify({
    logger: loggerOptions[env.NODE_ENV],
});

// INFO: Add schema validator and serializer
// fastify.setValidatorCompiler(validatorCompiler);
// fastify.setSerializerCompiler(serializerCompiler);

await fastify.register(import("@fastify/middie"));
await fastify.register(cors);
await fastify.register(helmet);
fastify.register(jwt, {
    secret: env.JWT_SECRET,
    sign: {
        expiresIn: env.JWT_EXPIRES_IN,
    },
});

// INFO: Swagger
registerSwagger(fastify);

// Declare a route
fastify.register(routes, {
    prefix: "v1",
});

// Run the server!
try {
    await fastify.listen({ port: env.PORT });
} catch (err) {
    console.error(err);
    process.exit(ProcessCode.ERROR);
}

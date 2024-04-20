import type { FastifyInstance } from "fastify";
import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { env } from "./env.ts";
import { AppStage } from "@src/utils/enums.ts";

export async function registerSwagger(fastify: FastifyInstance) {
    if (env.NODE_ENV !== AppStage.PROD) {
        await fastify.register(swagger, {
            openapi: {
                info: {
                    title: "Shopping List API",
                    version: process.env.npm_package_version as string
                },
                components: {
                    securitySchemes: {
                        bearerAuth: {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "jwt",
                            description: "JSON Web Token"
                        },
                    },
                }
            },
        });
        await fastify.register(swaggerUI, {
            routePrefix: "docs",
            uiConfig: {
                docExpansion: "none",
                persistAuthorization: true,
            },
        });
    }
}
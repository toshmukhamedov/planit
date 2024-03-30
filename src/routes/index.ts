import type { FastifyInstance } from "fastify";
import groupRoutes from "./group.route.ts";
import listRoutes from "./list.route.ts";
import userRoutes from "./user.route.ts";
import authRoutes from "./auth/auth.route.ts";

const routes = async (fastify: FastifyInstance) => {
    await fastify.register(userRoutes);
    await fastify.register(groupRoutes);
    await fastify.register(listRoutes);
    await fastify.register(authRoutes);
};

export default routes;

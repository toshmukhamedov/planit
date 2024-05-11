import { authHookHandler } from "@hooks/auth.hook.ts";
import type { FastifyInstance } from "fastify";
import authRoutes from "./auth/auth.route.ts";
import groupRoutes from "./group.route.ts";
import todoRoutes from './todo/todo.route.ts'
import listRoutes from "./list.route.ts";
import userRoutes from "./user.route.ts";

const routes = async (fastify: FastifyInstance) => {
    // hooks
    fastify.addHook("preHandler", authHookHandler);

    await fastify.register(userRoutes);
    await fastify.register(groupRoutes);
    await fastify.register(listRoutes);
    await fastify.register(authRoutes, {
        prefix: "auth",
    });
    await fastify.register(todoRoutes, {
        prefix: "todo",
    });
};

export default routes;

import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { FastifyPluginAsync } from "fastify";
import {
    createTodoHandler,
    deleteTodoHandler,
    getTodoAllHandler,
    getTodoHandler,
    updateTodoHandler,
} from "./todo.handler.ts";
import {
    createTodoSchema,
    deleteTodoSchema,
    getTodoAllSchema,
    getTodoSchema,
    updateTodoSchema,
} from "./todo.schema.ts";

const todoRoutes: FastifyPluginAsync = async (instance) => {
    const fastify = instance.withTypeProvider<TypeBoxTypeProvider>();

    fastify.post(
        "/",
        {
            schema: createTodoSchema,
        },
        createTodoHandler,
    );

    fastify.put(
        "/:id",
        {
            schema: updateTodoSchema,
        },
        updateTodoHandler,
    );

    fastify.delete(
        "/:id",
        {
            schema: deleteTodoSchema,
        },
        deleteTodoHandler,
    );

    fastify.get(
        "/:id",
        {
            schema: getTodoSchema,
        },
        getTodoHandler,
    );

    fastify.get(
        "/groups/:groupId",
        {
            schema: getTodoAllSchema,
        },
        getTodoAllHandler,
    );
};

export default todoRoutes;

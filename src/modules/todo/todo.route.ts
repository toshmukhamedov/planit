import { FastifyPluginAsync } from "fastify";
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox'
import { createTodoSchema, deleteTodoSchema, getTodoAllSchema, getTodoSchema, updateTodoSchema } from "./todo.schema.ts";
import { createTodoHandler, updateTodoHandler, deleteTodoHandler, getTodoHandler, getTodoAllHandler } from "./todo.handler.ts";

const todoRoutes: FastifyPluginAsync = async (instance) => {
  const fastify = instance.withTypeProvider<TypeBoxTypeProvider>();

  fastify.post(
    '/', 
    {
      schema: createTodoSchema,
    },
    createTodoHandler,
  );

  fastify.put(
    '/:id',
    {
      schema: updateTodoSchema,
    },
    updateTodoHandler
  )

  fastify.delete(
    '/:id',
    {
      schema: deleteTodoSchema
    },
    deleteTodoHandler
  )

  fastify.get(
    '/:id',
    {
      schema: getTodoSchema,
    },
    getTodoHandler
  )

  fastify.get(
    '/groups/:groupId',
    {
      schema: getTodoAllSchema
    },
    getTodoAllHandler
  )
}

export default todoRoutes
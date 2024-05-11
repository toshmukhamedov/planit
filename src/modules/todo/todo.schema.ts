import { FastifySchema } from "fastify";
import { Type } from "@sinclair/typebox";
import { HttpStatus, ListItemStatus } from "@src/utils/enums.ts";

const baseSchema = {
  security: [{ bearerAuth: [] }],
  tags: ["todo"],
} satisfies FastifySchema;

const todoMain = Type.Object({
  id: Type.Number({ minimum: 1 }),
  name: Type.String({ minLength: 1, maxLength: 256 }),
  desc: Type.Optional(Type.Union([Type.Null(), Type.String({ minLength: 1, maxLength: 256 })])),
  image: Type.Optional(Type.Union([Type.Null(), Type.String({ minLength: 1, maxLength: 256 })])),
  groupId: Type.Number({ minimum: 1 }),
  status: Type.Union([Type.Literal(ListItemStatus.Actual), Type.Literal(ListItemStatus.Bought), Type.Literal(ListItemStatus.Future)]),
})
const createTodoBody = Type.Omit(todoMain, ["id"])
const updateTodoBody = Type.Omit(todoMain, ["groupId", "id"])
const todoIdParam = Type.Pick(todoMain, ["id"])
const getTodoAllBody = Type.Pick(todoMain, ["groupId"])
const getTodoResponse = todoMain
const getAllTodoResponse = Type.Array(todoMain)

export const createTodoSchema = {
  body: createTodoBody,
  response: { [HttpStatus.CREATED]: {} },
  ...baseSchema,
} satisfies FastifySchema

export const updateTodoSchema = {
  params: todoIdParam,
  body: updateTodoBody,
  response: { [HttpStatus.NO_CONTENT]: {} },
  ...baseSchema,
} satisfies FastifySchema

export const deleteTodoSchema = {
  params: todoIdParam,
  response: { [HttpStatus.NO_CONTENT]: {} },
  ...baseSchema,
} satisfies FastifySchema

export const getTodoSchema = {
  params: todoIdParam,
  response: { [HttpStatus.OK]: getTodoResponse },
  ...baseSchema,
} satisfies FastifySchema

export const getTodoAllSchema = {
  params: getTodoAllBody,
  response: { [HttpStatus.OK]: getAllTodoResponse },
  ...baseSchema,
} satisfies FastifySchema

export type CreateTodoSchema = typeof createTodoSchema
export type UpdateTodoSchema = typeof updateTodoSchema
export type DeleteTodoSchema = typeof deleteTodoSchema
export type GetTodoSchema = typeof getTodoSchema
export type GetTodoAllSchema = typeof getTodoAllSchema
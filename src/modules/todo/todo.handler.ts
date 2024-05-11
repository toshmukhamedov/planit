import { db } from "@src/db/client.ts";
import { listItems } from "@src/db/schema/list-items.ts";
import { HttpStatus } from "@src/utils/enums.ts";
import type { FastifyReply, FastifyRequest } from "@src/utils/types.ts";
import * as sql from "drizzle-orm/sql";
import type {
    CreateTodoSchema,
    DeleteTodoSchema,
    GetTodoAllSchema,
    GetTodoSchema,
    UpdateTodoSchema,
} from "./todo.schema.ts";

export async function createTodoHandler(
    request: FastifyRequest<CreateTodoSchema>,
    reply: FastifyReply<CreateTodoSchema>,
) {
    const { body, user } = request;

    await db.insert(listItems).values({
        ...body,
        createdBy: user.id,
    });

    reply.code(HttpStatus.CREATED);
}

export async function updateTodoHandler(
    request: FastifyRequest<UpdateTodoSchema>,
    reply: FastifyReply<UpdateTodoSchema>,
) {
    const { body, params } = request;

    await db.update(listItems).set(body).where(sql.eq(listItems.id, params.id));

    reply.code(HttpStatus.NO_CONTENT);
}

export async function deleteTodoHandler(
    request: FastifyRequest<DeleteTodoSchema>,
    reply: FastifyReply<DeleteTodoSchema>,
) {
    const { params } = request;

    await db.update(listItems).set({ deletedAt: sql.sql`now()` }).where(sql.eq(listItems.id, params.id));

    reply.code(HttpStatus.NO_CONTENT);
}

export async function getTodoHandler(request: FastifyRequest<GetTodoSchema>, reply: FastifyReply<GetTodoSchema>) {
    const { params } = request;

    const [item] = await db.select().from(listItems).where(sql.eq(listItems.id, params.id));

    reply.code(HttpStatus.OK).send(item);
    reply.code(HttpStatus.OK).send(item);
}

export async function getTodoAllHandler(
    request: FastifyRequest<GetTodoAllSchema>,
    reply: FastifyReply<GetTodoAllSchema>,
) {
    const { params } = request;

    const items = await db
        .select()
        .from(listItems)
        .where(sql.and(sql.eq(listItems.groupId, params.groupId), sql.isNull(listItems.deletedAt)));

    reply.code(HttpStatus.OK).send(items);
    reply.code(HttpStatus.OK).send(items);
}

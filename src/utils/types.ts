import type { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import type { TokenPayload } from "@src/modules/auth/types.ts";
import type {
    FastifyReply as BaseFastifyReply,
    FastifyRequest as BaseFastifyRequest,
    ContextConfigDefault,
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
} from "fastify";
import type { RouteGenericInterface } from "fastify/types/route.d.ts";
import type { FastifySchema } from "fastify/types/schema.d.ts";

declare module "fastify" {
    export interface FastifyContextConfig {
        public?: boolean;
    }
}

declare module "@fastify/jwt" {
    interface FastifyJWT {
        payload: Partial<TokenPayload>;
        user: TokenPayload;
    }
}

export interface HttpResponse<T = unknown> {
    error?: boolean;
    data: T;
}

export type FastifyRequest<TSchema extends FastifySchema> = BaseFastifyRequest<
    RouteGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression<RawServerDefault>,
    TSchema,
    TypeBoxTypeProvider
>;

export type FastifyReply<TSchema extends FastifySchema> = BaseFastifyReply<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    RouteGenericInterface,
    ContextConfigDefault,
    TSchema,
    TypeBoxTypeProvider
>;

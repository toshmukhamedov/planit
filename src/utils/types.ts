import type {
  FastifyReply as BaseFastifyReply,
  FastifyRequest as BaseFastifyRequest,
  RawRequestDefaultExpression,
  RawServerDefault,
  RawReplyDefaultExpression,
  ContextConfigDefault
} from 'fastify';
import type { FastifySchema } from 'fastify/types/schema.d.ts';
import type { RouteGenericInterface } from 'fastify/types/route.d.ts';
import type { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';

declare module "fastify" {
    export interface FastifyContextConfig {
        public?: boolean;
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
>

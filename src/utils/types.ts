declare module "fastify" {
    export interface FastifyRequest {
        user: {
            id: number;
        };
    }
    export interface FastifyContextConfig {
        public?: boolean;
    }
}

export interface HttpResponse<T = unknown> {
    error?: boolean;
    data: T;
}

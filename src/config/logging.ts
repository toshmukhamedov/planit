import { AppStage } from "@src/utils/enums.ts";
import type { FastifyServerOptions } from "fastify";

export const loggerOptions: Record<AppStage, FastifyServerOptions["logger"]> = {
    [AppStage.Dev]: {
        transport: {
            target: "pino-pretty",
            options: {
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
            },
        },
    },
    [AppStage.Test]: true,
    [AppStage.Prod]: true,
};

import { AppStage } from "@src/utils/enums.ts";
import type { FastifyServerOptions } from "fastify";

export const loggerOptions: Record<AppStage, FastifyServerOptions["logger"]> = {
    [AppStage.DEV]: {
        transport: {
            target: "pino-pretty",
            options: {
                translateTime: "HH:MM:ss Z",
                ignore: "pid,hostname",
            },
        },
    },
    [AppStage.TEST]: true,
    [AppStage.PROD]: true,
};

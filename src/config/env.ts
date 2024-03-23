import { z } from "zod";
import { AppStage } from "@utils/enums.js";

const schema = z.object({
    PORT: z.number({ coerce: true }).default(3000),
    DB_URL: z.string().url(),
    NODE_ENV: z.enum([AppStage.DEV, AppStage.TEST, AppStage.PROD]),
});

type Env = z.infer<typeof schema>;

const result = schema.safeParse(process.env);

if (!result.success) {
    console.error(result.error.issues);
    console.error("Some Environment variables are missing. Exiting...");
    process.exit(1);
}

// FIXME: Testing purpose (It'll be removed after a while)
console.info("LOADED");

export const env: Env = result.data;

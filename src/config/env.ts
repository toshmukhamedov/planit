import { AppStage } from "@utils/enums.ts";
import { z } from "zod";

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

export const env: Env = result.data;

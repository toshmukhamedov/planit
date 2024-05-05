import { AppStage, ProcessCode } from "@utils/enums.ts";
import { z } from "zod";

// TODO: transfer to TypeBox
const schema = z.object({
    PORT: z.number({ coerce: true }).default(3000),
    DB_URL: z.string().url(),
    NODE_ENV: z.enum([AppStage.Dev, AppStage.Test, AppStage.Prod]),
    JWT_SECRET: z.string(),
    JWT_EXPIRES_IN: z.string(),
    AWS_SES_REGION: z.string(),
    AWS_SES_SECRET_ACCESS_KEY: z.string(),
    AWS_SES_ACCESS_KEY_ID: z.string(),
    AWS_SES_FROM_EMAIL_ADDRESS: z.string(),
});

type Env = z.infer<typeof schema>;

const result = schema.safeParse(process.env);

if (!result.success) {
    console.error(result.error.issues);
    console.error("Some Environment variables are missing. Exiting...");
    process.exit(ProcessCode.ERROR);
}

export const env: Env = result.data;

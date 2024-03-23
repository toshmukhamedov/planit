import { env } from "@config/env.ts";
import type { Config } from "drizzle-kit";

export default {
    schema: "./src/db/schema/*",
    out: "./src/db/migrations",
    driver: "pg",
    dbCredentials: {
        connectionString: env.DB_URL,
    },
} satisfies Config;

import { env } from "@config/env.ts";
import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";

const client = new pg.Client(env.DB_URL);

await client.connect();
export const db = drizzle(client);

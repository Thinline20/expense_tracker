import { drizzle } from "@repo/db";
import * as schema from "@repo/db/schema";
import { env } from "~/lib/env";
import { Database } from "bun:sqlite";

const sqlite = new Database(env.DATABASE_URL);
export const db = drizzle(sqlite, { schema });

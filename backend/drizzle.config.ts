import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "../packages/db/schema",
  driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});

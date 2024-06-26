import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  server: {
    NODE_ENV: z.enum(["development", "production"]).default("development"),
    PORT: z.coerce.number().default(3000),
    HOSTNAME: z.string().default("0.0.0.0"),
    DATABASE_URL: z.string().min(1),
  },
  runtimeEnv: process.env,
});

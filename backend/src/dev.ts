import Elysia from "elysia";
import { logger } from "@bogeychan/elysia-logger";
import swagger from "@elysiajs/swagger";

import { env } from "./lib/env";
import { route } from "./routes";

function mainDev() {
  console.clear();

  const now = performance.now();

  const elysia = new Elysia({ prefix: "/api" })
    .use(
      logger({
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
          },
        },
      }),
    )
    .use(swagger())
    .use(route)
    .compile();

  const server = Bun.serve({
    hostname: "0.0.0.0",
    port: env.PORT,
    fetch: elysia.fetch,
  });

  const end = performance.now();

  console.log(`Server running at http://localhost:${env.PORT}`);
  console.log(`Server started in ${end - now}ms`);
}

mainDev();

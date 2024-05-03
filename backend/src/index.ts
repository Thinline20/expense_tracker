import Elysia from "elysia";

import { env } from "./lib/env";
import { createServer } from "./router";

async function main() {
  const elysia = (await createServer(new Elysia())).compile();

  Bun.serve({
    hostname: env.HOSTNAME,
    port: env.PORT,
    fetch: elysia.fetch,
  });
}

main();

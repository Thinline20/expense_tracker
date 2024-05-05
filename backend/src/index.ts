import Elysia from "elysia";

import { env } from "./lib/env";
import { createFileBasedRoutingServer } from "./router";

async function main() {
  const elysia = await createFileBasedRoutingServer(
    new Elysia({ prefix: "/api" }),
  );

  Bun.serve({
    hostname: env.HOSTNAME,
    port: env.PORT,
    fetch: elysia.fetch,
  });
}

main();

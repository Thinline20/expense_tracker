import { logger } from "@bogeychan/elysia-logger";
import swagger from "@elysiajs/swagger";
import Elysia from "elysia";

import { env } from "./lib/env";
import { createServer } from "./router";

async function mainDev() {
  const start = performance.now();

  const elysia = (await createServer(new Elysia()))
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
    .compile();

  const server = Bun.serve({
    hostname: "0.0.0.0",
    port: env.PORT,
    fetch: elysia.fetch,
  });

  const end = performance.now();

  console.log(`Server running at http://localhost:${env.PORT}`);
  console.log(`Server started in ${end - start}ms`);

  // const watcher = watch(
  //   import.meta.dir + "/server/routes",
  //   { recursive: true },
  //   async (event, filename) => {
  //     console.clear();
  //     const start = performance.now();

  //     server.stop();

  //     elysia = (await createServer(new Elysia()))
  //       .use(
  //         logger({
  //           transport: {
  //             target: "pino-pretty",
  //             options: {
  //               colorize: true,
  //             },
  //           },
  //         }),
  //       )
  //       .use(swagger())
  //       .compile();

  //     server = Bun.serve({
  //       hostname: "0.0.0.0",
  //       port: env.PORT,
  //       fetch: elysia.fetch,
  //     });

  //     const end = performance.now();

  //     console.log(`Server running at http://localhost:${env.PORT}`);
  //     console.log(`File ${filename} changed`);
  //     console.log(`Server restarted in ${end - start}ms`);
  //   },
  // );

  // process.on("SIGINT", () => {
  //   console.log("Shutting down server...");
  //   server.stop();
  //   watcher.close();

  //   process.exit(0);
  // });
}

mainDev();

import { logger } from "@bogeychan/elysia-logger";
import swagger from "@elysiajs/swagger";
import { Glob } from "bun";
import { Option } from "effect";
import Elysia from "elysia";
import type { RouteParameters } from "./types/elysia";

import type { FileType } from "./types/file";
import type { Method } from "./types/method";

export const FILE_EXTENSIONS = ["ts", "js"];
export const BASE_ELYSIA = new Elysia()
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
  .use(swagger());

export function createRoute(
  method: Method,
  ...params: RouteParameters
  // path: string,
  // handler: Function,
  // method: Method,
  // hook?: any,
) {
  const [path, handler, hook] = params;
  const route = new Elysia();

  switch (method) {
    case "get":
      return route.get(path, handler, hook);
    case "post":
      return route.post(path, handler, hook);
    case "put":
      return route.put(path, handler, hook);
    case "delete":
      return route.delete(path, handler, hook);
    case "patch":
      return route.patch(path, handler, hook);
  }
}

export async function getRouteFiles(): Promise<Option.Option<string[]>> {
  const pathGlob = new Glob(`src/routes/**/*.{${FILE_EXTENSIONS.join(",")}}`);

  const filesIterator = pathGlob.scan(".");

  const files = [] as string[];

  for await (const file of filesIterator) {
    files.push(file);
  }

  if (files.length === 0) {
    return Option.none();
  }

  return Option.some(files);
}

export function parseRoutePaths(files: string[]) {
  const pathReplace =
    process.platform === "win32" ? "src\\routes\\" : "src/routes/";

  const splitDelimiter = process.platform === "win32" ? "\\" : "/";

  return files.map((value) => {
    const pathRaw = value.replace(pathReplace, "");
    const pathParts = pathRaw.split(splitDelimiter);
    const file = pathParts.pop() as string;
    const [filename, extension] = file.split(".");
    pathParts.push(filename);

    const path = pathParts.join("/").replace("/index", "");

    return {
      path: path === "index" ? "" : path,
      pathParts,
      filename,
      extension,
      filePath: value,
    } as FileType;
  });
}

export function useRoutes(elysia: Elysia, routes: Elysia[]) {
  if (routes.length === 0) {
    return elysia;
  }

  const newRoute = routes.shift();

  return useRoutes(elysia.use(newRoute!), routes);
}

export async function createServer(elysia: Elysia) {
  const files = await getRouteFiles();
  const paths = Option.getOrElse(files, () => [] as string[]);
  const parsedPaths = parseRoutePaths(paths);
  const routes = [] as Elysia[];

  for (const path of parsedPaths) {
    const module = await import(path.filePath);

    if (module.GET !== undefined) {
      routes.push(createRoute("get", path.path, module.GET, module.getHook));
    }

    if (module.POST !== undefined) {
      routes.push(createRoute("post", path.path, module.POST, module.postHook));
    }

    if (module.PUT !== undefined) {
      routes.push(createRoute("put", path.path, module.PUT, module.putHook));
    }

    if (module.DELETE !== undefined) {
      routes.push(
        createRoute("delete", path.path, module.DELETE, module.deleteHook),
      );
    }

    if (module.PATCH !== undefined) {
      routes.push(
        createRoute("patch", path.path, module.PATCH, module.patchHook),
      );
    }
  }

  return useRoutes(elysia, routes);
}

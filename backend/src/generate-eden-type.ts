import { Option } from "effect";
import { getRouteFiles } from "./router";

type Route = {
  file: string;
  path: string;
  as: string;
  handler: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  hook: boolean;
};

export async function generateType() {
  const routesFiles = await getRouteFiles();

  const files = Option.getOrNull(routesFiles);

  if (files === null) {
    return;
  }

  const routes: Route[] = [];

  let str = `import Elysia from "elysia";`;

  const pathReplace =
    process.platform === "win32" ? "src\\routes\\" : "src/routes/";

  const splitDelimiter = process.platform === "win32" ? "\\" : "/";

  for (const file of files) {
    const pathParts = file.replace(pathReplace, "").split(splitDelimiter);
    const [filename] = pathParts.pop()!.split(".");
    pathParts.push(filename);
    const path = "/" + pathParts.join("/").replace("/index", "");
    const as = path.replaceAll("/", "_").replace(":", "d_").replace("-", "_");

    const module = await import(file);

    if (module.GET !== undefined) {
      let route = {
        file: file,
        as: as,
        path: path,
        handler: "GET",
        hook: false,
      } as Route;

      if (module.getHook !== undefined) {
        route.hook = true;
      }

      routes.push(route);
    }

    if (module.POST !== undefined) {
      let route = {
        file: file,
        as: as,
        path: path,
        handler: "POST",
        hook: false,
      } as Route;

      if (module.postHook !== undefined) {
        route.hook = true;
      }

      routes.push(route);
    }

    if (module.PUT !== undefined) {
      let route = {
        file: file,
        as: as,
        path: path,
        handler: "PUT",
        hook: false,
      } as Route;

      if (module.putHook !== undefined) {
        route.hook = true;
      }

      routes.push(route);
    }

    if (module.DELETE !== undefined) {
      let route = {
        file: file,
        as: as,
        path: path,
        handler: "DELETE",
        hook: false,
      } as Route;

      if (module.deleteHook !== undefined) {
        route.hook = true;
      }

      routes.push(route);
    }

    if (module.PATCH !== undefined) {
      let route = {
        file: file,
        as: as,
        path: path,
        handler: "PATCH",
        hook: false,
      } as Route;

      if (module.patchHook !== undefined) {
        route.hook = true;
      }

      routes.push(route);
    }
  }

  for (const route of routes) {
    str += `\nimport { ${route.handler} as ${route.as}_${route.handler} } from "${route.file}"`;

    if (route.hook) {
      const hook = route.handler.toLowerCase() + "Hook";
      str += `\nimport { ${hook} as ${route.as}_${hook} } from "${route.file}"`;
    }
  }

  str += '\nconst elysia = new Elysia({ prefix: "/api" })';

  for (const route of routes) {
    str += `\n  .${route.handler.toLowerCase()}("${route.path}", ${route.as}_${route.handler}, ${
      route.hook
        ? `${route.as}_${route.handler.toLowerCase()}Hook`
        : "undefined"
    })`;
  }

  str += "\nexport type App = typeof elysia;";

  const edenFile = Bun.file("eden-type.ts");
  edenFile.writer().write(str);
}

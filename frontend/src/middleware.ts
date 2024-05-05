import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  if (context.request.method !== "GET") {
    const originHeader = context.request.headers.get("Origin");
    const hostHeader = context.request.headers.get("Host");

    if (!originHeader || !hostHeader) {
      return new Response("Missing Origin or Host header", { status: 403 });
    }
  }

  return next();
});

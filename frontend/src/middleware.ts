import type { APIContext, MiddlewareNext } from "astro";
import { sequence } from "astro:middleware";

async function validation(context: APIContext, next: MiddlewareNext) {
  if (context.request.method !== "GET") {
    const originHeader = context.request.headers.get("Origin");
    const hostHeader = context.request.headers.get("Host");

    if (!originHeader || !hostHeader) {
      return new Response("Missing Origin or Host header", { status: 403 });
    }
  }

  const pathname = new URL(context.request.url).pathname;

  if (pathname === "/api/auth/callback") {
    return context.redirect("/");
  }

  return next();
}

async function auth(context: APIContext, next: MiddlewareNext) {
  const cookie = context.request.headers.get("Cookie");

  if (!cookie) {
    context.locals.session = null;
    context.locals.user = null;
    return next();
  }

  const res = await fetch("http://localhost:3000/api/auth/me", {
    headers: {
      "Content-Type": "application/json",
      Cookie: cookie || "",
    },
  });

  if (res.ok) {
    const data = await res.json();
    context.locals.session = data.session;
    context.locals.user = data.user;
  } else {
    context.locals.session = null;
    context.locals.user = null;
  }

  return next();
}

export const onRequest = sequence(validation, auth);

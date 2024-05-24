import Elysia from "elysia";
import { lucia } from "~/auth";

export const route = new Elysia().get("/me", async ({ cookie }) => {
  if (!cookie.auth_session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const res = await lucia.validateSession(cookie.auth_session.value);

  if (res.user === null) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  return new Response(
    JSON.stringify({
      session: res.session,
      user: res.user,
    }),
  );
});

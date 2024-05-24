import Elysia from "elysia";
import { lucia } from "~/auth";

export const route = new Elysia().get("/me", async ({ cookie }) => {
  if (!cookie.auth_session) {
    return new Response(JSON.stringify({ isAuthenticated: false }));
  }

  const res = await lucia.validateSession(cookie.auth_session.value);

  if (res.user === null) {
    return new Response(JSON.stringify({ isAuthenticated: false }));
  }

  return new Response(
    JSON.stringify({
      isAuthenticated: true,
      session: res.session,
      user: res.user,
    }),
  );
});

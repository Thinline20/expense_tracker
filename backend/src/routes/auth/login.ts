import { eq, users } from "@repo/db";
import {
  InvalidFormData,
  NetworkError,
  NoMatchingUserError,
} from "@repo/error";
import { BaseError } from "@repo/error/base-error";
import { Cause, Effect, Exit, Option } from "effect";
import Elysia, { t } from "elysia";
import { lucia } from "~/auth";
import { db } from "~/db";

export const route = new Elysia().post(
  "/login",
  async ({ body: { username, password }, cookie: { auth_session }, error }) => {
    const program = Effect.gen(function* (_) {
      if (
        !username ||
        username.length < 3 ||
        username.length > 31 ||
        !/^[a-zA-Z0-9_-]+/.test(username.toString())
      ) {
        yield* _(Effect.fail(new InvalidFormData()));
      }

      if (
        !password ||
        password.length < 8 ||
        password.length > 255 ||
        !/^[a-zA-Z0-9_\-!@#$%^&*(^)]+$/.test(password.toString())
      ) {
        yield* _(Effect.fail(new InvalidFormData()));
      }

      const existingUser = yield* _(
        Effect.tryPromise({
          try: () =>
            db.query.users.findFirst({
              where: eq(users.username, username!.toString()),
            }),
          catch: () => new NetworkError(),
        }),
      );

      if (existingUser === undefined) {
        yield* _(Effect.fail(new NoMatchingUserError()));
      }

      const validPassword = yield* _(
        Effect.promise(() =>
          Bun.password.verify(password, existingUser!.password),
        ),
      );

      if (!validPassword) {
        yield* _(Effect.fail(new InvalidFormData()));
      }

      const session = yield* _(
        Effect.promise(() => lucia.createSession(existingUser!.id, {})),
      );

      const sessionCookie = lucia.createSessionCookie(session.id);

      return sessionCookie;
    });

    const res = await Effect.runPromiseExit(program);

    return Exit.match(res, {
      onFailure: (cause) => {
        const expectedError = Cause.failureOption(cause);

        return error(
          400,
          Option.getOrElse(expectedError, () => new BaseError())._tag,
        );
      },
      onSuccess: (sessionCookie) => {
        return new Response("/api/auth/callback", {
          status: 200,
          headers: {
            "Set-Cookie": sessionCookie.serialize(),
          },
        });
      },
    });
  },
  {
    body: t.Object({
      username: t.String(),
      password: t.String(),
    }),
  },
);

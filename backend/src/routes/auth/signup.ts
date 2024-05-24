import { Cause, Effect, Exit, Option } from "effect";
import Elysia, { t } from "elysia";

import { ExistingUserError, InvalidFormData, NetworkError } from "@repo/error";
import { generateIdFromEntropySize } from "lucia";
import { db } from "~/db";
import { users } from "@repo/db";
import { lucia } from "~/auth";
import { BaseError } from "@repo/error/base-error";

export const route = new Elysia().post(
  "/signup",
  async ({ body: { username, password, email }, set, error }) => {
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

      if (
        !email ||
        email.length < 3 ||
        email.length > 255 ||
        !/^[^@]+@[^@]+\.[^@]+$/.test(email.toString())
      ) {
        yield* _(Effect.fail(new InvalidFormData()));
      }

      const userId = generateIdFromEntropySize(10);
      const passwordHash = yield* _(
        Effect.promise(() =>
          Bun.password.hash(password!.toString(), {
            algorithm: "argon2id",
            memoryCost: 30000,
            timeCost: 4,
          }),
        ),
      );

      const existingUser = yield* _(
        Effect.tryPromise({
          try: () =>
            db.query.users.findFirst({
              where: (users, { eq, or }) =>
                or(
                  eq(users.username, username!.toString()),
                  eq(users.id, userId),
                ),
            }),
          catch: () => new NetworkError(),
        }),
      );

      if (existingUser !== undefined) {
        yield* _(Effect.fail(new ExistingUserError()));
      }

      const dbRes = yield* _(
        Effect.tryPromise({
          try: () =>
            db.insert(users).values({
              id: userId,
              username: username!.toString(),
              password: passwordHash,
              email: email!.toString(),
            }),
          catch: () => new NetworkError(),
        }),
      );

      const session = yield* _(
        Effect.promise(() => lucia.createSession(userId, {})),
      );

      const sessionCookie = lucia.createSessionCookie(session.id);

      return sessionCookie;
    });

    const result = await Effect.runPromiseExit(program);

    return Exit.match(result, {
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
            "set-cookie": sessionCookie.serialize(),
          },
        });
      },
    });
  },
  {
    body: t.Object({
      username: t.String(),
      password: t.String(),
      email: t.String(),
    }),
  },
);

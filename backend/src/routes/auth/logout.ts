import { eq, sessions } from "@repo/db";
import {
  CannotInvalidateSessionError,
  InvalidSessionError,
  NetworkError,
} from "@repo/error";
import { BaseError } from "@repo/error/base-error";
import { Cause, Effect, Exit, Option } from "effect";
import Elysia, { t } from "elysia";
import { lucia } from "~/auth";
import { db } from "~/db";

export const route = new Elysia().post(
  "/logout",
  async ({ cookie: { auth_session }, error }) => {
    const program = Effect.gen(function* (_) {
      if (!auth_session || auth_session.value === undefined) {
        console.log("none");
        yield* _(Effect.fail(new InvalidSessionError()));
      }

      console.log(auth_session.cookie);

      const a = yield* _(
        Effect.tryPromise({
          try: () => lucia.invalidateSession(auth_session.value),
          catch: () => new CannotInvalidateSessionError(),
        }),
      );

      return lucia.createBlankSessionCookie();
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
);

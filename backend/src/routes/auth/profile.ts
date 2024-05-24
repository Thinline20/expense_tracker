import { eq, users } from "@repo/db";
import Elysia, { t } from "elysia";
import { db } from "~/db";

export const route = new Elysia().post(
  "/profile",
  async ({ body }) => {
    const user = await db.query.users.findFirst({
      where: eq(users.id, body.userId),
    });

    console.log(user);
    console.log(body.userId);

    if (!user) {
      return new Response(JSON.stringify({ error: "User not found" }), {
        status: 404,
      });
    }

    console.log(user);

    const data = {
      username: user.username,
      email: user.email,
      createdAt: user.createdAt,
    };

    console.log(data);

    return new Response(JSON.stringify(data), {
      status: 200,
    });
  },
  {
    body: t.Object({
      userId: t.String(),
    }),
  },
);

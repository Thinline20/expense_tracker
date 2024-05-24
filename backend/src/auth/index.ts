import { DrizzleSQLiteAdapter } from "@lucia-auth/adapter-drizzle";
import { users, sessions } from "@repo/db/schema";
import { Lucia } from "lucia";
import { db } from "~/db";
import { env } from "~/lib/env";

export const lucia = new Lucia(new DrizzleSQLiteAdapter(db, sessions, users), {
  sessionCookie: {
    attributes: {
      secure: env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: DatabaseUserAttributes;
  }
}

type DatabaseUserAttributes = {
  username: string;
};

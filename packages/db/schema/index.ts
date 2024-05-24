import { sql } from "drizzle-orm";
import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: text("id").notNull().primaryKey(),
  username: text("username").notNull(),
  password: text("password").notNull(),
  googleId: text("google_id"),
  email: text("email").notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .default(new Date())
    .notNull(),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .default(new Date())
    .notNull(),
});

export const sessions = sqliteTable("sessions", {
  id: text("id").notNull().primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: integer("expires_at").notNull(),
});

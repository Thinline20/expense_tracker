import { Effect, Exit } from "effect";
import { t, type Context } from "elysia";
import * as S from "@effect/schema/Schema";
import { ParseError } from "@effect/schema/ParseResult";

import type { RouteHook } from "backend/src/types/elysia";
import { ExpenseSchema, type Expense } from "backend/src/types/expense";

export const fakeExpenses = [
  { id: 0, title: "Rent", amount: 1000 },
  { id: 1, title: "Insurance", amount: 100 },
  { id: 2, title: "Groceries", amount: 200 },
] as Expense[];

export async function GET() {
  return {
    expenses: fakeExpenses,
  };
}

export const createPostSchema = ExpenseSchema.pipe(S.omit("id"));

export async function POST({ body }: Context) {
  const res = Effect.runSyncExit(S.decodeUnknown(createPostSchema)(body));

  return Exit.match(res, {
    onFailure: (error) => {
      if (error instanceof ParseError) {
        return new Response("Invalid expense", { status: 400 });
      }

      return new Response("Internal server error", { status: 500 });
    },
    onSuccess: (expense) => {
      fakeExpenses.push({ id: fakeExpenses.length, ...expense });

      return new Response(JSON.stringify(expense), { status: 201 });
    },
  });
}

export const postHook: RouteHook = {
  body: t.Object(
    {
      title: t.String(),
      amount: t.Integer(),
    },
    {
      error: "Incorrect data type",
    },
  ),
};

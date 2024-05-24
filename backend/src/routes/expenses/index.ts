import { Effect, Exit } from "effect";
import Elysia, { t, type Context } from "elysia";
import * as S from "@effect/schema/Schema";
import { ParseError } from "@effect/schema/ParseResult";

import { ExpenseSchema, type Expense } from "~/types/expense";

import { route as dynamicIdRoute } from "./:id";
import { route as totalSpentRoute } from "./total-spent";

export const fakeExpenses = [
  { id: 0, title: "Rent", amount: 1000 },
  { id: 1, title: "Insurance", amount: 100 },
  { id: 2, title: "Groceries", amount: 200 },
] as Expense[];

export async function GET() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return new Response(JSON.stringify({ expenses: fakeExpenses }), {
    status: 200,
  });
}

export const createPostSchema = ExpenseSchema.pipe(S.omit("id"));

export function POST({ body }: Context) {
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

export const route = new Elysia({ prefix: "/expenses" })
  .get("/", GET)
  .post("/", POST, {
    body: t.Object(
      {
        title: t.String(),
        amount: t.Integer(),
      },
      {
        error: "Incorrect data type",
      },
    ),
  })
  .use(dynamicIdRoute)
  .use(totalSpentRoute);

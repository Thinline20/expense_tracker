import { Elysia, type Context } from "elysia";
import { sum } from "@repo/math-sum";

import { fakeExpenses } from ".";

export async function GET(context: Context) {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const total = sum(fakeExpenses.map((e) => e.amount));

  return new Response(JSON.stringify({ total: total }), { status: 200 });
}

export const route = new Elysia().get("/total-spent", GET);

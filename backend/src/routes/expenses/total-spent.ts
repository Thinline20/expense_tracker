import type { Context } from "elysia";
import { sum } from "@repo/math-sum";

import { fakeExpenses } from ".";
import { createRoute } from "~/router";

export function GET(context: Context) {
  const total = sum(fakeExpenses.map((e) => e.amount));

  return { total: total };
}

createRoute("get", "/expenses/total-spent", GET);

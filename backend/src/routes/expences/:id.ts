import { t, type Context } from "elysia";
import { fakeExpenses } from ".";
import { pipe } from "effect";
import type { RouteHook } from "backend/src/types/elysia";

export async function GET({ params: { id } }: Context) {
  const expense = pipe(id, Number.parseInt, (id) =>
    fakeExpenses.find((value) => value.id === id),
  );

  if (expense === undefined) {
    return new Response("Cannot find expense", {
      status: 404,
    });
  }

  return expense;
}

export const getHook: RouteHook = {
  params: t.Object({
    id: t.Numeric(),
  }),
};

export async function DELETE({ params: { id } }: Context) {
  const index = fakeExpenses.findIndex((value) => value.id === id);

  if (index === -1) {
    return new Response("Cannot find expense", {
      status: 404,
    });
  }

  fakeExpenses.splice(index, 1);

  return new Response("Deleted", {
    status: 200,
  });
}

export const deleteHook: RouteHook = {
  params: t.Object({
    id: t.Numeric(),
  }),
};

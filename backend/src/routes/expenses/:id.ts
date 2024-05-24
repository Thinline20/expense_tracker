import Elysia, { t, type Context } from "elysia";
import { fakeExpenses } from ".";
import { pipe } from "effect";

export function GET({ params: { id }, error }: Context) {
  const expense = pipe(id, Number.parseInt, (id) =>
    fakeExpenses.find((value) => value.id === id),
  );

  if (expense === undefined) {
    return error(404, "Cannot find expense");
  }

  return expense;
}

export function DELETE({ params: { id } }: Context) {
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

export const route = new Elysia()
  .get("/:id", GET, {
    params: t.Object({
      id: t.Numeric(),
    }),
  })
  .delete("/:id", DELETE, {
    params: t.Object({
      id: t.Numeric(),
    }),
  });

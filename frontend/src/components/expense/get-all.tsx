import { JSONParseError, NetworkError } from "@repo/error";
import { Effect, Exit, pipe } from "effect";
import { createEffect, createResource, For, Show, Suspense } from "solid-js";

import { api } from "~/lib/eden";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui/table";
import { Skeleton } from "~/components/ui/skeleton";

async function getExpenses(): Promise<any[]> {
  const fetchExpenses = Effect.tryPromise({
    try: () => api.expenses.index.get(),
    catch: () => new NetworkError(),
  });

  const program = pipe(
    fetchExpenses,
    Effect.map((res) => `${res.data}`),
    Effect.map((data) => JSON.parse(data)),
  );

  const res = await Effect.runPromiseExit(program);

  return Exit.match(res, {
    onFailure: (cause) => {
      console.log(cause);
      return { expenses: [] };
    },
    onSuccess: (res) => res,
  }).expenses;
}

export function GetAllExpenses() {
  const [data] = createResource(getExpenses);

  return (
    <div>
      <Table class="mx-auto max-w-2xl">
        <TableCaption>List of all Expenses</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense
            fallback={
              <For each={[1, 2, 3]}>
                {(_) => (
                  <TableRow>
                    <TableCell>
                      <Skeleton height={16} width={80} radius={10} />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={16} width={200} radius={10} />
                    </TableCell>
                    <TableCell>
                      <Skeleton height={16} width={200} radius={10} />
                    </TableCell>
                  </TableRow>
                )}
              </For>
            }
          >
            <Show when={data()}>
              <For each={data()}>
                {(expense) => (
                  <TableRow>
                    <TableCell>{expense.id}</TableCell>
                    <TableCell>{expense.title}</TableCell>
                    <TableCell>{expense.amount}</TableCell>
                  </TableRow>
                )}
              </For>
            </Show>
          </Suspense>
        </TableBody>
      </Table>
    </div>
  );
}

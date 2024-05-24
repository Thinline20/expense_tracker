import { JSONParseError, NetworkError } from "@repo/error";
import { Cause, Effect, Either, Exit, pipe } from "effect";
import {
  createEffect,
  createResource,
  createSignal,
  Show,
  Suspense,
} from "solid-js";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { api } from "~/lib/eden";

async function getTotal() {
  const fetchTotal = Effect.tryPromise({
    try: () => api.expenses["total-spent"].get(),
    catch: () => new NetworkError(),
  });

  const res = await Effect.runPromiseExit(fetchTotal);

  const data = Exit.match(res, {
    onFailure: (cause) => {
      Cause.pretty(cause);
      return "{ total: 0 }";
    },
    onSuccess: (res) => `${res.data}`,
  });

  return (await JSON.parse(data)).total;
}

export function Total() {
  const [total] = createResource(getTotal);

  return (
    <Card>
      <CardHeader class="w-96">
        <CardTitle>Total Expenses</CardTitle>
        <CardDescription>The total expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <Suspense fallback={<div>Loading...</div>}>
            <Show when={total()}>
              <div>{total()}</div>
            </Show>
          </Suspense>
        </div>
      </CardContent>
    </Card>
  );
}

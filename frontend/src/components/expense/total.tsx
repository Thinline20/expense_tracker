import { createSignal } from "solid-js";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";

async function fetchTotal() {
  return await fetch("");
}

export function Total(props: { total: number }) {
  return (
    <Card>
      <CardHeader class="w-96">
        <CardTitle>Total Expenses</CardTitle>
        <CardDescription>The total expenses</CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <span class="text-2xl font-bold">{props.total}</span>
        </div>
      </CardContent>
    </Card>
  );
}

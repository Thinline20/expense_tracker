import { createForm } from "@tanstack/solid-form";
import { Spinner, SpinnerType } from "solid-spinner";

import { Label } from "~/components/ui/label";
import {
  NumberField,
  NumberFieldDecrementTrigger,
  NumberFieldIncrementTrigger,
  NumberFieldInput,
} from "~/components/ui/number-field";
import { Button } from "~/components/ui/button";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/textfield";
import { FieldInfo } from "~/components/field-info";
import { api } from "~/lib/eden";
import { cn } from "~/lib/utils";
import { createEffect } from "solid-js";

export function CreateExpense() {
  const form = createForm(() => ({
    defaultValues: {
      title: "",
      amount: 0,
    },
    onSubmit: async ({ value }) => {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      const res = await api.expenses.index.post(value);

      if (!res.response.ok) {
        const data = await res.response.json();
        console.error(data);
        throw new Error("Failed to create expense");
      }

      window.location.href = "/expenses";
    },
  }));

  function onSubmit(e: Event & { currentTarget: HTMLFormElement }) {
    e.preventDefault();
    e.stopPropagation();

    form.handleSubmit();
  }

  return (
    <div class="mx-auto w-full max-w-xl rounded-lg border p-4">
      <h2 class="text-center text-2xl font-bold tracking-wide">
        Create Expense
      </h2>
      <form class="mt-4" onSubmit={(e) => onSubmit(e)}>
        <form.Field name="title">
          {(field) => (
            <>
              <TextField
                value={field().state.value}
                onChange={(value) => field().handleChange(value)}
              >
                <TextFieldLabel>Title</TextFieldLabel>
                <TextFieldInput
                  id={field().name}
                  name={field().name}
                  onBlur={field().handleBlur}
                  required
                />
              </TextField>
              <FieldInfo field={field()} />
            </>
          )}
        </form.Field>
        <form.Field name="amount">
          {(field) => (
            <div class="mt-6">
              <Label for="amount">Amount</Label>
              <NumberField
                rawValue={field().state.value}
                onRawValueChange={(value) => field().handleChange(value)}
                minValue={0}
                onBlur={field().handleBlur}
                required
              >
                <div class="relative">
                  <NumberFieldInput id={field().name} name={field().name} />
                  <NumberFieldIncrementTrigger />
                  <NumberFieldDecrementTrigger />
                </div>
              </NumberField>
              <FieldInfo field={field()} />
            </div>
          )}
        </form.Field>
        <div class="mt-8 flex justify-end gap-4">
          <Button class="w-[4.5rem]" type="reset">
            Clear
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
          >
            {(state) => (
              <Button
                class="w-[4.5rem]"
                type="submit"
                disabled={!state()[0] || state()[1]}
              >
                {state()[1] ? <Spinner type={SpinnerType.puff} /> : "Create"}
              </Button>
            )}
          </form.Subscribe>
        </div>
      </form>
    </div>
  );
}

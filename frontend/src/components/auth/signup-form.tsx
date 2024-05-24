import { createForm } from "@tanstack/solid-form";
import { Spinner, SpinnerType } from "solid-spinner";

import { FieldInfo } from "~/components/field-info";
import {
  TextField,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/textfield";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { api } from "~/lib/eden";

export function SignupForm() {
  const form = createForm(() => ({
    defaultValues: {
      username: "",
      password: "",
      email: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await api.auth.signup.post(value);

        if (res.error !== null) {
          console.error(res.error);
          return;
        }

        const redirect = `${res.data}`;
        window.location.href = redirect;
      } catch (e) {
        console.error(e);
      }
    },
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <form.Field name="username">
        {(field) => (
          <>
            <TextField
              value={field().state.value}
              onChange={(value) => field().handleChange(value)}
            >
              <TextFieldLabel>Username</TextFieldLabel>
              <TextFieldInput
                name={field().name}
                id={field().name}
                onBlur={field().handleBlur}
                autocomplete="username"
                type="text"
                required
              />
            </TextField>
            <FieldInfo field={field()} />
          </>
        )}
      </form.Field>
      <form.Field name="password">
        {(field) => (
          <>
            <Label for={field().name}>Password</Label>
            <Input
              type="password"
              name={field().name}
              id={field().name}
              value={field().state.value}
              onChange={(e) => field().handleChange(e.currentTarget.value)}
              onBlur={field().handleBlur}
              autocomplete="current-password"
              required
            />
            <FieldInfo field={field()} />
          </>
        )}
      </form.Field>
      <form.Field name="email">
        {(field) => (
          <>
            <Label for={field().name}>Email</Label>
            <Input
              type="email"
              name={field().name}
              id={field().name}
              value={field().state.value}
              onChange={(e) => field().handleChange(e.currentTarget.value)}
              onBlur={field().handleBlur}
              autocomplete="email"
              required
            />
            <FieldInfo field={field()} />
          </>
        )}
      </form.Field>
      <div class="mt-8 flex justify-end gap-4">
        <Button class="w-[4.5rem]" type="reset" variant="accent">
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
  );
}

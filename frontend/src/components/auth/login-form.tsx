import { createForm } from "@tanstack/solid-form";
import { Spinner, SpinnerType } from "solid-spinner";

import { Label } from "~/components/ui/label";
import { Input } from "~/components/ui/input";
import { FieldInfo } from "~/components/field-info";
import { Button } from "~/components/ui/button";
import { api } from "~/lib/eden";
import { PasswordInput } from "../ui/password-input";

export function LoginForm() {
  const form = createForm(() => ({
    defaultValues: {
      username: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await api.auth.login.post(value);

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
          <div class="mt-4 flex flex-col gap-2">
            <Label for={field().name}>Username</Label>
            <Input
              id={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onChange={(e) => field().handleChange(e.currentTarget.value)}
              autocomplete="username"
              required
            />
            <FieldInfo field={field()} />
          </div>
        )}
      </form.Field>
      <form.Field name="password">
        {(field) => (
          <div class="mt-4 flex flex-col gap-2">
            <Label for={field().name}>Password</Label>
            <PasswordInput
              id={field().name}
              name={field().name}
              value={field().state.value}
              onBlur={field().handleBlur}
              onChange={(e) => field().handleChange(e.currentTarget.value)}
              autocomplete="current-password"
              required
            />
            {/* <Input
              id={field().name}
              type="password"
              value={field().state.value}
              onBlur={field().handleBlur}
              onChange={(e) => field().handleChange(e.currentTarget.value)}
              autocomplete="current-password"
              required
            /> */}
            <FieldInfo field={field()} />
          </div>
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

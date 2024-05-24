import { createForm } from "@tanstack/solid-form";
import { Spinner, SpinnerType } from "solid-spinner";

import { Button } from "~/components/ui/button";
import { api } from "~/lib/eden";

export function LogoutForm() {
  const form = createForm(() => ({
    onSubmit: async () => {
      try {
        const res = await api.auth.logout.post();

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
      <form.Subscribe
        selector={(state) => [state.canSubmit, state.isSubmitting]}
      >
        {(state) => (
          <Button
            class="w-[4.5rem]"
            type="submit"
            disabled={!state()[0] || state()[1]}
          >
            {state()[1] ? <Spinner type={SpinnerType.puff} /> : "Logout"}
          </Button>
        )}
      </form.Subscribe>
    </form>
  );
}

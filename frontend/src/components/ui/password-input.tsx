import type { Component, ComponentProps } from "solid-js";
import { createSignal, splitProps } from "solid-js";

import { Input } from "./input";
import { cn } from "~/lib/utils";
import { Button } from "./button";
import { TbEye, TbEyeClosed } from "solid-icons/tb";
import { Tooltip, TooltipTrigger } from "./tooltip";

const PasswordInput: Component<ComponentProps<"input">> = (props) => {
  const [, rest] = splitProps(props, [
    "type",
    "class",
    "ref",
    "value",
    "disabled",
  ]);
  const disabled = () =>
    props.value === "" || props.value === undefined || props.disabled === true;
  const [showPassword, setShowPassword] = createSignal(false);

  return (
    <div class="relative">
      <Input
        type={showPassword() ? "text" : "password"}
        class={cn("hide-password-toggle pr-10", props.class)}
        ref={props.ref}
        {...props}
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        class="absolute right-2 top-1 w-8 h-8"
        onClick={() => setShowPassword((prev) => !prev)}
        disabled={disabled()}
      >
        {showPassword() && !disabled() ? (
          <TbEyeClosed class="h-4 w-4" aria-hidden="true" />
        ) : (
          <TbEye class="h-4 w-4" aria-hidden="true" />
        )}
        <span class="sr-only">
          {showPassword() ? "Hide password" : "Show password"}
        </span>
      </Button>
      {/* hides browsers password toggles */}
      <style>{`
					.hide-password-toggle::-ms-reveal,
					.hide-password-toggle::-ms-clear {
						visibility: hidden;
						pointer-events: none;
						display: none;
					}
				`}</style>
    </div>
  );
};

export { PasswordInput };

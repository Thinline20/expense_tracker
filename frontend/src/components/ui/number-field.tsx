import { type ComponentProps, splitProps, type Component } from "solid-js";

import { NumberField as NumberFieldPrimitive } from "@kobalte/core/number-field";

import { cn } from "~/lib/utils";

const NumberField = NumberFieldPrimitive;

const NumberFieldLabel: Component<
  ComponentProps<typeof NumberFieldPrimitive.Label>
> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <NumberFieldPrimitive.Label
      class={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        props.class,
      )}
      {...rest}
    />
  );
};

const NumberFieldInput: Component<
  ComponentProps<typeof NumberFieldPrimitive.Input>
> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <NumberFieldPrimitive.Input
      class={cn(
        "border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring data-[invalid]:border-error-foreground data-[invalid]:text-error-foreground flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        props.class,
      )}
      {...rest}
    />
  );
};

const NumberFieldIncrementTrigger: Component<
  ComponentProps<typeof NumberFieldPrimitive.IncrementTrigger>
> = (props) => {
  const [, rest] = splitProps(props, ["class", "children"]);
  return (
    <NumberFieldPrimitive.IncrementTrigger
      class={cn(
        "absolute right-1 top-1 inline-flex size-4 items-center justify-center",
        props.class,
      )}
      {...rest}
    >
      {props.children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M6 15l6 -6l6 6" />
        </svg>
      )}
    </NumberFieldPrimitive.IncrementTrigger>
  );
};

const NumberFieldDecrementTrigger: Component<
  ComponentProps<typeof NumberFieldPrimitive.DecrementTrigger>
> = (props) => {
  const [, rest] = splitProps(props, ["class", "children"]);
  return (
    <NumberFieldPrimitive.DecrementTrigger
      class={cn(
        "absolute bottom-1 right-1 inline-flex size-4 items-center justify-center",
        props.class,
      )}
      {...rest}
    >
      {props.children ?? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4"
        >
          <path d="M6 9l6 6l6 -6" />
        </svg>
      )}
    </NumberFieldPrimitive.DecrementTrigger>
  );
};

const NumberFieldDescription: Component<
  ComponentProps<typeof NumberFieldPrimitive.Description>
> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <NumberFieldPrimitive.Description
      class={cn("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  );
};

const NumberFieldErrorMessage: Component<
  ComponentProps<typeof NumberFieldPrimitive.ErrorMessage>
> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <NumberFieldPrimitive.ErrorMessage
      class={cn("text-error-foreground text-sm", props.class)}
      {...rest}
    />
  );
};

export {
  NumberField,
  NumberFieldLabel,
  NumberFieldInput,
  NumberFieldIncrementTrigger,
  NumberFieldDecrementTrigger,
  NumberFieldDescription,
  NumberFieldErrorMessage,
};

import { TextField as TextFieldPrimitive } from "@kobalte/core/text-field";
import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";
import { cn } from "~/lib/utils";

const TextField = TextFieldPrimitive;

const TextFieldInput: Component<
  ComponentProps<typeof TextFieldPrimitive.Input>
> = (props) => {
  const [, rest] = splitProps(props, ["class", "type"]);

  return (
    <TextFieldPrimitive.Input
      class={cn(
        "border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring ui-invalid:border-destructive flex h-10 w-full rounded-md border bg-transparent px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        props.class,
      )}
      {...rest}
    />
  );
};

const TextFieldTextArea: Component<
  ComponentProps<typeof TextFieldPrimitive.TextArea>
> = (props) => {
  const [, rest] = splitProps(props, ["class"]);

  return (
    <TextFieldPrimitive.TextArea
      class={cn(
        "border-input ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring ui-invalid:border-destructive flex min-h-[80px] w-full rounded-md border bg-transparent px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        props.class,
      )}
      {...rest}
    />
  );
};

const TextFieldLabel: Component<
  ComponentProps<typeof TextFieldPrimitive.Label>
> = (props) => {
  const [, rest] = splitProps(props, ["class"]);

  return (
    <TextFieldPrimitive.Label
      class={cn(
        "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        props.class,
      )}
      {...rest}
    />
  );
};

const TextFieldDescription: Component<
  ComponentProps<typeof TextFieldPrimitive.Description>
> = (props) => {
  const [, rest] = splitProps(props, ["class"]);

  return (
    <TextFieldPrimitive.Description
      class={cn("text-muted-foreground text-sm", props.class)}
      {...rest}
    />
  );
};

const TextFieldErrorMessage: Component<
  ComponentProps<typeof TextFieldPrimitive.ErrorMessage>
> = (props) => {
  const [, rest] = splitProps(props, ["class"]);

  return (
    <TextFieldPrimitive.ErrorMessage
      class={cn("text-destructive text-sm", props.class)}
      {...rest}
    />
  );
};

export {
  TextField,
  TextFieldInput,
  TextFieldTextArea,
  TextFieldLabel,
  TextFieldDescription,
  TextFieldErrorMessage,
};

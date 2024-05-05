import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

import { Image as ImagePrimitive } from "@kobalte/core/image";

import { cn } from "~/lib/utils";

const Avatar: Component<ComponentProps<typeof ImagePrimitive>> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <ImagePrimitive
      class={cn(
        "relative flex size-10 shrink-0 overflow-hidden rounded-full",
        props.class,
      )}
      {...rest}
    />
  );
};

const AvatarImage: Component<ComponentProps<typeof ImagePrimitive.Img>> = (
  props,
) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <ImagePrimitive.Img
      class={cn("aspect-square size-full", props.class)}
      {...rest}
    />
  );
};

const AvatarFallback: Component<
  ComponentProps<typeof ImagePrimitive.Fallback>
> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <ImagePrimitive.Fallback
      class={cn(
        "flex size-full items-center justify-center rounded-full bg-muted",
        props.class,
      )}
      {...rest}
    />
  );
};

export { Avatar, AvatarImage, AvatarFallback };

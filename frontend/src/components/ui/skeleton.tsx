import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

import { Skeleton as SkeletonPrimitive } from "@kobalte/core/skeleton";

import { cn } from "~/lib/utils";

const Skeleton: Component<ComponentProps<typeof SkeletonPrimitive>> = (
  props,
) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <SkeletonPrimitive
      class={cn(
        "bg-primary/10 data-[animate='true']:animate-pulse ",
        props.class,
      )}
      {...rest}
    />
  );
};

export { Skeleton };

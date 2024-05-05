import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

import { HoverCard as HoverCardPrimitive } from "@kobalte/core/hover-card";

import { cn } from "~/lib/utils";

const HoverCard: Component<ComponentProps<typeof HoverCardPrimitive>> = (
  props,
) => {
  return <HoverCardPrimitive gutter={4} {...props} />;
};

const HoverCardTrigger = HoverCardPrimitive.Trigger;

const HoverCardContent: Component<
  ComponentProps<typeof HoverCardPrimitive.Content>
> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <HoverCardPrimitive.Portal>
      <HoverCardPrimitive.Content
        class={cn(
          "z-50 w-64 rounded-md border bg-popover p-4 text-popover-foreground shadow-md outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
          props.class,
        )}
        {...rest}
      />
    </HoverCardPrimitive.Portal>
  );
};

export { HoverCard, HoverCardTrigger, HoverCardContent };

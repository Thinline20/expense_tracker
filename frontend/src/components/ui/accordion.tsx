import type { Component, ComponentProps } from "solid-js";
import { splitProps } from "solid-js";

import { Accordion as AccordionPrimitive } from "@kobalte/core/accordion";

import { cn } from "~/lib/utils";

const Accordion = AccordionPrimitive;

const AccordionItem: Component<
  ComponentProps<typeof AccordionPrimitive.Item>
> = (props) => {
  const [, rest] = splitProps(props, ["class"]);
  return (
    <AccordionPrimitive.Item class={cn("border-b", props.class)} {...rest} />
  );
};

const AccordionTrigger: Component<
  ComponentProps<typeof AccordionPrimitive.Trigger>
> = (props) => {
  const [, rest] = splitProps(props, ["class", "children"]);
  return (
    <AccordionPrimitive.Header class="flex">
      <AccordionPrimitive.Trigger
        class={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-expanded]>svg]:rotate-180",
          props.class,
        )}
        {...rest}
      >
        {props.children}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
          class="size-4 shrink-0 transition-transform duration-200"
        >
          <path d="M6 9l6 6l6 -6" />
        </svg>
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  );
};

const AccordionContent: Component<
  ComponentProps<typeof AccordionPrimitive.Content>
> = (props) => {
  const [, rest] = splitProps(props, ["class", "children"]);
  return (
    <AccordionPrimitive.Content
      class={cn(
        "animate-accordion-up overflow-hidden text-sm transition-all data-[expanded]:animate-accordion-down",
        props.class,
      )}
      {...rest}
    >
      <div class="pb-4 pt-0">{props.children}</div>
    </AccordionPrimitive.Content>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };

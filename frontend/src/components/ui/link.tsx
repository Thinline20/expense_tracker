import { splitProps, type ComponentProps } from "solid-js";
import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "./button";
import { cn } from "~/lib/utils";

type LinkProps = ComponentProps<"a"> & VariantProps<typeof buttonVariants>;

function Link(props: LinkProps) {
  const [, rest] = splitProps(props, ["class", "variant", "size"]);

  return (
    <a
      class={cn(
        buttonVariants({ variant: props.variant, size: props.size }),
        props.class,
      )}
      {...rest}
    />
  );
}

export { Link };

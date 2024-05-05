import type { Component, ComponentProps } from "solid-js"
import { splitProps } from "solid-js"

import { Progress as ProgressPrimitive } from "@kobalte/core/progress"

import { Label } from "~/components/ui/label"

const Progress: Component<
  ComponentProps<typeof ProgressPrimitive>
> = (props) => {
  const [, rest] = splitProps(props, ["children"])
  return (
    <ProgressPrimitive {...rest}>
      {props.children}
      <ProgressPrimitive.Track class="relative h-4 w-full overflow-hidden rounded-full bg-secondary">
        <ProgressPrimitive.Fill class="h-full w-[var(--kb-progress-fill-width)] flex-1 bg-primary transition-all" />
      </ProgressPrimitive.Track>
    </ProgressPrimitive>
  )
}

const ProgressLabel: Component<
  ComponentProps<typeof ProgressPrimitive.Label>
> = (props) => {
  return <ProgressPrimitive.Label as={Label} {...props} />
}

const ProgressValueLabel: Component<
  ComponentProps<typeof ProgressPrimitive.ValueLabel>
> = (props) => {
  return <ProgressPrimitive.ValueLabel as={Label} {...props} />
}

export { Progress, ProgressLabel, ProgressValueLabel }

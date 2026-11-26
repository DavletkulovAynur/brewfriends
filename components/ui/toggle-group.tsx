"use client"

import * as React from "react"
import { cn } from "cn"
import { ToggleGroup as ToggleGroupPrimitive } from "radix-ui"

function ToggleGroup({
    className,
    ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root>) {
    return (
        <ToggleGroupPrimitive.Root
            data-slot="toggle-group"
            className={cn("group/toggle-group flex w-fit items-center", className)}
            {...props}
        />
    )
}

function ToggleGroupItem({
    className,
    ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item>) {
    return (
        <ToggleGroupPrimitive.Item
            data-slot="toggle-group-item"
            className={cn(
                "inline-flex items-center justify-center whitespace-nowrap font-medium transition-colors outline-none focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                className,
            )}
            {...props}
        />
    )
}

export { ToggleGroup, ToggleGroupItem }
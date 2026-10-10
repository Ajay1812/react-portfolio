"use client";

import * as React from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 rounded-xl text-sm font-bold whitespace-nowrap transition-all outline-none cursor-pointer focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground shadow-[0_10px_30px_rgba(37,99,235,0.35)] hover:shadow-[0_14px_38px_rgba(37,99,235,0.45)] hover:-translate-y-0.5 active:translate-y-0",
        destructive: "bg-destructive text-white hover:bg-destructive/90",
        outline:
          "border border-input bg-card text-foreground hover:border-primary hover:text-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/70",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-accent-foreground underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 px-4 text-[0.85rem]",
        lg: "h-12 px-8 text-base",
        icon: "size-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? React.Children.only(props.children).type : "button";
  if (asChild) {
    const child = React.Children.only(props.children);
    return React.cloneElement(child, {
      className: cn(buttonVariants({ variant, size }), child.props.className),
    });
  }
  return <Comp className={cn(buttonVariants({ variant, size }), className)} {...props} />;
}

export { Button, buttonVariants };

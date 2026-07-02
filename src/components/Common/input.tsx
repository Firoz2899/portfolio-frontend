import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const inputVariants = cva(
  [
    "flex w-full transition-colors duration-200",
    "border bg-background",
    "placeholder:text-muted-foreground",
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "file:border-0",
    "file:bg-transparent",
    "file:text-sm",
    "file:font-medium",
    "file:text-foreground",
    "focus:border-transparent",
    "focus:ring-teal-500",
    "focus:ring-2"
  ].join(" "),
  {
    variants: {
      variant: {
        outline: "",
        filled: "border-transparent bg-muted",
        flushed:
          "rounded-none border-0 border-b bg-transparent px-0 focus-visible:ring-0",
        underlined:
          "rounded-none border-x-0 border-t-0 bg-transparent px-0 focus-visible:ring-0",
      },

      size: {
        xs: "h-8 px-2 text-xs",
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-4 text-sm",
        lg: "h-12 px-5 text-base",
        xl: "h-14 px-6 text-lg",
      },

      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },

      color: {
        default: "",
        primary: "",
        success: "",
        warning: "",
        danger: "",
      },

      fullWidth: {
        true: "w-full",
        false: "",
      },

      theme: {
        light: "",
        dark: ""
      }
    },

    compoundVariants: [
      // Theme
      {
        variant: "outline",
        theme: "light",
        class:
          "bg-white border-gray-300 text-gray-800 focus:ring-teal-500 focus:border-transparent",
      },
      {
        variant: "outline",
        theme: "dark",
        class:
          "bg-gray-700 border-gray-600 text-gray-200 placeholder:text-gray-400 focus:ring-teal-500 focus:border-transparent",
      },
      // Outline
      {
        variant: "outline",
        color: "default",
        class: "border-input",
      },
      {
        variant: "outline",
        color: "primary",
        class:
          "border-primary focus-visible:ring-primary/30",
      },
      {
        variant: "outline",
        color: "success",
        class:
          "border-green-500 focus-visible:ring-green-500/30",
      },
      {
        variant: "outline",
        color: "warning",
        class:
          "border-yellow-500 focus-visible:ring-yellow-500/30",
      },
      {
        variant: "outline",
        color: "danger",
        class:
          "border-red-500 focus-visible:ring-red-500/30",
      },

      // Filled
      {
        variant: "filled",
        color: "default",
        class: "bg-muted",
      },
      {
        variant: "filled",
        color: "primary",
        class:
          "bg-primary/10 border-primary",
      },
      {
        variant: "filled",
        color: "success",
        class:
          "bg-green-50 border-green-500",
      },
      {
        variant: "filled",
        color: "warning",
        class:
          "bg-yellow-50 border-yellow-500",
      },
      {
        variant: "filled",
        color: "danger",
        class:
          "bg-red-50 border-red-500",
      },

      // Underlined
      {
        variant: ["underlined", "flushed"],
        color: "default",
        class: "border-b-input",
      },
      {
        variant: ["underlined", "flushed"],
        color: "primary",
        class:
          "border-b-primary",
      },
      {
        variant: ["underlined", "flushed"],
        color: "success",
        class:
          "border-b-green-500",
      },
      {
        variant: ["underlined", "flushed"],
        color: "warning",
        class:
          "border-b-yellow-500",
      },
      {
        variant: ["underlined", "flushed"],
        color: "danger",
        class:
          "border-b-red-500",
      },
    ],

    defaultVariants: {
      variant: "outline",
      size: "md",
      radius: "md",
      color: "default",
      fullWidth: true,
    },
  }
);

export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "color" | "size">,
    VariantProps<typeof inputVariants> {}

export function Input({
  className,
  variant,
  size,
  radius,
  color,
  fullWidth,
  type,
  ...props
}: InputProps) {
  return (
    <input
      type={type}
      className={cn(
        inputVariants({
          variant,
          size,
          radius,
          color,
          fullWidth,
        }),
        className
      )}
      {...props}
    />
  );
}

export { inputVariants };
// import * as React from "react";

// type LabelProps = React.LabelHTMLAttributes<HTMLLabelElement>;

// export const Label = ({
//   children,
//   className,
//   ...props
// }: LabelProps) => {
//   return (
//     <label
//       className={`block text-sm font-medium mb-1 ${className ?? ""}`}
//       {...props}
//     >
//       {children}
//     </label>
//   );
// };

import * as React from "react"
import * as LabelPrimitive from "@radix-ui/react-label"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/utils"

// const labelVariants = cva(
//   "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
// )

const labelVariants = cva(
  // Default classes (matches your existing component)
  "block",
  {
    variants: {
      variant: {
        default: "",
        form: "leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        inline: "inline-block mb-0",
      },
      fontWeight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },
      required: {
        true: "after:content-['*'] after:text-red-500 after:ml-1",
        false: "",
      },
      size: {
        sm: "text-xs",
        md: "text-sm",
        lg: "text-base",
      },
      color: {
        default: "text-gray-700",
        muted: "text-gray-500",
        primary: "text-primary",
        destructive: "text-red-600",
      },
      spacing: {
        none: "mb-0",
        sm: "mb-1",
        md: "mb-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "md",
      required: false,
      color: "default",
      fontWeight: "medium",
      spacing: "sm"
    },
  }
);

export interface LabelProps
  extends Omit<React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>, "color">,
    VariantProps<typeof labelVariants> {}

export const Label = React.forwardRef<
  React.ComponentRef<typeof LabelPrimitive.Root>,
  LabelProps
>(({ className, variant, size, required, color, fontWeight, spacing, ...props }, ref) => (
  <LabelPrimitive.Root
    ref={ref}
    className={cn(labelVariants({ variant, size, required, color, fontWeight, spacing }), className)}
    {...props}
  />
));

Label.displayName = LabelPrimitive.Root.displayName;
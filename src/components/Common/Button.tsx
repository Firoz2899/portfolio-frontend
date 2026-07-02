// import * as React from "react";
// import { Slot } from "@radix-ui/react-slot";
// import { Loader2 } from "lucide-react";
// import { type VariantProps } from "class-variance-authority";

// import { cn } from "@/utils/class.helpers";
// import {buttonVariants} from '@/styles/variants/Button'

// export interface ButtonProps
//   extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color">,
//     VariantProps<typeof buttonVariants> {
//   asChild?: boolean;
//   loading?: boolean;
//   loadingText?: React.ReactNode;
//   leftIcon?: React.ReactNode;
//   rightIcon?: React.ReactNode;
// }

// export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
//   (
//     {
//       className,
//       variant,
//       color,
//       size,
//       radius,
//       fontWeight,
//       fullWidth,
//       loading = false,
//       loadingText,
//       leftIcon,
//       rightIcon,
//       children,
//       disabled,
//       asChild = false,
//       ...props
//     },
//     ref
//   ) => {
//     const Comp = asChild ? Slot : "button";

//     return (
//       <Comp
//         ref={ref}
//         disabled={disabled || loading}
//         className={cn(
//           buttonVariants({
//             variant,
//             color,
//             size,
//             radius,
//             fontWeight,
//             fullWidth,
//             loading,
//           }),
//           className
//         )}
//         {...props}
//       >
//         {loading ? (
//           <>
//             <Loader2 className="animate-spin" />
//             {loadingText ?? children}
//           </>
//         ) : (
//           <>
//             {leftIcon}
//             {children}
//             {rightIcon}
//           </>
//         )}
//       </Comp>
//     );
//   }
// );

// Button.displayName = "Button";


import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { Loader2 } from "lucide-react";

import { cn } from "@/utils/class.helpers";
import { buttonVariants } from "@/styles/variants/Button";

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "color"> {
  asChild?: boolean;

  variant?:
    | "solid"
    | "outline"
    | "ghost"
    | "soft"
    | "gradient"
    | "link";

  color?:
    | "primary"
    | "secondary"
    | "teal"
    | "success"
    | "danger"
    | "warning"
    | "gray"
    | "white";

  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "icon";

  radius?:
    | "none"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "full";

  elevation?:
    | "none"
    | "sm"
    | "md"
    | "lg";

  animation?:
    | "none"
    | "lift"
    | "scale";

  fullWidth?: boolean;

  loading?: boolean;

  loadingText?: React.ReactNode;

  loadingPosition?:
    | "replace"
    | "left";

  leftIcon?: React.ReactNode;

  rightIcon?: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,

      variant = "solid",
      color = "primary",
      size = "md",
      radius = "md",
      elevation = "none",
      animation = "none",

      fullWidth = false,

      loading = false,
      loadingText,
      loadingPosition = "replace",

      leftIcon,
      rightIcon,

      children,

      disabled,

      asChild = false,

      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";

    const isDisabled = disabled || loading;

    const spinner = (
      <Loader2 className="animate-spin" />
    );

    const renderContent = () => {
      if (loading) {
        if (loadingPosition === "replace") {
          return (
            <>
              {spinner}
              {loadingText ?? children}
            </>
          );
        }

        return (
          <>
            {spinner}
            {loadingText ?? children}
          </>
        );
      }

      return (
        <>
          {leftIcon}
          {children}
          {rightIcon}
        </>
      );
    };

    return (
      <Comp
        ref={ref}
        disabled={isDisabled}
        className={cn(
          buttonVariants({
            variant,
            color,
            size,
            radius,
            elevation,
            animation,
            fullWidth,
            loading,
          }),
          className
        )}
        {...props}
      >
        {renderContent()}
      </Comp>
    );
  }
);

Button.displayName = "Button";
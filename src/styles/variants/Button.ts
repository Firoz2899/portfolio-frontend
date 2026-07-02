import { cva } from "class-variance-authority";

// export const buttonVariants = cva(
//   "inline-flex items-center justify-center gap-2 whitespace-nowrap transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
//   {
//     variants: {
//       variant: {
//         solid: "",
//         outline: "border bg-transparent",
//         ghost: "bg-transparent hover:bg-accent",
//         link: "bg-transparent underline-offset-4 hover:underline p-0 h-auto shadow-none",
//       },

//       color: {
//         primary: "",
//         secondary: "",
//         success: "",
//         danger: "",
//         warning: "",
//         teal: "",
//       },

//       size: {
//         xs: "h-7 px-2 text-xs [&_svg]:size-3",
//         sm: "h-9 px-3 text-sm [&_svg]:size-4",
//         md: "h-10 px-4 text-sm [&_svg]:size-4",
//         lg: "h-11 px-6 text-base [&_svg]:size-5",
//         xl: "h-12 px-8 text-lg [&_svg]:size-5",
//         icon: "h-10 w-10 p-0 [&_svg]:size-5",
//       },

//       radius: {
//         none: "rounded-none",
//         sm: "rounded-sm",
//         md: "rounded-md",
//         lg: "rounded-lg",
//         xl: "rounded-xl",
//         full: "rounded-full",
//       },

//       fontWeight: {
//         normal: "font-normal",
//         medium: "font-medium",
//         semibold: "font-semibold",
//         bold: "font-bold",
//       },

//       fullWidth: {
//         true: "w-full",
//         false: "",
//       },

//       loading: {
//         true: "pointer-events-none opacity-70",
//         false: "",
//       },
//     },

//     compoundVariants: [
//       // PRIMARY
//       {
//         variant: "solid",
//         color: "primary",
//         class:
//           "bg-primary text-primary-foreground hover:bg-primary/90",
//       },
//       {
//         variant: "outline",
//         color: "primary",
//         class:
//           "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
//       },
//       {
//         variant: "ghost",
//         color: "primary",
//         class: "text-primary hover:bg-primary/10",
//       },

//       // SECONDARY
//       {
//         variant: "solid",
//         color: "secondary",
//         class:
//           "bg-secondary text-secondary-foreground hover:bg-secondary/80",
//       },
//       {
//         variant: "outline",
//         color: "secondary",
//         class:
//           "border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground",
//       },
//       {
//         variant: "ghost",
//         color: "secondary",
//         class: "text-secondary hover:bg-secondary/10",
//       },

//       // SUCCESS
//       {
//         variant: "solid",
//         color: "success",
//         class:
//           "bg-green-600 text-white hover:bg-green-700",
//       },
//       {
//         variant: "outline",
//         color: "success",
//         class:
//           "border-green-600 text-green-600 hover:bg-green-600 hover:text-white",
//       },
//       {
//         variant: "ghost",
//         color: "success",
//         class:
//           "text-green-600 hover:bg-green-100",
//       },

//       // teal
//       {
//         variant: "solid",
//         color: "teal",
//         class:
//           "bg-teal-600 text-white hover:bg-teal-700",
//       },
//       {
//         variant: "outline",
//         color: "teal",
//         class:
//           "bg-teal-500 border-teal-600 text-teal-600 hover:bg-teal-600 hover:text-white",
//       },
//       {
//         variant: "ghost",
//         color: "teal",
//         class:
//           "text-teal-600 hover:bg-teal-100",
//       },

//       // DANGER
//       {
//         variant: "solid",
//         color: "danger",
//         class:
//           "bg-red-600 text-white hover:bg-red-700",
//       },
//       {
//         variant: "outline",
//         color: "danger",
//         class:
//           "border-red-600 text-red-600 hover:bg-red-600 hover:text-white",
//       },
//       {
//         variant: "ghost",
//         color: "danger",
//         class:
//           "text-red-600 hover:bg-red-100",
//       },

//       // WARNING
//       {
//         variant: "solid",
//         color: "warning",
//         class:
//           "bg-yellow-500 text-black hover:bg-yellow-600",
//       },
//       {
//         variant: "outline",
//         color: "warning",
//         class:
//           "border-yellow-500 text-yellow-600 hover:bg-yellow-500 hover:text-black",
//       },
//       {
//         variant: "ghost",
//         color: "warning",
//         class:
//           "text-yellow-600 hover:bg-yellow-100",
//       },

//       // LINK COLORS
//       {
//         variant: "link",
//         color: "primary",
//         class: "text-primary",
//       },
//       {
//         variant: "link",
//         color: "danger",
//         class: "text-red-600",
//       },
//       {
//         variant: "link",
//         color: "success",
//         class: "text-green-600",
//       },
//     ],

//     defaultVariants: {
//       variant: "solid",
//       color: "primary",
//       size: "md",
//       radius: "md",
//       fontWeight: "medium",
//       fullWidth: false,
//       loading: false,
//     },
//   }
// );

export const buttonVariants = cva(
  [
    // Layout
    "inline-flex items-center justify-center gap-2",

    // Typography
    "font-medium whitespace-nowrap",

    // Animation
    "transition-all duration-200",

    // Focus
    "focus-visible:outline-none",
    "focus-visible:ring-2",
    "focus-visible:ring-ring",
    "focus-visible:ring-offset-2",

    // Disabled
    "disabled:pointer-events-none",
    "disabled:opacity-50",

    // Icons
    "[&_svg]:pointer-events-none",
    "[&_svg]:shrink-0",
    "[&_svg]:flex-shrink-0",
  ].join(" "),
  {
    variants: {
      variant: {
        solid: "",
        outline: "border bg-transparent",
        ghost: "bg-transparent",
        soft: "",
        gradient: "",
        link: "underline-offset-4 hover:underline p-0 h-auto shadow-none",
      },

      color: {
        primary: "",
        secondary: "",
        teal: "",
        success: "",
        danger: "",
        warning: "",
        gray: "",
        white: "",
      },

      size: {
        xs: "h-7 px-2 text-xs [&_svg]:size-3",
        sm: "h-9 px-3 text-sm [&_svg]:size-4",
        md: "h-10 px-4 text-sm [&_svg]:size-4",
        lg: "h-11 px-6 text-base [&_svg]:size-5",
        xl: "h-12 px-8 text-lg [&_svg]:size-5",

        iconXs: "h-7 w-7 p-0 [&_svg]:size-3",
        iconSm: "h-8 w-8 p-0 [&_svg]:size-4",
        icon: "h-10 w-10 p-0 [&_svg]:size-5",
        iconLg: "h-12 w-12 p-0 [&_svg]:size-6",
      },

      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },

      elevation: {
        none: "",
        sm: "shadow-sm",
        md: "shadow",
        lg: "shadow-lg",
      },

      animation: {
        none: "",
        lift: "hover:-translate-y-0.5",
        scale: "hover:scale-105",
        bounce: "active:scale-95",
      },

      fontWeight: {
        normal: "font-normal",
        medium: "font-medium",
        semibold: "font-semibold",
        bold: "font-bold",
      },

      fullWidth: {
        true: "w-full",
        false: "",
      },

      loading: {
        true: "pointer-events-none opacity-70",
        false: "",
      },

      iconSpacing: {
        none: "gap-0",
        xs: "gap-1",
        sm: "gap-1.5",
        md: "gap-2",
        lg: "gap-3",
      },

      isIconOnly: {
        true: "",
        false: "",
      },
    },

    compoundVariants: [
        // =========================
        // PRIMARY
        // =========================
        {
            variant: "solid",
            color: "primary",
            class:
            "bg-primary text-primary-foreground hover:bg-primary/90",
        },
        {
            variant: "outline",
            color: "primary",
            class:
            "border border-primary text-primary bg-transparent hover:bg-primary hover:text-primary-foreground",
        },
        {
            variant: "ghost",
            color: "primary",
            class:
            "text-primary hover:bg-primary/10",
        },
        {
            variant: "soft",
            color: "primary",
            class:
            "bg-primary/10 text-primary hover:bg-primary/20",
        },
        {
            variant: "gradient",
            color: "primary",
            class:
            "bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:opacity-90",
        },
        {
            variant: "link",
            color: "primary",
            class:
            "text-primary hover:underline",
        },

        // =========================
        // SECONDARY
        // =========================
        {
            variant: "solid",
            color: "secondary",
            class:
            "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        },
        {
            variant: "outline",
            color: "secondary",
            class:
            "border border-secondary text-secondary bg-transparent hover:bg-secondary hover:text-secondary-foreground",
        },
        {
            variant: "ghost",
            color: "secondary",
            class:
            "text-secondary hover:bg-secondary/10",
        },
        {
            variant: "soft",
            color: "secondary",
            class:
            "bg-secondary/10 text-secondary hover:bg-secondary/20",
        },
        {
            variant: "gradient",
            color: "secondary",
            class:
            "bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground hover:opacity-90",
        },
        {
            variant: "link",
            color: "secondary",
            class:
            "text-secondary hover:underline",
        },

        // =========================
        // TEAL
        // =========================
        {
            variant: "solid",
            color: "teal",
            class:
            "bg-teal-600 text-white hover:bg-teal-700",
        },
        {
            variant: "outline",
            color: "teal",
            class:
            "border border-teal-600 text-teal-600 bg-transparent hover:bg-teal-600 hover:text-white",
        },
        {
            variant: "ghost",
            color: "teal",
            class:
            "text-teal-600 hover:bg-teal-50",
        },
        {
            variant: "soft",
            color: "teal",
            class:
            "bg-teal-50 text-teal-700 hover:bg-teal-100",
        },
        {
            variant: "gradient",
            color: "teal",
            class:
            "bg-gradient-to-r from-teal-500 to-cyan-600 text-white hover:opacity-90",
        },
        {
            variant: "link",
            color: "teal",
            class:
            "text-teal-600 hover:underline",
        },

        // =========================
        // SUCCESS
        // =========================
        {
            variant: "solid",
            color: "success",
            class:
            "bg-green-600 text-white hover:bg-green-700",
        },
        {
            variant: "outline",
            color: "success",
            class:
            "border border-green-600 text-green-600 bg-transparent hover:bg-green-600 hover:text-white",
        },
        {
            variant: "ghost",
            color: "success",
            class:
            "text-green-600 hover:bg-green-50",
        },
        {
            variant: "soft",
            color: "success",
            class:
            "bg-green-50 text-green-700 hover:bg-green-100",
        },
        {
            variant: "gradient",
            color: "success",
            class:
            "bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:opacity-90",
        },
        {
            variant: "link",
            color: "success",
            class:
            "text-green-600 hover:underline",
        },

        // =========================
        // DANGER
        // =========================
        {
            variant: "solid",
            color: "danger",
            class:
            "bg-red-600 text-white hover:bg-red-700",
        },
        {
            variant: "outline",
            color: "danger",
            class:
            "border border-red-600 text-red-600 bg-transparent hover:bg-red-600 hover:text-white",
        },
        {
            variant: "ghost",
            color: "danger",
            class:
            "text-red-600 hover:bg-red-50",
        },
        {
            variant: "soft",
            color: "danger",
            class:
            "bg-red-50 text-red-700 hover:bg-red-100",
        },
        {
            variant: "gradient",
            color: "danger",
            class:
            "bg-gradient-to-r from-red-500 to-rose-600 text-white hover:opacity-90",
        },
        {
            variant: "link",
            color: "danger",
            class:
            "text-red-600 hover:underline",
        },

        // =========================
        // WARNING
        // =========================
        {
            variant: "solid",
            color: "warning",
            class:
            "bg-yellow-500 text-black hover:bg-yellow-600",
        },
        {
            variant: "outline",
            color: "warning",
            class:
            "border border-yellow-500 text-yellow-600 bg-transparent hover:bg-yellow-500 hover:text-black",
        },
        {
            variant: "ghost",
            color: "warning",
            class:
            "text-yellow-600 hover:bg-yellow-50",
        },
        {
            variant: "soft",
            color: "warning",
            class:
            "bg-yellow-50 text-yellow-700 hover:bg-yellow-100",
        },
        {
            variant: "gradient",
            color: "warning",
            class:
            "bg-gradient-to-r from-yellow-400 to-orange-500 text-black hover:opacity-90",
        },
        {
            variant: "link",
            color: "warning",
            class:
            "text-yellow-700 hover:underline",
        },

        // =========================
        // GRAY
        // =========================
        {
            variant: "solid",
            color: "gray",
            class:
            "bg-gray-600 text-white hover:bg-gray-700",
        },
        {
            variant: "outline",
            color: "gray",
            class:
            "border border-gray-400 text-gray-700 bg-transparent hover:bg-gray-700 hover:text-white",
        },
        {
            variant: "ghost",
            color: "gray",
            class:
            "text-gray-700 hover:bg-gray-100",
        },
        {
            variant: "soft",
            color: "gray",
            class:
            "bg-gray-100 text-gray-700 hover:bg-gray-200",
        },
        {
            variant: "gradient",
            color: "gray",
            class:
            "bg-gradient-to-r from-gray-500 to-gray-700 text-white hover:opacity-90",
        },
        {
            variant: "link",
            color: "gray",
            class:
            "text-gray-700 hover:underline",
        },

        // =========================
        // WHITE
        // =========================
        {
            variant: "solid",
            color: "white",
            class:
            "bg-white text-gray-800 border border-gray-200 hover:bg-gray-50",
        },
        {
            variant: "outline",
            color: "white",
            class:
            "border border-white text-white bg-transparent hover:bg-white hover:text-black",
        },
        {
            variant: "ghost",
            color: "white",
            class:
            "text-white hover:bg-white/10",
        },
        {
            variant: "soft",
            color: "white",
            class:
            "bg-white/20 backdrop-blur text-white hover:bg-white/30",
        },
        {
            variant: "gradient",
            color: "white",
            class:
            "bg-gradient-to-r from-white to-gray-100 text-gray-900 hover:opacity-90",
        },
        {
            variant: "link",
            color: "white",
            class:
            "text-white hover:underline",
        },
    ],

    defaultVariants: {
        variant: "solid",
        color: "primary",
        size: "md",
        radius: "md",
        elevation: "none",
        animation: "none",
        fontWeight: "medium",
        fullWidth: false,
        loading: false,
        iconSpacing: "md",
        isIconOnly: false,
    },
  }
);
import { cn } from "@/utils";
import { FormControl, FormItem, FormLabel, FormMessage } from "./Forms";
import type { PropsWithChildren } from "react";

interface IHookFormFieldProps
    extends PropsWithChildren {
  label: string;
  labelClassName?: string;
  formItemClassName?: string;
  errorClassName?: string; 
  childrenContainerClassName?: string; 
  startAdornment?: React.ReactNode;
  endAdornment?: React.ReactNode;
}

export function HookFormField({
  label,
  labelClassName,
  formItemClassName,
  errorClassName,
  childrenContainerClassName,
  startAdornment,
  endAdornment,
  children
}: IHookFormFieldProps) {
  return (
    <FormItem>
      <div className={cn(formItemClassName)}>
        <FormLabel className={cn(labelClassName)}>{label}</FormLabel>

          <div className="relative">
            {startAdornment && (
                <>{startAdornment}</>
            )}

            <FormControl>
                {children}
            </FormControl>
            {endAdornment && (
              <div className={cn("absolute inset-y-0 right-0 pr-3 flex items-center", childrenContainerClassName)}>
                {endAdornment}
              </div>
            )}
          </div>

        <FormMessage className={cn("text-red-500 text-sm mt-1", errorClassName)} />
      </div>
    </FormItem>
  );
}

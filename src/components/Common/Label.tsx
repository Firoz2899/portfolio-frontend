import * as React from "react";

interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {}

export const Label = ({
  children,
  className,
  ...props
}: LabelProps) => {
  return (
    <label
      className={`block text-sm font-medium text-gray-700 mb-1 ${className ?? ""}`}
      {...props}
    >
      {children}
    </label>
  );
};
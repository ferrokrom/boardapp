import React, { ReactElement, ReactNode } from "react";
import { Spinner } from "./Spinner";

const sizes = {
  sm: "py-2 px-2 text-sm w-8 h-8",
  md: "py-2 px-6 text-md",
  lg: "py-3 px-8 text-lg",
  xsm: "py-2 px-2 text-sm",
};
const variants = {
  primary: "bg-sky-500",
  secondary: "bg-red-400",
  nobg: "text-gray-400",
  third: "bg-yellow-400",
};
export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant: keyof typeof variants;
  size: keyof typeof sizes;
  isLoading?: boolean;
  icon?: ReactNode;
  classname: string;
  text?: string;
  children?: ReactElement;
};

function Button({
  type = "button",
  classname = "",
  variant = "primary",
  size = "md",
  children,
  text = "",
  isLoading = false,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`flex ${sizes[size]} ${classname} justify-center gap-1 items-center border ${variants[variant]} transition text-white border-gray-300 disabled:opacity-70 disabled:cursor-not-allowed rounded-md shadow-sm font-medium focus:outline-none hover:opacity-80 `}
      {...props}
    >
      {isLoading && <Spinner size="sm" className="text-current" />}
      {props.icon}
      {children}
      {text}
    </button>
  );
}

export default Button;

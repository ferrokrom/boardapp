import React, { ChangeEvent } from "react";

export type TextareaProps =
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
    isLoading?: boolean;
    onFn?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
    classname: string;
    label: string;
    text?: string;
    value?: string;
  };

function TextareaField({
  label = "",
  classname = "",
  text = "",
  value = "",
  isLoading = false,
  ...props
}: TextareaProps) {
  return (
    <>
      <label htmlFor="input">{label}</label>
      <textarea
        value={value}
        className={`appearance-none block w-full h-32 px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-slate-500 focus:border-slate-500 sm:text-sm`}
        {...props}
      />
    </>
  );
}

export default TextareaField;

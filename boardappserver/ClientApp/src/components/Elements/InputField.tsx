import React, { forwardRef } from "react";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean;
  classname: string;
  ref?: React.LegacyRef<HTMLInputElement>;
  label: string;
  text?: string;
  value?: string;
  type?: "text" | "email" | "password";
};

const InputField = forwardRef(
  (props: InputProps, ref: React.LegacyRef<HTMLInputElement>) => {
    const { type, label, classname, value, isLoading } = props;
    return (
      <>
        <label htmlFor="input">{label}</label>
        <input
          type={type}
          value={value}
          ref={ref}
          disabled={isLoading}
          className={`${classname} appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-black  focus:border-black sm:text-sm`}
          {...props}
        />
      </>
    );
  }
);
export default InputField;

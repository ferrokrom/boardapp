import React from "react";
import { FaSearch } from "react-icons/fa";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  isLoading?: boolean;
  classname: string;
  label: string;
  text?: string;
  value?: string;
  type?: "text" | "email" | "password";
};

function SearchField({
  type = "text",
  label = "",
  classname = "",
  text = "",
  value = "",
  isLoading = false,
  ...props
}: InputProps) {
  return (
    <div className="pt-2 relative mx-auto text-gray-600">
      <input
        className="border-2 w-full border-gray-300 bg-white h-10 px-3 pr-16 rounded-lg text-sm focus:outline-none"
        name="search"
        {...props}
        placeholder="Search User"
      />
      <button type="submit" className="absolute right-0 top-0 mt-5 mr-4">
        <FaSearch size={14} />
      </button>
    </div>
  );
}

export default SearchField;

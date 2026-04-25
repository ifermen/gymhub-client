import type { ChangeEvent } from "react";

interface InputProps {
  id: string;
  name: string;
  type: "email" | "text" | "password" | "number";
  placeholder: string;
  value: string | number;
  title: string;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ id, name, type, placeholder, title = "", value, handleChange }: InputProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="font-bold text-sm text-text-500">
        {title.toUpperCase()}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className="
          w-full
          px-3
          pt-1
          border
          border-primary-500
          rounded-xl
          bg-background-950
          text-lg
          placeholder-text-400
          text-text-200
          outline-none
          hover:border-primary-600
          focus:border-primary-400
          focus:bg-primary-950
          focus:ring-2 
          focus:ring-primary-400/30
          "/>
    </div>
  );
}

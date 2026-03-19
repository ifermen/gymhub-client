import type { ChangeEvent } from "react";

interface InputProps {
  id: string;
  name: string;
  type: "email" | "type" | "password";
  placeholder: string;
  value: string|number;
  handleChange: (event:ChangeEvent<HTMLInputElement>) => void;
}

export function Input({ id, name, type, placeholder, value, handleChange }: InputProps) {
  return (
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
        border-3
        border-primary-500
        rounded-full
        bg-background-900
        text-xl
        font-bold
        placeholder-text-400
        text-text-400
        outline-none
        hover:border-primary-600
        focus:border-primary-400
        focus:bg-primary-950
        "/>
  );
}

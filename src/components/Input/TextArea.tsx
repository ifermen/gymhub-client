import type { ChangeEvent } from "react";

interface InputProps {
  id: string;
  name: string;
  placeholder: string;
  value: string | number;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ id, name, placeholder, value, handleChange }: InputProps) {
  return (
    <textarea
      id={id}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={handleChange}
      className="
        w-full
        px-3
        pt-1
        border-3
        border-primary-500
        rounded-2xl
        bg-background-900
        text-xl
        font-bold
        placeholder-text-400
        text-text-200
        outline-none
        hover:border-primary-600
        focus:border-primary-400
        focus:bg-primary-950
        "/>
  );
}

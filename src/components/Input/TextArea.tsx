import type { ChangeEvent } from "react";

interface InputProps {
  id: string;
  name: string;
  placeholder: string;
  value: string | number;
  title: string;
  rows: number;
  handleChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

export function TextArea({ id, name, placeholder, value, title, rows, handleChange }: InputProps) {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={id}
        className="font-bold text-sm text-text-500">
        {title.toUpperCase()}
      </label>
      <textarea
        id={id}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        rows={rows}
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

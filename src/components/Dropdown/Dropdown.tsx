interface DropdownProps {
  id: string;
  title: string;
  options: Map<string, string>;
  handlerChange: (value: string) => void;
  value?: string | number;
}

export function Dropdown({ id, title, options, handlerChange, value }: DropdownProps) {
  return (
    <div className="flex flex-col w-full bg-primary-600 border border-primary-400 p-3 rounded-xl">
      <label htmlFor={id} className="font-bold text-sm text-white">{title.toUpperCase()}</label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => handlerChange(e.target.value)}
        className="rounded-lg w-full pt-1 px-1 text-lg sm:text-xl">
        {Array.from(options.entries()).map((([key, value]) => (
          <option key={key} value={key}>{value}</option>
        )))}
      </select>
    </div>
  )
}
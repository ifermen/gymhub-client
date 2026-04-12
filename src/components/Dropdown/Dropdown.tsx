interface DropdownProps {
  id: string;
  title: string;
  options: Map<string, string>;
  handlerChange: (value: string) => void;
}

export function Dropdown({ id, title, options, handlerChange }: DropdownProps) {
  return (
    <div className="
      flex
      flex-col
      sm:flex-row
      items-center
      px-2
      py-1
      sm:gap-2
      rounded-3xl
      sm:rounded-full
      border-3
      text-xl
      font-bold
      bg-gradient-to-br
      to-primary-500
      from-primary-600
      border-primary-500
      hover:to-primary-600
      hover:from-primary-700
      hover:border-primary-600
    ">
      <label
        htmlFor={id}
        className="
          pt-1
          flex
          flex-row
          items-center
        ">{title}</label>
      <select
        id={id}
        name={id}
        onChange={(e) => handlerChange(e.target.value)}
        className="
          rounded-full
          w-full
          sm:w-fit
          pt-1
          px-1
        ">
        {Array.from(options.entries()).map((([key, value]) => (
          <option key={key} value={key}>{value}</option>
        )))}
      </select>
    </div>
  )
}
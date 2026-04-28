interface DataProps {
  title: string;
  value: string;
  size?: "2xl" | "xl";
  sizeMobile?: "xl" | "lg"
}
export function Data({ title, value, size = "xl", sizeMobile = "lg" }: DataProps) {

  return (
    <div className="flex flex-col w-full bg-background-950 border border-background-800 p-3 rounded-xl">
      <span className="font-bold text-sm text-text-500">{title}</span>
      <span className={`sm:text-${size} text-${sizeMobile}`}>{value}</span>
    </div>
  )
}
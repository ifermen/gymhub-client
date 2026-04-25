interface DataProps {
  title: string;
  value: string;
}
export function Data({ title, value }: DataProps) {

  return (
    <div className="flex flex-col w-full bg-background-950 border border-background-800 p-3 rounded-xl">
      <span className="font-bold text-sm text-text-500">{title}</span>
      <span className="text-xl">{value}</span>
    </div>
  )
}
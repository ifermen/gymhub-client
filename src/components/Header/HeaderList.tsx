interface HeaderListProps {
  title: string;
  type: string;
}
export function HeaderList({ title, type }: HeaderListProps) {
  return (
    <div className="sm:p-7 p-3 flex flex-col w-full">
      <span className="font-bold text-text-500 text-sm">{type}</span>
      <h3 className="sm:text-3xl text-xl">{title}</h3>
    </div>
  );
}
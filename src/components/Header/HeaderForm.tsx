interface HeaderFormProps {
  title: string;
  type: string;
}
export function HeaderForm({ title, type }: HeaderFormProps) {
  return (
    <div className="sm:p-7 p-3 flex flex-col w-full">
      <span className="font-bold text-text-500 text-sm">{type}</span>
      <h3 className="sm:text-3xl text-xl">{title}</h3>
    </div>
  );
}
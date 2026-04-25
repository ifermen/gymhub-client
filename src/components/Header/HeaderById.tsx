import { Pill } from "../Pill/Pill";

interface HeaderByIdProps {
  title: string;
  type: string;
  isActive: boolean;
}
export function HeaderById({ title, type, isActive }: HeaderByIdProps) {
  return (
    <div className="p-7 flex flex-col w-full">
      <span className="font-bold text-text-500 text-sm">{type}</span>
      <h3 className="text-3xl">{title}</h3>
      {isActive ? <Pill variant="success">Activa</Pill> : <Pill variant="danger">Desactiva</Pill>}
    </div>
  );
}
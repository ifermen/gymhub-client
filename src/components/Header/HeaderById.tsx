import { Pill } from "../Pill/Pill";

interface HeaderByIdProps {
  title: string;
  type: string;
  isActive: boolean;
}
export function HeaderById({ title, type, isActive }: HeaderByIdProps) {
  return (
    <div className="sm:p-7 p-3 flex flex-col w-full">
      <span className="font-bold text-text-500 text-sm">{type}</span>
      <h3 className="sm:text-3xl text-xl">{title}</h3>
      {isActive ? <Pill variant="success">Activa</Pill> : <Pill variant="danger">Desactiva</Pill>}
    </div>
  );
}
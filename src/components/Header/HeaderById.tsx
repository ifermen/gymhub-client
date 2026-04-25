import { Avatar } from "../Avatar/Avatar";
import { Pill } from "../Pill/Pill";

interface HeaderByIdProps {
  title: string;
  type: string;
  isActive: boolean;
}
export function HeaderById({ title, type, isActive }: HeaderByIdProps) {
  const typeText = type == "class" ? "CLASE" :
    type == "clint" ? "CLIENTE" :
      type == "employee" ? "EMPLEADO" :
        type == "offer" ? "OFERTA" : type.toUpperCase();
  return (
    <div className="sm:p-7 sm:pb-3 p-3 flex flex-row w-full gap-3">
      <Avatar name={title} variant={
        type == "class" ? "blue" :
          type == "client" ? "cian" :
            type == "employee" ? "red" :
              type == "offer" ? "green" : "cian"} />
      <div className="flex flex-col w-full">
        <span className="font-bold text-text-500 text-sm">{typeText}</span>
        <h3 className="sm:text-3xl text-xl">{title}</h3>
        {isActive ? <Pill variant="success">Activa</Pill> : <Pill variant="danger">Desactiva</Pill>}
      </div>
    </div>
  );
}
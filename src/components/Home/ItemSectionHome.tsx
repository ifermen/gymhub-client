import { Pill } from "../Pill/Pill"

interface ItemSectionHome {
  title: string,
  canAdmin: boolean,
  canEmployee: boolean,
  canClient: boolean
}
export function ItemSectionHome({ title, canAdmin, canEmployee, canClient }: ItemSectionHome) {
  return (
    <div className="flex-col flex-1 min-w-fit border border-background-800 flex justify-center p-3">
      <span className="">{title}</span>
      <div className="flex flex-row gap-1 w-full">
        {canAdmin ? <Pill variant="primary" size="base">Admin</Pill> : ""}
        {canEmployee ? <Pill variant="accent" size="base">Empleado</Pill> : ""}
        {canClient ? <Pill variant="success" size="base">Cliente</Pill> : ""}
      </div>
    </div>
  )
}
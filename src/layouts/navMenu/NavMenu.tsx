import { useUserContext } from "../../contexts/UserContext";
import { NavOption } from "../../components/Button/NavOption";

export function NavMenu() {
  const { user } = useUserContext();

  if (user?.role == "CLIENT") {
    return (
      <nav className="hidden flex-row justify-around p-2 sm:flex">
        <NavOption option="exercise">Tabla de Ejercicios</NavOption>
        <NavOption option="class">Clase</NavOption>
        <NavOption option="report">Incidencia</NavOption>
      </nav>
    );
  } else if (user?.role == "EMPLOYEE") {
    return (
      <nav className="hidden flex-row justify-around p-2 sm:flex">
        <NavOption option="client">Cliente</NavOption>
        <NavOption option="class">Clase</NavOption>
        <NavOption option="report">Incidencia</NavOption>
      </nav>
    );
  } else if (user?.role == "ADMIN") {
    return (
      <nav className="hidden flex-row justify-around sm:flex">
        <NavOption option="offer">Oferta</NavOption>
        <NavOption option="client">Cliente</NavOption>
        <NavOption option="employee">Empleado</NavOption>
        <NavOption option="class">Clase</NavOption>
        <NavOption option="report">Incidencia</NavOption>
      </nav>
    );
  }
}

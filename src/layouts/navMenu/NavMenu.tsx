import { useUserContext } from "../../contexts/UserContext"
import { LineVertical } from '../../components/Line/LineVertical';
import { useNavigate } from "react-router-dom";

export function NavMenu() {

  const { user } = useUserContext();
  const navegate = useNavigate();

  const btnExercisesHandler = () => {
    navegate("/exercises");
  }

  const btnClassHandler = () => {
    navegate("/class");
  }

  const btnReportHandler = () => {
    navegate("/report");
  }

  const btnClientHandler = () => {
    navegate("/client");
  }

  const btnEmployeeHandler = () => {
    navegate("/employee");
  }

  if (user?.role == "CLIENT") {
    return (
      <nav className="
        flex
        flex-row
        justify-around
        p-2
      ">
        <span onClick={btnExercisesHandler} className="
          text-center
          w-full
          cursor-pointer
          sm:text-xl
        ">Tabla de ejercicios</span>
        <LineVertical variant="white" />
        <span onClick={btnClassHandler} className="
          text-center
          w-full
          cursor-pointer
          sm:text-xl
        ">Clases</span>
        <LineVertical variant="white" />
        <span onClick={btnReportHandler} className="
          text-center
          w-full
          cursor-pointer
          sm:text-xl
        ">Incidencias</span>
      </nav>
    )
  } else if (user?.role == "EMPLOYEE") {
    return (
      <nav className="
        flex
        flex-row
        justify-around
        p-2
      ">
        <span onClick={btnClientHandler} className="
          text-center
          cursor-pointer
          sm:text-xl
        ">Clientes</span>
        <LineVertical variant="white" />
        <span onClick={btnClassHandler} className="
          text-center
          cursor-pointer
          sm:text-xl
        ">Clases</span>
        <LineVertical variant="white" />
        <span onClick={btnReportHandler} className="
          text-center
          cursor-pointer
          sm:text-xl
        ">Incidencias</span>
      </nav>
    )
  } else if (user?.role == "ADMIN") {
    return (
      <nav className="
        flex
        flex-row
        justify-around
        p-2
      ">
        <span onClick={btnClientHandler} className="
          text-center
          cursor-pointer
          sm:text-xl
        ">Clientes</span>
        <LineVertical variant="white" />
        <span onClick={btnEmployeeHandler} className="
          text-center
          cursor-pointer
          sm:text-xl
        ">Empleados</span>
        <LineVertical variant="white" />
        <span onClick={btnClassHandler} className="
          text-center
          cursor-pointer
          sm:text-xl
        ">Clases</span>
        <LineVertical variant="white" />
        <span onClick={btnReportHandler} className="
          text-center
          cursor-pointer
          sm:text-xl
        ">Incidencias</span>
      </nav>
    )
  }

}
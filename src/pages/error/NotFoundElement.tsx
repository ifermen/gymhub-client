import { useNavigate } from "react-router-dom";
import { Main } from "../../components/Main/Main";
import { Button } from "../../components/Button/Button";

interface NotFoundElementProps {
  elementType: "class" | "client" | "employee" | "offer" | "report"
}
export function NotFoundElement({ elementType }: NotFoundElementProps) {

  const navegate = useNavigate();
  const clickBackListHandler = () => {
    navegate("/" + elementType)
  }
  if (elementType == "class") {
    return (
      <Main>
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-2/4 xl:w-2/4 flex flex-col gap-3 sm:items-start items-center p-3">
          <span className="text-9xl font-extrabold">404</span>
          <h3 className="text-3xl">Clase no encontrada</h3>
          <p className="text-lg sm:text-2xl w-full text-center sm:text-start">Lo sentimos, la clase que estás buscando no existe o ha sido eliminada. Verifica la dirección o regresa al listado para continuar navegando.</p>
          <Button id="btnBackHome" type="button" handleClick={clickBackListHandler} width="fit" variant="secondary">Volver al listado de clases</Button>
        </div>
      </Main>
    )
  } else if (elementType == "client") {
    return (
      <Main>
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-2/4 xl:w-2/4 flex flex-col gap-3 sm:items-start items-center p-3">
          <span className="text-9xl font-extrabold">404</span>
          <h3 className="text-3xl">Cliente no encontrado</h3>
          <p className="text-lg sm:text-2xl w-full text-center sm:text-start">Lo sentimos, el cliente que estás buscando no existe o ha sido eliminada. Verifica la dirección o regresa al listado para continuar navegando.</p>
          <Button id="btnBackHome" type="button" handleClick={clickBackListHandler} width="fit" variant="secondary">Volver al listado de clientes</Button>
        </div>
      </Main>
    )
  } else if (elementType == "employee") {
    return (
      <Main>
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-2/4 xl:w-2/4 flex flex-col gap-3 sm:items-start items-center p-3">
          <span className="text-9xl font-extrabold">404</span>
          <h3 className="text-3xl">Empleado no encontrado</h3>
          <p className="text-lg sm:text-2xl w-full text-center sm:text-start">Lo sentimos, el empleado que estás buscando no existe o ha sido eliminada. Verifica la dirección o regresa al listado para continuar navegando.</p>
          <Button id="btnBackHome" type="button" handleClick={clickBackListHandler} width="fit" variant="secondary">Volver al listado de empleados</Button>
        </div>
      </Main>
    )
  } else if (elementType == "offer") {
    return (
      <Main>
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-2/4 xl:w-2/4 flex flex-col gap-3 sm:items-start items-center p-3">
          <span className="text-9xl font-extrabold">404</span>
          <h3 className="text-3xl">Oferta no encontrado</h3>
          <p className="text-lg sm:text-2xl w-full text-center sm:text-start">Lo sentimos, la oferta que estás buscando no existe o ha sido eliminada. Verifica la dirección o regresa al listado para continuar navegando.</p>
          <Button id="btnBackHome" type="button" handleClick={clickBackListHandler} width="fit" variant="secondary">Volver al listado de ofertas</Button>
        </div>
      </Main>
    )
  } else if (elementType == "report") {
    return (
      <Main>
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-2/4 xl:w-2/4 flex flex-col gap-3 sm:items-start items-center p-3">
          <span className="text-9xl font-extrabold">404</span>
          <h3 className="text-3xl">Incidencia no encontrada</h3>
          <p className="text-lg sm:text-2xl w-full text-center sm:text-start">Lo sentimos, la incidencia que estás buscando no existe o ha sido eliminada. Verifica la dirección o regresa al listado para continuar navegando.</p>
          <Button id="btnBackHome" type="button" handleClick={clickBackListHandler} width="fit" variant="secondary">Volver al listado de incidencias</Button>
        </div>
      </Main>
    )
  } else {
    return <br />
  }

}
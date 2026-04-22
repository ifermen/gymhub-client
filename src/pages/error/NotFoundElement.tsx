import { useNavigate } from "react-router-dom";
import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
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
        <TitlePage>Clase no encontrada</TitlePage>
        <p className="text-lg sm:text-2xl text-center">La clase a la que intentas acceder no existe.</p>
        <Button id="btnBackHome" type="button" handleClick={clickBackListHandler} width="fit" variant="secondary">Volver a la lista de clases</Button>
      </Main>
    )
  } else if (elementType == "client") {
    return (
      <Main>
        <TitlePage>Cliente no encontrado</TitlePage>
        <p className="text-lg sm:text-2xl text-center">El cliente al que intentas acceder no existe.</p>
        <Button id="btnBackHome" type="button" handleClick={clickBackListHandler} width="fit" variant="secondary">Volver a la lista de clientes</Button>
      </Main>
    )
  } else if (elementType == "employee") {
    return (
      <Main>
        <TitlePage>Empleado no encontrado</TitlePage>
        <p className="text-lg sm:text-2xl text-center">El empleado al que intentas acceder no existe.</p>
        <Button id="btnBackHome" type="button" handleClick={clickBackListHandler} width="fit" variant="secondary">Volver a la lista de empleados</Button>
      </Main>
    )
  } else if (elementType == "offer") {
    return (
      <Main>
        <TitlePage>Oferta no encontrada</TitlePage>
        <p className="text-lg sm:text-2xl text-center">La oferta a la que intentas acceder no existe.</p>
        <Button id="btnBackHome" type="button" handleClick={clickBackListHandler} width="fit" variant="secondary">Volver a la lista de oferta</Button>
      </Main>
    )
  } else if (elementType == "report") {
    return (
      <Main>
        <TitlePage>Incidencia no encontrada</TitlePage>
        <p className="text-lg sm:text-2xl text-center">La incidencia a la que intentas acceder no existe.</p>
        <Button id="btnBackHome" type="button" handleClick={clickBackListHandler} width="fit" variant="secondary">Volver a la lista de incidencia</Button>
      </Main>
    )
  } else {
    return <br />
  }

}
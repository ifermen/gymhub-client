import { useNavigate } from "react-router-dom";
import { Main } from "../../components/Main/Main";
import { Button } from "../../components/Button/Button";

export function NotFound() {

  const navegate = useNavigate();

  const clickBackHomeHandler = () => {
    navegate("/home")
  }

  return (
    <Main>
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-2/4 xl:w-2/4 flex flex-col gap-3 sm:items-start items-center p-3">
        <span className="text-9xl font-extrabold">404</span>
        <h3 className="text-3xl">Página no encontrada</h3>
        <p className="text-lg sm:text-2xl w-full text-center sm:text-start">Lo sentimos, la página que estás buscando no existe o ha sido movida. Verifica la dirección o regresa al inicio para continuar navegando.</p>
        <Button id="btnBackHome" type="button" handleClick={clickBackHomeHandler} width="fit" variant="secondary">Volver a la página de inicio</Button>
      </div>
    </Main>
  )
}
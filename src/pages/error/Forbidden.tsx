import { useNavigate } from "react-router-dom";
import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { Button } from "../../components/Button/Button";

export function Forbidden() {

  const navegate = useNavigate();

  const clickBackHomeHandler = () => {
    navegate("/home")
  }

  return (
    <Main>
      <TitlePage>Página no permitida</TitlePage>
      <p className="text-lg sm:text-2xl text-center">No tienes lo permisos suficientes para acceder a esta página.</p>
      <Button id="btnBackHome" type="button" handleClick={clickBackHomeHandler} width="fit" variant="secondary">Volver a la página de inicio</Button>
    </Main>
  )
}
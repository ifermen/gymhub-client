import { Button } from "../../components/Button/Button";
import { Line } from "../../components/Line/Line";
import { useUserContext } from "../../contexts/UserContext"
import { TitlePage } from '../../components/TitlePage/TitlePage';
import { Main } from "../../components/Main/Main";

export function Profile() {
  const { user } = useUserContext();

  return (
    <Main>
      <TitlePage>Perfil Personal</TitlePage>
      <div className="
        flex
        flex-col
        w-full
        sm:w-3/4
        md:w-2/3
        lg:w-2/4
        xl:w-1/3
        p-3
        sm:bg-background-950
        rounded-3xl
        gap-3
        sm:border-4
        justify-center
        items-center
      sm:border-text-600
        sm:shadow-md
      ">
        <div className="      
          flex
          flex-col
          justify-center        
          items-center
        ">
          <span className="
            font-semibold
            text-2xl
            sm:text-4xl
          ">{user?.name}</span>
          <span className="
            text-sm
            sm:text-lg
          ">{
              user?.role == "ADMIN" ? "Administrador" :
                user?.role == "EMPLOYEE" ? "Empleado" :
                  user?.role == "CLIENT" ? "Cliente" : ""}</span>
        </div>
        <Line></Line>
        <span className="
          font-semibold
          text-xl
          sm:text-2xl
        ">{user?.email}</span>
        <span className="
          font-semibold
          text-xl
          sm:text-2xl
        ">{user?.creationDate.toLocaleDateString()}</span>
        <Button id="btnEdit" type="button" handleClick={() => { }}>Editar Perfil</Button>
      </div>
    </Main>
  )
}
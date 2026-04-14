import { Button } from "../../components/Button/Button";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { useUserContext } from "../../contexts/UserContext"
import { TitlePage } from '../../components/TitlePage/TitlePage';
import { Main } from "../../components/Main/Main";
import { ClientService } from "../../services/clientService";
import { useEffect, useState } from "react";
import type { RenewalDataWithoutClient } from "../../types/client";
import { useNavigate } from "react-router-dom";

export function Profile() {
  const { user, logout } = useUserContext();
  const navegate = useNavigate();
  const [renewalHistory, setRenewalHistory] = useState<RenewalDataWithoutClient[]>([]);
  const [isSuscriptionActive, setIsSuscriptionActive] = useState(false);
  const [isHistoryActive, setIsHistoryActive] = useState(false);

  const clickLogoutHandler = () => {
    logout();
  }

  const clickEditProfileHandler = () => {
    navegate("/profile/edit");
  }

  if (user?.role == "CLIENT") {
    useEffect(() => {
      ClientService.getRenewalHistory(user.id).then(response => {
        setRenewalHistory(response);
        if (response.length > 0 && response[0].endDate.getTime() > Date.now()) {
          setIsSuscriptionActive(true);
        }
      }).catch(error => {
        console.error(error);
      })
    }, []);
  }

  return (
    <Main>
      <TitlePage>Perfil Personal</TitlePage>
      <div className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl p-3 sm:w-3/4 sm:border-4 sm:border-text-600 sm:bg-background-950 sm:shadow-md md:w-2/3 lg:w-2/4 xl:w-1/3">
        <div className="      
          flex
          flex-col
          justify-center        
          items-center
          w-full
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
          <LineHorizontal></LineHorizontal>
        </div>
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
        {/*SUSCRIPTIONS*/}
        {
          user?.role == "CLIENT" ?
            (
              <div className="
              flex
              flex-col
              items-center
              p-3
              w-full
              rounded-2xl
              justify-center
              bg-background-900
            ">
                <div className="
                flex
                flex-row
                gap-5
                w-full
              ">
                  <span className="
                  text-2xl
                  font-semibold
                  w-full
                  pt-1
                  flex
                  items-center
                  text-center
                ">Suscripción</span>
                  {isHistoryActive ?
                    <Button id="btnHistory" variant="secondary" type="button" handleClick={() => { setIsHistoryActive(false) }}>Ocultar</Button> :
                    <Button id="btnHistory" variant="secondary" type="button" handleClick={() => { setIsHistoryActive(true) }}>Historial</Button>
                  }
                </div>
                <div className="
                  flex
                  flex-row
                  gap-5
                  mt-2
                  bg-background-800
                  border-2
                  border-background-500
                  p-2
                  rounded-2xl
                ">
                  <span className={isSuscriptionActive ?
                    "text-xl flex items-center font-semibold text-success-400" :
                    "text-xl flex items-center font-semibold text-danger-400"}>
                    {isSuscriptionActive ? "Activa" : "Inactiva"}
                  </span>
                  {renewalHistory.length > 0 ?
                    <span className="
                      text-xl
                      text-center
                    ">
                      {
                        renewalHistory[0].startDate.toLocaleDateString()
                      } - {
                        renewalHistory[0].endDate.toLocaleDateString()
                      }</span>
                    : ""}
                </div>
                {isHistoryActive ? renewalHistory.slice(1).map(renewal => (
                  <div key={renewal.startDate.getTime()} className="
                  flex
                  flex-row
                  gap-5
                  mt-2
                  bg-background-800
                  border-2
                  border-background-500
                  p-2
                  rounded-2xl
                ">
                    <span className="
                    flex
                    items-center
                    text-xl
                  ">{
                        renewal.startDate.toLocaleDateString()
                      } - {
                        renewal.endDate.toLocaleDateString()
                      }</span>
                  </div>
                )) : ""}
                { }
              </div>
            ) :
            ""
        }
        <Button id="btnEdit" type="button" handleClick={clickEditProfileHandler}>Editar Perfil</Button>
        <Button id="btnEdit" variant="secondary" type="button" handleClick={clickLogoutHandler}>Cerrar Sesión</Button>
      </div>
    </Main>
  )
}
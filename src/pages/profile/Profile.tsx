import { Button } from "../../components/Button/Button";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { useUserContext } from "../../contexts/UserContext"
import { Main } from "../../components/Main/Main";
import { ClientService } from "../../services/clientService";
import { useEffect, useState } from "react";
import type { RenewalDataWithoutClient } from "../../types/client";
import { useNavigate } from "react-router-dom";
import DivContent from "../../components/Div/DivContent";
import { Avatar } from "../../components/Avatar/Avatar";
import { Pill } from "../../components/Pill/Pill";
import { Data } from "../../components/Data/Data";

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

  if (!user) {
    navegate("/login")
  }

  return (
    <Main>
      <DivContent>
        <div className="sm:p-7 sm:pb-3 p-3 flex flex-row w-full gap-3">
          <Avatar name={user?.name ?? ""} variant={
            user?.role == "CLIENT" ? "green" :
              user?.role == "EMPLOYEE" ? "cian" :
                user?.role == "ADMIN" ? "blue" : "yellow"} />
          <div className="flex flex-col w-full">
            <span className="font-bold text-text-500 text-sm">PERFIL</span>
            <h3 className="sm:text-3xl text-xl">{user?.name ?? ""}</h3>
            {user?.role == "CLIENT" ? <Pill variant="success">Cliente</Pill> :
              user?.role == "EMPLOYEE" ? <Pill variant="accent">Empleado</Pill> :
                user?.role == "ADMIN" ? <Pill variant="primary">Administrador</Pill> :
                  <Pill variant="danger">Sin Rol</Pill>}
          </div>
        </div>
        <LineHorizontal></LineHorizontal>
        <div className="sm:p-7 p-3 flex flex-col gap-3 w-full">
          <Data title="EMAIL" value={user?.email ?? ""} />
          <Data title="DESDE" value={user?.creationDate.toLocaleDateString() ?? ""} />
        </div>
        {/*SUSCRIPTIONS*/}
        {
          user?.role == "CLIENT" ?
            (
              <>
                <LineHorizontal />
                <div className="sm:p-7 sm:pt-3 p-3 flex flex-col gap-3 w-full">
                  <div className="flex w-full flex-row gap-5 mt-2 justify-between items-center">
                    <span className="font-bold text-sm text-text-500">
                      SUSCRIPCION
                    </span>
                  </div>
                  {renewalHistory.length > 0 ? <>
                    {isHistoryActive ? (
                      <Button
                        id="btnHistory"
                        variant="secondary"
                        type="button"
                        width="full"
                        handleClick={() => {
                          setIsHistoryActive(false);
                        }}
                      >
                        Ocultar
                      </Button>
                    ) : (
                      <Button
                        id="btnHistory"
                        variant="secondary"
                        type="button"
                        width="full"
                        handleClick={() => {
                          setIsHistoryActive(true);
                        }}
                      >
                        Historial
                      </Button>
                    )}
                    <div className="flex flex-col w-full bg-background-950 border border-background-800 p-3 rounded-xl">
                      <div className="flex justify-between items-center">
                        <span className="font-bold text-sm text-text-500">{renewalHistory[0].offer.title}</span>
                        <Pill variant={isSuscriptionActive ? "success" : "danger"}>
                          {isSuscriptionActive ? "Activa" : "Terminada"}
                        </Pill>
                      </div>
                      <span className={`sm:text-xl text-lg`}>{renewalHistory[0].startDate.toLocaleDateString()} - {renewalHistory[0].endDate.toLocaleDateString()}</span>
                    </div>
                    {isHistoryActive
                      ? renewalHistory.slice(1).map((renewal) => (
                        <div className="flex flex-col w-full bg-background-950 border border-background-800 p-3 rounded-xl">
                          <span className={`sm:text-xl text-lg`}>{renewal.startDate.toLocaleDateString()} - {renewal.endDate.toLocaleDateString()}</span>
                          <span className="font-bold text-sm text-text-500">{renewal.offer.title}</span>
                        </div>
                      ))
                      : ""}
                  </> : <span className="text-xl">Sin renovaciones</span>
                  }
                  { }
                </div></>
            ) :
            ""
        }
        <LineHorizontal />
        <div className="flex flex-col gap-3 w-full sm:p-7 p-3">
          <Button id="btnEdit" type="button" handleClick={clickEditProfileHandler}>Editar Perfil</Button>
          <Button id="btnEdit" variant="secondary" type="button" handleClick={clickLogoutHandler}>Cerrar Sesión</Button>
        </div>
      </DivContent>
    </Main >
  )
}
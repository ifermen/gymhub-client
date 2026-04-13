import { useNavigate, useParams } from "react-router-dom";
import { Main } from "../../components/Main/Main";
import { useEffect, useState } from 'react';
import { ReportService } from "../../services/reportService";
import { useUserContext } from "../../contexts/UserContext";
import type { ReportData, ResolveReportRequest } from "../../types/report";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { Button } from "../../components/Button/Button";
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Pill } from '../../components/Pill/Pill';
import { Modal } from "../../components/Modal/Modal";
import { LineVertical } from "../../components/Line/LineVertical";

export function ReportById() {
  const { user, logout } = useUserContext();
  const navegate = useNavigate();
  const { id } = useParams();
  const [isOpenModel, setIsOpenModal] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const statusOption = new Map<string, string>([["-1", "Nuevo Estado"], ["PENDING", "Pendiente"], ["RESOLVED", "Resuelto"], ["CANCELED", "Cancelado"]]);

  useEffect(() => {
    if (id) {
      ReportService.reportById(Number(id)).then(response => {
        setReport(response);
      }).catch(error => {
        if (error.status == 401) {
          logout();
        }
      })
    }
  }, [id]);

  const changeStatusHandler = (value: string) => {
    if (value === "PENDING" || value === "RESOLVED" || value === "CANCELED") {
      const resolveReportRequest: ResolveReportRequest = {
        id: report!.id,
        status: value,
      }
      ReportService.resolveReport(resolveReportRequest).then(response => {
        setReport(response);
      })
    }
  }

  const openModal = () => {
    setIsOpenModal(true);
  }

  const closeModal = () => {
    setIsOpenModal(false);
  }

  const clickBackHandler = () => {
    navegate("/report")
  }

  return (
    <Main>
      <TitlePage>Incidencia</TitlePage>
      <div className="
        flex
        flex-col
        w-full
        sm:w-3/4
        md:w-2/3
        lg:w-2/4
        xl:w-2/3
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
          w-full
          flex
          flex-col
          gap-1         
        ">
          {user?.role == "ADMIN" || user?.role == "EMPLOYEE" ?
            <div className="
            w-full
            justify-between
            md:flex
            hidden
          ">
              {report?.status == "PENDING" ?
                <Pill variant="danger">Pendiente</Pill> :
                report?.status == "RESOLVED" ?
                  <Pill variant="success">Resuelto</Pill> :
                  report?.status == "CANCELED" ?
                    <Pill variant="secondary">Cancelado</Pill> : ""
              }
              <Dropdown
                id="ddChangeStatus"
                title="Cambiar Estado"
                defaultValue={"-1"}
                options={statusOption}
                handlerChange={changeStatusHandler}>
              </Dropdown>
            </div> :
            <div className="
            w-full
            md:flex
            hidden
            justify-start
          ">
              {report?.status == "PENDING" ?
                <Pill variant="danger">Pendiente</Pill> :
                report?.status == "RESOLVED" ?
                  <Pill variant="success">Resuelto</Pill> :
                  report?.status == "CANCELED" ?
                    <Pill variant="secondary">Cancelado</Pill> : ""
              }
            </div>
          }
          <span className="font-semibold text-center text-xl sm:text-4xl">{report?.title}</span>
        </div>
        <LineHorizontal></LineHorizontal>
        <div className="md:hidden flex w-full justify-between items-center px-3">
          <span className="font-semibold text-xl sm:text-2xl">{report?.creationDate.toLocaleDateString()}</span>
          {report?.status == "PENDING" ?
            <Pill variant="danger">Pendiente</Pill> :
            report?.status == "RESOLVED" ?
              <Pill variant="success">Resuelto</Pill> :
              report?.status == "CANCELED" ?
                <Pill variant="secondary">Cancelado</Pill> : ""
          }
        </div>
        <span className="
          text-base
          sm:text-2xl
        ">{report?.description}</span>
        <div className={`w-full flex ${report?.userSolverId ? "justify-between" : "justify-start"}`}>
          <span className="text-center text-md">Creador: {report?.userCreatorName}</span>
          {report?.userSolverId ? <>
            <LineVertical></LineVertical>
            <span className="text-center text-md">Resuelto por: {report.userCreatorName}</span>
          </> : ""}
        </div>
        <div className="flex sm:hidden w-full">
          <Button id="btnShowOptions" type="button" handleClick={openModal}>Opciones</Button>
          <Modal isOpen={isOpenModel} onClose={closeModal}>
            <Dropdown
              id="ddChangeStatus"
              title="Cambiar Estado"
              defaultValue={"-1"}
              options={statusOption}
              handlerChange={changeStatusHandler}></Dropdown>
          </Modal>
        </div>

        <Button id="btnBack" type="button" variant="secondary" handleClick={clickBackHandler}>Volver</Button>
      </div>
    </Main>
  )
}
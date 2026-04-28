import { useNavigate, useParams } from "react-router-dom";
import { Main } from "../../components/Main/Main";
import { useEffect, useState } from "react";
import { ReportService } from "../../services/reportService";
import { useUserContext } from "../../contexts/UserContext";
import type { ReportData, ResolveReportRequest } from "../../types/report";
import { LineHorizontal } from '../../components/Line/LineHorizontal';
import { Button } from "../../components/Button/Button";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { Pill } from "../../components/Pill/Pill";
import { Modal } from "../../components/Modal/Modal";
import DivContent from "../../components/Div/DivContent";
import { Loader } from "../../components/Loader/Loader";
import { NotFoundElement } from "../error/NotFoundElement";
import { Data } from "../../components/Data/Data";
import { Avatar } from "../../components/Avatar/Avatar";

export function ReportById() {
  const { user, logout } = useUserContext();
  const navegate = useNavigate();
  const { id } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
  const [isNotFound, setIsNotFound] = useState(false);
  const statusOption = new Map<string, string>([
    ["-1", "Nuevo Estado"],
    ["PENDING", "Pendiente"],
    ["RESOLVED", "Resuelto"],
    ["CANCELED", "Cancelado"],
  ]);

  useEffect(() => {
    if (id) {
      ReportService.reportById(Number(id))
        .then((response) => {
          setReport(response);
        })
        .catch((error) => {
          if (error.status == 401) {
            logout();
          } else if (error.status == 404) {
            setIsNotFound(true);
          } else {
            console.log(error)
          }
        });
    }
  }, [id]);

  const changeStatusHandler = (value: string) => {
    if (value === "PENDING" || value === "RESOLVED" || value === "CANCELED") {
      const resolveReportRequest: ResolveReportRequest = {
        id: report!.id,
        status: value,
      };
      ReportService.resolveReport(resolveReportRequest).then((response) => {
        setReport(response);
      });
    }
  };

  const clickEditHandler = () => {
    navegate("/report/" + report?.id + "/edit");
  };

  const deleteReport = () => {
    ReportService.deleteReport(report!.id).then(() => {
      navegate("/report");
    });
  };

  const clickBackHandler = () => {
    navegate("/report");
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  if (isNotFound) {
    return <NotFoundElement elementType="report" />
  }

  if (!report) {
    return <Loader />
  }

  return (
    <Main>
      <DivContent>
        <div className="sm:p-7 sm:pb-3 p-3 flex flex-row w-full gap-3">
          <Avatar name={report.title} variant="yellow" />
          <div className="flex flex-col w-full">
            <span className="font-bold text-text-500 text-sm">INCIDENCIA</span>
            <h3 className="sm:text-3xl text-xl">{report.title}</h3>
            <div className="flex flex-row gap-3">
              {
                report.status == "PENDING" ? <Pill variant="warning">Pendiente</Pill> :
                  report.status == "RESOLVED" ? <Pill variant="success">Resuelto</Pill> :
                    report.status == "CANCELED" ? <Pill variant="secondary">Cancelado</Pill> : ""
              }
              <Pill variant="secondary">{report.creationDate.toLocaleDateString()}</Pill>
            </div>
          </div>
        </div>
        <LineHorizontal></LineHorizontal>
        <div className="flex flex-col gap-3 w-full sm:p-7 p-3">
          <Data title="DESCRIPCIÓN" value={report.description} />
          <div className="flex flex-row gap-3">
            <Data title="CREADOR POR" value={report.userCreatorName} />
            <Data title="RESUELTO POR" value={report.userSolverName ? report.userSolverName : "---"} />
          </div>
        </div>
        <LineHorizontal></LineHorizontal>
        <div className="flex flex-col gap-3 w-full sm:p-7 p-3">
          <Dropdown
            id="ddChangeStatus"
            title="Cambiar Estado"
            value={"-1"}
            options={statusOption}
            handlerChange={changeStatusHandler} />

          {user?.id == report?.userCreatorId ? (
            <div className="flex flex-row w-full gap-3">
              <Button
                id="btnEdit"
                type="button"
                variant="accent"
                handleClick={clickEditHandler}
              >
                Editar
              </Button>
              <Button
                id="btnDelete"
                type="button"
                variant="danger"
                handleClick={openModal}
              >
                Eliminar
              </Button>
              <Modal isOpen={isOpenModal} onClose={closeModal}>
                <span className="text-center text-lg">
                  ¿Estas seguro que quieres eliminar esta incidencia?
                </span>
                <div className="flex w-full gap-1">
                  <Button
                    id="btnCancelDelete"
                    type="button"
                    variant="secondary"
                    handleClick={() => setIsOpenModal(false)}
                  >
                    Cancelar
                  </Button>
                  <Button
                    id="btnModalDelete"
                    type="button"
                    variant="danger"
                    handleClick={deleteReport}
                  >
                    Eliminar
                  </Button>
                </div>
              </Modal>
            </div>
          ) : (
            ""
          )}
          <Button
            id="btnBack"
            type="button"
            variant="secondary"
            handleClick={clickBackHandler}>
            Volver
          </Button>
        </div>
      </DivContent>
    </Main>
  );
}

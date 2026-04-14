import { useNavigate, useParams } from "react-router-dom";
import { Main } from "../../components/Main/Main";
import { useEffect, useState } from "react";
import { ReportService } from "../../services/reportService";
import { useUserContext } from "../../contexts/UserContext";
import type { ReportData, ResolveReportRequest } from "../../types/report";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { LineHorizontal } from '../../components/Line/LineHorizontal';
import { Button } from "../../components/Button/Button";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { Pill } from "../../components/Pill/Pill";
import { LineVertical } from "../../components/Line/LineVertical";
import { Modal } from "../../components/Modal/Modal";
import { DivContent } from "../../components/Div/DivContent";

export function ReportById() {
  const { user, logout } = useUserContext();
  const navegate = useNavigate();
  const { id } = useParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [report, setReport] = useState<ReportData | null>(null);
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

  return (
    <Main>
      <TitlePage>Incidencia</TitlePage>
      <DivContent>
        <div className="flex w-full flex-col gap-1">
          {user?.role == "ADMIN" || user?.role == "EMPLOYEE" ? (
            <div className="hidden w-full justify-between md:flex">
              {report?.status == "PENDING" ? (
                <Pill variant="danger">Pendiente</Pill>
              ) : report?.status == "RESOLVED" ? (
                <Pill variant="success">Resuelto</Pill>
              ) : report?.status == "CANCELED" ? (
                <Pill variant="secondary">Cancelado</Pill>
              ) : (
                ""
              )}
              <Dropdown
                id="ddChangeStatus"
                title="Cambiar Estado"
                defaultValue={"-1"}
                options={statusOption}
                handlerChange={changeStatusHandler}
              ></Dropdown>
            </div>
          ) : (
            <div className="hidden w-full justify-start md:flex">
              {report?.status == "PENDING" ? (
                <Pill variant="danger">Pendiente</Pill>
              ) : report?.status == "RESOLVED" ? (
                <Pill variant="success">Resuelto</Pill>
              ) : report?.status == "CANCELED" ? (
                <Pill variant="secondary">Cancelado</Pill>
              ) : (
                ""
              )}
            </div>
          )}
          <span className="text-center text-xl font-semibold sm:text-4xl">
            {report?.title}
          </span>
        </div>
        <LineHorizontal></LineHorizontal>
        <div className="flex w-full items-center justify-between px-3 md:hidden">
          <span className="text-xl font-semibold sm:text-2xl">
            {report?.creationDate.toLocaleDateString()}
          </span>
          {report?.status == "PENDING" ? (
            <Pill variant="danger">Pendiente</Pill>
          ) : report?.status == "RESOLVED" ? (
            <Pill variant="success">Resuelto</Pill>
          ) : report?.status == "CANCELED" ? (
            <Pill variant="secondary">Cancelado</Pill>
          ) : (
            ""
          )}
        </div>
        <span className="text-xl font-semibold hidden sm:block">
          {report?.creationDate.toLocaleDateString()}
        </span>
        <span className="text-base sm:text-2xl">{report?.description}</span>
        <div
          className={`flex w-full ${report?.userSolverId ? "justify-between" : "justify-start"}`}
        >
          <span className="text-md text-center">
            Creador: {report?.userCreatorName}
          </span>
          {report?.userSolverId ? (
            <>
              <LineVertical></LineVertical>
              <span className="text-md text-center">
                Resuelto por: {report.userCreatorName}
              </span>
            </>
          ) : (
            ""
          )}
        </div>
        <LineHorizontal></LineHorizontal>
        <div className="flex w-full sm:hidden">
          <Dropdown
            id="ddChangeStatus"
            title="Cambiar Estado"
            defaultValue={"-1"}
            options={statusOption}
            handlerChange={changeStatusHandler}
          ></Dropdown>
        </div>
        {user?.id == report?.userCreatorId ? (
          <>
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
          </>
        ) : (
          ""
        )}
        <Button
          id="btnBack"
          type="button"
          variant="secondary"
          handleClick={clickBackHandler}
        >
          Volver
        </Button>
      </DivContent>
    </Main>
  );
}

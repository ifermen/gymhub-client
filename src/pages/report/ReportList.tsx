import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { useEffect, useState } from 'react';
import { ReportService } from "../../services/reportService";
import type { ReportData } from "../../types/report";
import { useUserContext } from "../../contexts/UserContext";
import { Pill } from "../../components/Pill/Pill";
import { Button } from '../../components/Button/Button';
import { Modal } from '../../components/Modal/Modal';
import { PageButtonSection } from "../../components/PageButtonSection/PageButtonSection";
import { useNavigate } from "react-router-dom";

export function ReportList() {

  const { logout } = useUserContext();
  const navegate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sort, setSort] = useState("creationDate");
  const [direction, setDirection] = useState<"DESC" | "ASC">("DESC");
  const [pageKey, setPageKey] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [reportList, setReportList] = useState<ReportData[]>([]);
  const directionOption = new Map<string, string>([["DESC", "Descendente"], ["ASC", "Ascendente"]]);
  const sortOption = new Map<string, string>([["creationDate", "Fecha"], ["title", "Título"], ["status", "Estado"]]);

  useEffect(() => {
    ReportService.listReports({ direction: direction, sort: sort, pageKey: pageKey }).then(response => {
      setReportList(response.content)
      setTotalPages(response.totalPages)
    }).catch(error => {
      if (error.status == 401) {
        logout();
      } else {
        console.log(error);
      }
    })
  }, [sort, direction, pageKey]);

  const changeSort = (value: string) => {
    setSort(value)
  }

  const changeDirection = (value: string) => {
    if (value === "ASC" || value === "DESC") {
      setDirection(value);
    }
  }

  const changePageKey = (newPageKey: number) => {
    setPageKey(newPageKey);
  }

  const openModal = () => {
    setIsOpenModal(true);
  }

  const closeModal = () => {
    setIsOpenModal(false);
  }

  const viewReport = (id: number) => {
    navegate("/report/" + id)
  }

  const createReport = () => {
    navegate("/report/create")
  }

  return (
    <Main>
      <TitlePage>Incidencias</TitlePage>
      <div className="
        w-full
        lg:w-2/3
        xl:w-2/4
        p-1
      ">
        <div className="
          sm:flex
          hidden
          flex-row
          gap-1
          justify-between
        ">
          <Button id="btnCreateReport" type="button" variant="success" width="fit" handleClick={createReport}>Añadir</Button>
          <div className="flex gap-1">
            <Dropdown id="sort" title="Ordenar por" options={sortOption} handlerChange={changeSort}></Dropdown>
            <Dropdown id="direction" title="Dirección" options={directionOption} handlerChange={changeDirection}></Dropdown>
          </div>
        </div>
        <div className="flex sm:hidden flex-col">
          <Button id="btnShowOptions" type="button" handleClick={openModal}>Opciones</Button>
          <Modal isOpen={isOpenModal} onClose={closeModal}>
            <Dropdown id="sort" title="Ordenar por" options={sortOption} handlerChange={changeSort}></Dropdown>
            <Dropdown id="direction" title="Dirección" options={directionOption} handlerChange={changeDirection}></Dropdown>
            <Button id="btnCreateReport" type="button" width="full" handleClick={createReport}>Añadir incidencia</Button>
          </Modal>
        </div>
        <div className="
          flex
          flex-col
          gap-2
          py-1
          w-full
        ">
          {reportList.map(report => (
            <div
              key={report.id}
              onClick={() => viewReport(report.id)}
              className="
                flex
                flex-col
                w-full
                p-1
                bg-background-950
                border-2
                border-background-900
                rounded-xl
              ">
              <div className="
                flex
                flex-row
                justify-between
                items-center
              ">
                <span className="
                  text-md
                  h-fit
                ">{report.creationDate.toLocaleDateString()}</span>
                {report.status == "PENDING" ?
                  <Pill variant="warning">Pendiente</Pill> :
                  report.status == "RESOLVED" ?
                    <Pill variant="success">Resuelto</Pill> :
                    report.status == "CANCELED" ?
                      <Pill variant="secondary">Cancelado</Pill> : ""
                }
              </div>
              <div className="
                flex
                flex-col
                w-full
              ">
                <span className="
                  text-xl
                  w-full
                  ">{report.title}</span>
              </div>
            </div>
          ))}
        </div>
        <PageButtonSection pageKey={pageKey} setPageKey={changePageKey} totalPages={totalPages}></PageButtonSection>
      </div>
    </Main>
  )
}
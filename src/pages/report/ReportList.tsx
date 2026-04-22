import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import { ReportService } from "../../services/reportService";
import type { ReportData } from "../../types/report";
import { useUserContext } from "../../contexts/UserContext";
import { Pill } from "../../components/Pill/Pill";
import { Button } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";
import { PageButtonSection } from "../../components/ListOptions/PageButtonSection";
import { useNavigate } from "react-router-dom";
import { Div } from "../../components/Div/Div";
import DivList from '../../components/Div/DivList';
import { Loader } from "../../components/Loader/Loader";

export function ReportList() {
  const { logout } = useUserContext();
  const navegate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sort, setSort] = useState("creationDate");
  const [direction, setDirection] = useState<"DESC" | "ASC">("DESC");
  const [pageKey, setPageKey] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [reportList, setReportList] = useState<ReportData[] | null>();
  const directionOption = new Map<string, string>([
    ["DESC", "Descendente"],
    ["ASC", "Ascendente"],
  ]);
  const sortOption = new Map<string, string>([
    ["creationDate", "Fecha"],
    ["title", "Título"],
    ["status", "Estado"],
  ]);

  useEffect(() => {
    ReportService.listReports({
      direction: direction,
      sort: sort,
      pageKey: pageKey,
    })
      .then((response) => {
        setReportList(response.content);
        setTotalPages(response.totalPages);
      })
      .catch((error) => {
        if (error.status == 401) {
          logout();
        } else {
          console.log(error);
        }
      });
  }, [sort, direction, pageKey]);

  const changeSort = (value: string) => {
    setSort(value);
  };

  const changeDirection = (value: string) => {
    if (value === "ASC" || value === "DESC") {
      setDirection(value);
    }
  };

  const changePageKey = (newPageKey: number) => {
    setPageKey(newPageKey);
  };

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const viewReport = (id: number) => {
    navegate("/report/" + id);
  };

  const createReport = () => {
    navegate("/report/create");
  };

  if (!reportList) {
    return <Loader />
  }

  return (
    <Main>
      <TitlePage>Incidencias</TitlePage>
      <Div>
        <div className="hidden flex-row justify-between gap-1 md:flex">
          <Button
            id="btnCreateReport"
            type="button"
            variant="primary"
            width="fit"
            handleClick={createReport}
          >
            Añadir
          </Button>
          <div className="flex gap-1">
            <Dropdown
              id="sort"
              title="Ordenar por"
              options={sortOption}
              handlerChange={changeSort}
              value={sort} />
            <Dropdown
              id="direction"
              title="Dirección"
              options={directionOption}
              handlerChange={changeDirection}
              value={direction} />
          </div>
        </div>
        <div className="flex flex-col md:hidden">
          <Button id="btnShowOptions" type="button" handleClick={openModal}>
            Opciones
          </Button>
          <Modal isOpen={isOpenModal} onClose={closeModal}>
            <Dropdown
              id="sort"
              title="Ordenar por"
              options={sortOption}
              handlerChange={changeSort}
              value={sort} />
            <Dropdown
              id="direction"
              title="Dirección"
              options={directionOption}
              handlerChange={changeDirection}
              value={direction} />
            <Button
              id="btnCreateReport"
              type="button"
              width="full"
              handleClick={createReport}
            >
              Añadir incidencia
            </Button>
          </Modal>
        </div>
        <DivList>
          {reportList.map((report) => (
            <div
              key={report.id}
              onClick={() => viewReport(report.id)}
              className="flex w-full flex-col rounded-xl border-2 border-background-900 bg-background-950 p-1 cursor-pointer"
            >
              <div className="flex flex-row items-center justify-between">
                <span className="text-md h-fit">
                  {report.creationDate.toLocaleDateString()}
                </span>
                {report.status == "PENDING" ? (
                  <Pill variant="warning">Pendiente</Pill>
                ) : report.status == "RESOLVED" ? (
                  <Pill variant="success">Resuelto</Pill>
                ) : report.status == "CANCELED" ? (
                  <Pill variant="secondary">Cancelado</Pill>
                ) : (
                  ""
                )}
              </div>
              <div className="flex w-full flex-col">
                <span className="w-full text-xl">{report.title}</span>
              </div>
            </div>
          ))}
        </DivList>
        <PageButtonSection
          pageKey={pageKey}
          setPageKey={changePageKey}
          totalPages={totalPages}
        ></PageButtonSection>
      </Div>
    </Main>
  );
}

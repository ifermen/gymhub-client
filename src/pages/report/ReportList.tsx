import { Main } from "../../components/Main/Main";
import { useEffect, useRef, useState } from "react";
import { ReportService } from "../../services/reportService";
import type { ReportData } from "../../types/report";
import { useUserContext } from "../../contexts/UserContext";
import { Pill } from "../../components/Pill/Pill";
import { PageButtonSection } from "../../components/ListOptions/PageButtonSection";
import { useLocation, useNavigate } from "react-router-dom";
import { Div } from "../../components/Div/Div";
import DivList from '../../components/Div/DivList';
import { Loader } from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { HeaderList } from "../../components/Header/HeaderList";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { ListOptions } from "../../components/ListOptions/ListOptions";

export function ReportList() {
  const { logout } = useUserContext();
  const navegate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sort, setSort] = useState("creationDate");
  const [direction, setDirection] = useState<"DESC" | "ASC">("DESC");
  const [filter, setFilter] = useState("");
  const [pageKey, setPageKey] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [reportList, setReportList] = useState<ReportData[] | null>();

  const hasShownToast = useRef(false);
  const { state } = useLocation();
  const action = state?.action;

  useEffect(() => {
    if (action && !hasShownToast.current) {
      if (action == "create") {
        toast.success(`Incidencia \"${state.reference}\" creada con éxito`);
        hasShownToast.current = true;
      } else if (action == "edit") {
        toast.success(`Incidencia \"${state.reference}\" editada con éxito`);
        hasShownToast.current = true;
      }
    }
  }, [action]);

  const directionOption = new Map<string, string>([
    ["DESC", "Descendente"],
    ["ASC", "Ascendente"],
  ]);
  const sortOption = new Map<string, string>([
    ["creationDate", "Fecha"],
    ["title", "Título"],
    ["status", "Estado"],
  ]);
  const filterOption = new Map<string, string>([
    ["-1", "Ninguno"],
    ["pending", "Pendiente"],
    ["resolved", "Resuelto"],
    ["canceled", "Cancelado"],
  ]);

  useEffect(() => {
    ReportService.listReports({
      direction: direction,
      sort: sort,
      pageKey: pageKey,
      filter: filter,
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
  }, [sort, direction, pageKey, filter]);

  const changeFilter = (value: string) => {
    if (value != "-1") {
      setFilter(value);
    } else {
      setFilter("");
    }
  }

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
      <Div>
        <HeaderList title="Listado de incidencias" type="INCIDENCIA" />
        <LineHorizontal />
        <ListOptions
          isOpenModal={isOpenModal}
          openModal={openModal}
          closeModal={closeModal}
          sort={sort}
          sortOption={sortOption}
          changeSort={changeSort}
          direction={direction}
          directionOption={directionOption}
          changeDirection={changeDirection}
          filter={filter}
          filterOption={filterOption}
          changeFilter={changeFilter}
          create={createReport}
        />
        <LineHorizontal />
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
        <LineHorizontal />
        <PageButtonSection
          pageKey={pageKey}
          setPageKey={changePageKey}
          totalPages={totalPages}
        ></PageButtonSection>
      </Div>
    </Main>
  );
}

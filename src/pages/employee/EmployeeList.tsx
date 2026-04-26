import { useLocation, useNavigate } from "react-router-dom";
import { Div } from "../../components/Div/Div";
import DivList from "../../components/Div/DivList";
import { PageButtonSection } from "../../components/ListOptions/PageButtonSection";
import { Main } from "../../components/Main/Main";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useRef, useState } from "react";
import type { EmployeeData } from "../../types/employee";
import EmployeeService from "../../services/employeeService";
import { Loader } from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { ListOptions } from "../../components/ListOptions/ListOptions";
import { HeaderList } from "../../components/Header/HeaderList";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import type { PageResponse } from "../../types/api";

export function EmployeeList() {
  const { logout } = useUserContext();
  const navegate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sort, setSort] = useState("creationDate");
  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState("");
  const [direction, setDirection] = useState<"DESC" | "ASC">("DESC");
  const [pageKey, setPageKey] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [employeeList, setEmployeeList] = useState<PageResponse<EmployeeData[]> | null>();

  const hasShownToast = useRef(false);
  const { state } = useLocation();
  const action = state?.action;

  useEffect(() => {
    if (action && !hasShownToast.current) {
      if (action == "create") {
        toast.success(`Empleado \"${state.reference}\" creada con éxito`);
        hasShownToast.current = true;
      } else if (action == "edit") {
        toast.success(`Empleado \"${state.reference}\" editada con éxito`);
        hasShownToast.current = true;
      } else if (action == "enable") {
        toast.success(`Empleado \"${state.reference}\" dado de alta con éxito`);
        hasShownToast.current = true;
      } else if (action == "disable") {
        toast.success(`Empleado \"${state.reference}\" dado de baja con éxito`);
        hasShownToast.current = true;
      }
    }
  }, [action]);

  const directionOption = new Map<string, string>([
    ["DESC", "Descendente"],
    ["ASC", "Ascendente"],
  ]);
  const sortOption = new Map<string, string>([
    ["name", "Nombre"],
    ["email", "Email"],
    ["creationDate", "Fecha"],
  ]);
  const filterOption = new Map<string, string>([
    ["-1", "Ninguno"],
    ["isActive", "Activo"],
    ["isDisactive", "No Activo"]
  ]);

  useEffect(() => {
    if (searchString == "") {
      EmployeeService.listEmployees({
        direction: direction,
        pageKey: pageKey,
        pageSize: 20,
        sort: sort,
        filter: filter
      })
        .then((response) => {
          setEmployeeList(response);
          setTotalPages(response.totalPages);
        })
        .catch((error) => {
          if (error.status == 401) {
            logout();
          }
        });
    } else {
      EmployeeService.searchEmployees(
        searchString,
        {
          direction: direction,
          pageKey: pageKey,
          pageSize: 20,
          sort: sort,
          filter: filter
        })
        .then((response) => {
          setEmployeeList(response);
          setTotalPages(response.totalPages);
        })
        .catch((error) => {
          if (error.status == 401) {
            logout();
          }
        });
    }
  }, [filter, sort, direction, pageKey, totalPages, searchString]);

  const changeFilter = (value: string) => {
    if (value != "-1") {
      setFilter(value);
    } else {
      setFilter("");
    }
  }

  const changeSort = (value: string) => {
    if (value != "-1") {
      setSort(value);
    }
  };

  const changeDirection = (value: string) => {
    if (value === "ASC" || value === "DESC") {
      setDirection(value);
    }
  };

  const changePageKey = (newPageKey: number) => {
    setPageKey(newPageKey);
  };

  const changeSearchString = (searchString: string) => {
    setSearchString(searchString)
  }

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const viewEmployee = (id: number) => {
    navegate("/employee/" + id);
  };

  const createEmployee = () => {
    navegate("/employee/create");
  };

  if (!employeeList) {
    return <Loader />
  }

  return (
    <Main>
      <Div>
        <HeaderList title="Listado de empleado" type="EMPLEADO" />
        <LineHorizontal />
        <ListOptions
          searchString={searchString}
          changeSearchString={changeSearchString}
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
          create={createEmployee}
        />
        <LineHorizontal />
        <DivList>
          <span className="text-sm font-bold text-text-500">LISTADO - {employeeList.totalElements}</span>
          {employeeList.content.map((employee) => (
            <div
              key={employee.id}
              onClick={() => viewEmployee(employee.id)}
              className="flex flex-col w-full bg-background-950 border border-background-800 p-3 rounded-xl cursor-pointer"
            >
              <div className="flex w-full flex-col">
                <span className="w-full text-xl">{employee.name}</span>
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
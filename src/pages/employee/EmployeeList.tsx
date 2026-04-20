import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Div } from "../../components/Div/Div";
import DivList from "../../components/Div/DivList";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { Input } from "../../components/Input/Input";
import { PageButtonSection } from "../../components/ListOptions/PageButtonSection";
import { Main } from "../../components/Main/Main";
import { Modal } from "../../components/Modal/Modal";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState, type ChangeEvent } from "react";
import type { EmployeeData } from "../../types/employee";
import EmployeeService from "../../services/employeeService";
import search from "../../assets/icons/search.svg";

export function EmployeeList() {
  const { user, logout } = useUserContext();
  const navegate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sort, setSort] = useState("creationDate");
  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState("");
  const [direction, setDirection] = useState<"DESC" | "ASC">("DESC");
  const [pageKey, setPageKey] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [employees, setEmployees] = useState<EmployeeData[]>([]);
  const directionOption = new Map<string, string>([
    ["-1", "Por defecto"],
    ["DESC", "Descendente"],
    ["ASC", "Ascendente"],
  ]);
  const sortOption = new Map<string, string>([
    ["-1", "Por defecto"],
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
          setEmployees(response.content);
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
          setEmployees(response.content);
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

  const changeSearchString = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)
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

  return (
    <Main>
      <TitlePage>Empleados</TitlePage>
      <Div>
        <div className="flex flex-row py-1 gap-1">
          <div className="flex justify-center items-center bg-primary-600 rounded-full w-full">
            <img className="h-10 bg-background-950 border-3 border-primary-500 rounded-full p-1" src={search} alt="" />
            <Input id="search" name="search" placeholder="Buscar..." type="text" handleChange={changeSearchString} value={searchString}></Input>
          </div>
          <div className="hidden md:flex">
            <Dropdown id="filtro" title="Filtro" options={filterOption} handlerChange={changeFilter}></Dropdown>
          </div>
        </div>
        <div className="hidden flex-row justify-between gap-1 md:flex">
          {user?.role == "ADMIN" ? (
            <Button
              id="btnCreateReport"
              type="button"
              variant="primary"
              width="fit"
              handleClick={createEmployee}
            >
              Añadir
            </Button>
          ) : (
            <div></div>
          )}
          <div className="flex gap-1">
            <Dropdown
              id="sort"
              title="Ordenar por"
              options={sortOption}
              handlerChange={changeSort}
            />
            <Dropdown
              id="direction"
              title="Dirección"
              options={directionOption}
              handlerChange={changeDirection}
            />
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
              handlerChange={changeSort}>
            </Dropdown>
            <Dropdown
              id="direction"
              title="Dirección"
              options={directionOption}
              handlerChange={changeDirection}>
            </Dropdown>
            <Dropdown
              id="filtro"
              title="Filtro"
              options={filterOption}
              handlerChange={changeFilter}>
            </Dropdown>
            <Button
              id="btnCreateReport"
              type="button"
              width="full"
              handleClick={createEmployee}>
              Añadir Empleado
            </Button>
          </Modal>
        </div>
        <DivList>
          {employees.map((employee) => (
            <div
              key={employee.id}
              onClick={() => viewEmployee(employee.id)}
              className="flex w-full flex-col rounded-xl border-2 border-background-900 bg-background-950 p-1"
            >
              <div className="flex w-full flex-col">
                <span className="w-full text-xl">{employee.name}</span>
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
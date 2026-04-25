import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { Main } from "../../components/Main/Main";
import { Modal } from "../../components/Modal/Modal";
import { Pill } from "../../components/Pill/Pill";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { useUserContext } from "../../contexts/UserContext";
import type { EmployeeData } from "../../types/employee";
import { useEffect, useState } from "react";
import EmployeeService from "../../services/employeeService";
import { Loader } from "../../components/Loader/Loader";
import { NotFoundElement } from "../error/NotFoundElement";

export function EmployeeById() {
  const { logout } = useUserContext();
  const navegate = useNavigate();
  const { id } = useParams();
  const [employee, setEmployee] = useState<EmployeeData>();
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    EmployeeService.employeeById(Number(id)).then((response) => {
      setEmployee(response);
    }).catch(error => {
      if (error.status == 401) {
        logout();
      } else if (error.status == 404) {
        setIsNotFound(true);
      } else {
        console.log(error);
      }
    });
  }, []);

  const clickEditEmployeeHandler = () => {
    navegate("/employee/" + id + "/edit");
  }

  const openModalDelete = () => {
    setIsOpenModalDelete(true)
  }

  const closeModalDelete = () => {
    setIsOpenModalDelete(false)
  }

  const clickDeleteHandler = () => {
    openModalDelete();
  }

  const clickBackHandler = () => {
    navegate("/employee");
  };

  const deleteEmployee = () => {
    EmployeeService.deleteEmployee(employee!.id).then(() => {
      navegate("/employee", { state: { action: employee?.endDate ? "enable" : "disable", reference: employee?.name } });
    }).catch(error => {
      if (error.status == 401) {
        logout();
      } else {
        console.log(error);
      }
    })
  }

  if (isNotFound) {
    return <NotFoundElement elementType="employee" />
  }

  if (!employee) {
    return <Loader />
  }

  return (
    <Main>
      <TitlePage>Empleado</TitlePage>
      <div className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl p-3 sm:w-3/4 sm:border-4 sm:border-text-600 sm:bg-background-950 sm:shadow-md md:w-2/3 lg:w-2/4 xl:w-1/3">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex flex-row gap-1 pb-1">
            <span className="text-2xl font-semibold sm:text-4xl">
              {employee?.name}
            </span>
            {employee?.endDate != null ?
              <Pill variant="danger">Inactivo</Pill> : ""
            }
          </div>
          <LineHorizontal></LineHorizontal>
        </div>
        <span className="text-xl font-semibold sm:text-2xl">{employee?.email}</span>
        <span className="text-xl font-semibold sm:text-2xl">
          {employee?.creationDate.toLocaleDateString()}
        </span>
        <Button
          id="btnEdit"
          type="button"
          variant="accent"
          handleClick={clickEditEmployeeHandler}
        >
          Editar Empleado
        </Button>
        <Button
          id="btnDelete"
          type="button"
          variant={employee?.endDate == null ? "danger" : "success"}
          handleClick={clickDeleteHandler}
        >
          {employee?.endDate == null ? "Dar de baja" : "Dar de alta"}
        </Button>
        <Modal isOpen={isOpenModalDelete} onClose={closeModalDelete}>
          <span className="text-center text-lg">
            {employee?.endDate == null ?
              "¿Estas seguro que quieres dar de baja este empleado?" :
              "¿Estas seguro que quieres dar de alta este empleado?"}

          </span>
          <div className="flex flex-col sm:flex-row w-full gap-5 sm:gap-1 mt-3 sm:mt-0">
            <Button
              id="btnCancelDelete"
              type="button"
              variant="secondary"
              handleClick={() => setIsOpenModalDelete(false)}
            >
              Cancelar
            </Button>
            <Button
              id="btnModalDelete"
              type="button"
              variant={employee?.endDate == null ? "danger" : "success"}
              handleClick={deleteEmployee}
            >
              {employee?.endDate == null ? "Dar de baja" : "Dar de alta"}
            </Button>
          </div>
        </Modal>
        <Button
          id="btnBack"
          type="button"
          variant="secondary"
          handleClick={clickBackHandler}
        >
          Volver
        </Button>
      </div>
    </Main>
  );
}
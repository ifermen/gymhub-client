import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { Main } from "../../components/Main/Main";
import { Modal } from "../../components/Modal/Modal";
import { useUserContext } from "../../contexts/UserContext";
import type { EmployeeData } from "../../types/employee";
import { useEffect, useState } from "react";
import EmployeeService from "../../services/employeeService";
import { Loader } from "../../components/Loader/Loader";
import { NotFoundElement } from "../error/NotFoundElement";
import DivContent from "../../components/Div/DivContent";
import { HeaderById } from "../../components/Header/HeaderById";
import { Data } from "../../components/Data/Data";

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
      <DivContent>
        <HeaderById title={employee.name} type="employee" isActive={employee.endDate ? false : true} />
        <LineHorizontal></LineHorizontal>
        <div className="sm:p-7 p-3 flex flex-col gap-3 w-full">
          <Data title="EMAIL" value={employee.email} />
          <Data title="DESDE" value={employee.creationDate.toLocaleDateString()} />
        </div>
        <LineHorizontal></LineHorizontal>
        <div className="flex flex-col gap-3 w-full sm:p-7 p-3">
          <div className="flex flex-row w-full gap-3">
            <Modal isOpen={isOpenModalDelete} onClose={closeModalDelete}>
              <span className="text-center text-lg">
                {employee?.endDate == null ?
                  "¿Estas seguro que quieres dar de baja al empleado?" :
                  "¿Estas seguro que quieres dar de alta al empleado?"}

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
                  variant={employee.endDate == null ? "danger" : "success"}
                  handleClick={deleteEmployee}
                >
                  {employee.endDate == null ? "Desactivar" : "Activar"}
                </Button>
              </div>
            </Modal>
            <Button
              id="btnEdit"
              type="button"
              variant="accent"
              handleClick={clickEditEmployeeHandler}
            >
              Editar
            </Button>
            <Button
              id="btnDelete"
              type="button"
              variant={employee.endDate == null ? "danger" : "success"}
              handleClick={clickDeleteHandler}
            >
              {employee.endDate == null ? "Desactivar" : "Activar"}
            </Button>
          </div>
          <Button
            id="btnBack"
            type="button"
            variant="secondary"
            handleClick={clickBackHandler}
          >
            Volver
          </Button>
        </div>
      </DivContent>
    </Main >
  );
}
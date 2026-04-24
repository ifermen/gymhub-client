import { useEffect, useState } from "react";
import type { ClassData, JoinClass } from "../../types/class";
import { useNavigate, useParams } from "react-router-dom";
import { ClassService } from "../../services/classService";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { Main } from "../../components/Main/Main";
import { useUserContext } from "../../contexts/UserContext";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { Button } from "../../components/Button/Button";
import DivContent from "../../components/Div/DivContent";
import { Pill } from '../../components/Pill/Pill';
import toast from "react-hot-toast";
import { Loader } from "../../components/Loader/Loader";
import { NotFoundElement } from "../error/NotFoundElement";
import { Modal } from "../../components/Modal/Modal";

export function ClassById() {
  const { user, logout } = useUserContext();
  const [joinedClasses, setJoinedClasses] = useState<ClassData[]>([]);
  const navegate = useNavigate();
  const { id } = useParams();
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [classData, setClassData] = useState<ClassData | null>();
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    ClassService.classById(Number(id))
      .then((response) => {
        setClassData(response);
      })
      .catch((error) => {
        if (error.status == 401) {
          logout();
        } else if (error.status == 404) {
          setIsNotFound(true);
        }
      });
  }, [id, joinedClasses]);

  if (user?.role == "CLIENT") {
    useEffect(() => {
      ClassService.joinedClasses().then(response => {
        setJoinedClasses(response);
      })
    }, [])
  }

  const clickEditHandler = () => {
    navegate("/class/" + classData?.id + "/edit");
  }

  const clickJoinHandler = () => {
    const classJoin: JoinClass = {
      idClass: classData!.id
    }
    ClassService.joinClass(classJoin).then(response => {
      setJoinedClasses([...joinedClasses, response])
      toast.success("Te has unido a la clase")
    }).catch(error => {
      if (error.status == 401) {
        logout();
      } else if (error.status == 409) {
        toast.error(error.message)
      } else {
        console.log(error)
      }
    })
  }

  const clickLeaveHandler = () => {
    ClassService.leaveClass(classData!.id).then(() => {
      setJoinedClasses(joinedClasses.filter(c => c.id != classData!.id));
      toast.success("Has dejado la clase")
    }).catch(error => {
      if (error.status == 401) {
        logout();
      } else {
        console.log(error)
      }
    })
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

  const deleteClass = () => {
    ClassService.deleteClass(classData!.id).then(() => {
      navegate("/class", { state: { action: classData?.endDate ? "enable" : "disable", reference: classData?.title } });
    }).catch(error => {
      if (error.status == 401) {
        logout();
      } else {
        console.log(error);
      }
    })
  }

  const clickBackHandler = () => {
    navegate("/class");
  }

  if (isNotFound) {
    return <NotFoundElement elementType="class" />
  }

  if (!classData) {
    return <Loader />
  }

  return (
    <Main>
      <TitlePage>Clase</TitlePage>
      <DivContent>
        <div className="flex w-full flex-row gap-1 justify-between">
          <span className="text-center text-xl font-semibold sm:text-4xl w-full">
            {classData?.title}
          </span>
          {classData?.endDate ?
            <Pill variant="danger">Finalizado</Pill> :
            ""
          }
        </div>
        <LineHorizontal></LineHorizontal>
        <div
          className="flex w-full flex-col sm:flex-row gap-3 justify-between"
        >
          <Pill variant="primary">{classData?.nameTeacher}</Pill>
          <Pill variant="primary">{classData?.schedule}</Pill>
        </div>
        <div className="flex w-full flex-col sm:flex-row gap-3 justify-between">
          <Pill variant="primary">{classData?.facility}</Pill>
          <Pill variant="primary">Capacidad: {classData?.numJoined}/{classData?.capacity}</Pill>
        </div>
        <span className="text-base sm:text-2xl">{classData?.description}</span>
        <LineHorizontal></LineHorizontal>
        {user?.role == "ADMIN" ?
          <Button
            id="btnEdit"
            type="button"
            variant="accent"
            handleClick={clickEditHandler}
          >
            Editar
          </Button> :
          user?.role == "CLIENT" && joinedClasses?.some(c => c.id == classData?.id) ?
            <Button
              id="btnLeave"
              type="button"
              variant="danger"
              handleClick={clickLeaveHandler}
            >
              Dejar clase
            </Button> :
            user?.role == "CLIENT" ?
              <Button
                id="btnJoin"
                type="button"
                handleClick={clickJoinHandler}
              >
                Unirse
              </Button> : ""
        }
        {
          user?.role == "ADMIN" ? <>
            <Button
              id="btnDelete"
              type="button"
              variant={classData?.endDate == null ? "danger" : "success"}
              handleClick={clickDeleteHandler}
            >
              {classData?.endDate == null ? "Desactivar" : "Activar"}
            </Button>
            <Modal isOpen={isOpenModalDelete} onClose={closeModalDelete}>
              <span className="text-center text-lg">
                {classData?.endDate == null ?
                  "¿Estas seguro que quieres desactivar esta oferta?" :
                  "¿Estas seguro que quieres activar esta oferta?"}

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
                  variant={classData?.endDate == null ? "danger" : "success"}
                  handleClick={deleteClass}
                >
                  {classData?.endDate == null ? "Desactivar" : "Activar"}
                </Button>
              </div>
            </Modal>
          </>
            : ""
        }
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

import { useEffect, useState } from "react";
import type { ClassData, JoinClass } from "../../types/class";
import { useNavigate, useParams } from "react-router-dom";
import { ClassService } from "../../services/classService";
import { Main } from "../../components/Main/Main";
import { useUserContext } from "../../contexts/UserContext";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { Button } from "../../components/Button/Button";
import DivContent from "../../components/Div/DivContent";
import toast from "react-hot-toast";
import { Loader } from "../../components/Loader/Loader";
import { NotFoundElement } from "../error/NotFoundElement";
import { Modal } from "../../components/Modal/Modal";
import { HeaderById } from "../../components/Header/HeaderById";
import { Data } from '../../components/Data/Data';

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
      <DivContent>
        <HeaderById title={classData.title} type="CLASE" isActive={classData.endDate ? false : true}></HeaderById>
        <LineHorizontal variant="grey"></LineHorizontal>
        <div className="sm:p-7 p-3 flex flex-col gap-3">
          <div className="flex flex-row gap-3">
            <Data title="INSTRUCTOR" value={classData.nameTeacher} />
            <Data title="INSTALACIÓN" value={classData.facility} />
          </div>
          <div className="flex sm:flex-row flex-col gap-3">
            <Data title="HORARIO" value={classData.schedule} />
            <Data title="CAPACIDAD" value={classData.numJoined + " / " + classData.capacity} />
          </div>
          <Data title="DESCRIPCIÓN" value={classData.description} />
        </div>
        <LineHorizontal variant="grey"></LineHorizontal>
        <div className="flex flex-col gap-3 w-full sm:p-7 p-3">
          {user?.role == "CLIENT" ?
            joinedClasses?.some(c => c.id == classData?.id) ?
              <Button
                id="btnLeave"
                type="button"
                variant="danger"
                handleClick={clickLeaveHandler}
              >
                Dejar clase
              </Button> :
              <Button
                id="btnJoin"
                type="button"
                handleClick={clickJoinHandler}
              >
                Unirse
              </Button>
            : <div className="flex flex-row w-full gap-3">
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
                variant={classData?.endDate == null ? "danger" : "success"}
                handleClick={clickDeleteHandler}
              >
                {classData?.endDate == null ? "Desactivar" : "Activar"}
              </Button>
            </div>
          }
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
    </Main>
  );
}

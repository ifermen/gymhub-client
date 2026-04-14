import { useEffect, useState } from "react";
import { Div } from "../../components/Div/Div";
import { DivList } from "../../components/Div/DivList";
import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import type { ClassData } from "../../types/class";
import { ClassService } from "../../services/classService";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { Modal } from "../../components/Modal/Modal";
import { PageButtonSection } from "../../components/PageButtonSection/PageButtonSection";

export function ClassList() {
  const { user, logout } = useUserContext();
  const navegate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sort, setSort] = useState("id");
  const [direction, setDirection] = useState<"DESC" | "ASC">("DESC");
  const [pageKey, setPageKey] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [classes, setClasses] = useState<ClassData[]>([]);
  const directionOption = new Map<string, string>([
    ["-1", "Por defecto"],
    ["DESC", "Descendente"],
    ["ASC", "Ascendente"],
  ]);
  const sortOption = new Map<string, string>([
    ["-1", "Por defecto"],
    ["title", "Título"],
    ["teacher", "Profesor"]
  ]);

  useEffect(() => {
    ClassService.listClasses({
      direction: direction,
      pageKey: pageKey,
      sort: sort,
    }).then(response => {
      setClasses(response.content);
      setTotalPages(response.totalPages);
    }).catch(error => {
      if (error.status == 401) {
        logout();
      }
    });
  }, [sort, direction, pageKey, totalPages]);

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

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const createClass = () => {
    navegate("/class/create")
  }

  const viewClass = (id: number) => {
    navegate("/class/" + id);
  }

  return (
    <Main>
      <TitlePage>Clases</TitlePage>
      <Div>
        <div className="hidden flex-row justify-between gap-1 sm:flex">
          {user?.role == "ADMIN" ?
            <Button
              id="btnCreateReport"
              type="button"
              variant="primary"
              width="fit"
              handleClick={createClass}
            >
              Añadir
            </Button> :
            <div></div>
          }
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
        <div className="flex flex-col sm:hidden">
          <Button id="btnShowOptions" type="button" handleClick={openModal}>
            Opciones
          </Button>
          <Modal isOpen={isOpenModal} onClose={closeModal}>
            <Dropdown
              id="sort"
              title="Ordenar por"
              options={sortOption}
              handlerChange={changeSort}
            ></Dropdown>
            <Dropdown
              id="direction"
              title="Dirección"
              options={directionOption}
              handlerChange={changeDirection}
            ></Dropdown>
            <Button
              id="btnCreateReport"
              type="button"
              width="full"
              handleClick={createClass}
            >
              Añadir Clase
            </Button>
          </Modal>
        </div>
        <DivList>
          {classes.map(classData => (
            <div
              key={classData.id}
              onClick={() => viewClass(classData.id)}
              className="flex w-full flex-col rounded-xl border-2 border-background-900 bg-background-950 p-1"
            >
              <div className="flex w-full flex-col">
                <span className="w-full text-xl">{classData.title}</span>
              </div>
              <div className="flex flex-row items-center justify-between">
                <span className="text-md h-fit">{classData.nameTeacher}</span>
                <span className="text-md h-fit">{classData.numJoined}/{classData.capacity}</span>
              </div>
            </div>
          ))}
        </DivList>
        <PageButtonSection pageKey={pageKey} setPageKey={changePageKey} totalPages={totalPages}></PageButtonSection>
      </Div>
    </Main>
  )
}
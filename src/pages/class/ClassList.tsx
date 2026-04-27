import { useEffect, useRef, useState } from "react";
import { Div } from "../../components/Div/Div";
import DivList from "../../components/Div/DivList";
import { Main } from "../../components/Main/Main";
import type { ClassData } from "../../types/class";
import { ClassService } from "../../services/classService";
import { useUserContext } from "../../contexts/UserContext";
import { useLocation, useNavigate } from "react-router-dom";
import { PageButtonSection } from "../../components/ListOptions/PageButtonSection";
import { Loader } from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { HeaderList } from "../../components/Header/HeaderList";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { ListOptions } from "../../components/ListOptions/ListOptions";
import type { PageResponse } from '../../types/api';

export function ClassList() {
  const { user, logout } = useUserContext();
  const navegate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sort, setSort] = useState("id");
  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState("");
  const [direction, setDirection] = useState<"DESC" | "ASC">("DESC");
  const [pageKey, setPageKey] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [classList, setClassList] = useState<PageResponse<ClassData[]> | null>();

  const hasShownToast = useRef(false);
  const { state } = useLocation();
  const action = state?.action;

  useEffect(() => {
    if (action && !hasShownToast.current) {
      if (action == "create") {
        toast.success(`Clase \"${state.reference}\" creada con éxito`);
        hasShownToast.current = true;
      } else if (action == "edit") {
        toast.success(`Clase \"${state.reference}\" editada con éxito`);
        hasShownToast.current = true;
      } else if (action == "enable") {
        toast.success(`Clase \"${state.reference}\" activada con éxito`);
        hasShownToast.current = true;
      } else if (action == "disable") {
        toast.success(`Clase \"${state.reference}\" desactivada con éxito`);
        hasShownToast.current = true;
      }
    }
  }, [action]);

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
  const filterOption = new Map<string, string>([
    ["-1", "Ninguno"],
    ["isActive", "Activo"]
  ]);
  if (user?.role == "CLIENT") {
    filterOption.set("isJoined", "Mis Clases");
  } else if (user?.role == "EMPLOYEE") {
    filterOption.set("myClass", "Mis Clases");
  }
  filterOption.set("isFull", "Completas");
  filterOption.set("isNotFull", "No completas");
  filterOption.set("isDisactive", "No Activo");

  useEffect(() => {
    if (searchString == "") {
      ClassService.listClasses({
        direction: direction,
        pageKey: pageKey,
        sort: sort,
        filter: filter
      }).then(response => {
        setClassList(response);
        setTotalPages(response.totalPages);
      }).catch(error => {
        if (error.status == 401) {
          logout();
        }
      });
    } else {
      ClassService.searchClass(searchString, {
        direction: direction,
        pageKey: pageKey,
        sort: sort,
        filter: filter
      }).then(response => {
        setClassList(response);
        setTotalPages(response.totalPages);
      }).catch(error => {
        if (error.status == 401) {
          logout();
        }
      })
    }
  }, [sort, direction, pageKey, totalPages, searchString, filter]);

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

  const changeFilter = (value: string) => {
    if (value != "-1") {
      setFilter(value);
    } else {
      setFilter("");
    }
  }

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

  const createClass = () => {
    navegate("/class/create")
  }

  const viewClass = (id: number) => {
    navegate("/class/" + id);
  }

  if (!classList) {
    return <Loader />
  }

  return (
    <Main>
      <Div>
        <HeaderList title="Listado de clases" type="CLASE" />
        <LineHorizontal />
        <ListOptions
          searchString={searchString}
          changeSearchString={changeSearchString}
          create={createClass}
          filter={filter}
          changeFilter={changeFilter}
          filterOption={filterOption}
          sort={sort}
          changeSort={changeSort}
          sortOption={sortOption}
          direction={direction}
          changeDirection={changeDirection}
          directionOption={directionOption}
          isOpenModal={isOpenModal}
          openModal={openModal}
          closeModal={closeModal} />
        <LineHorizontal />
        <DivList>
          <span className="text-sm font-bold text-text-500">LISTADO - {classList.totalElements}</span>
          {classList.content.map(classData => (
            <div
              key={classData.id}
              onClick={() => viewClass(classData.id)}
              className="flex flex-col w-full bg-background-950 border border-background-800 p-3 rounded-xl cursor-pointer"
            >
              <div className="flex w-full flex-col">
                <span className="w-full text-xl">{classData.title}</span>
              </div>
              <div className="flex flex-row items-center justify-between">
                <span className="font-bold text-sm text-text-500 h-fit">{classData.nameTeacher.toUpperCase()}</span>
                <span className="font-bold text-sm text-text-500 h-fit">{classData.numJoined}/{classData.capacity}</span>
              </div>
            </div>
          ))}
        </DivList>
        <PageButtonSection pageKey={pageKey} setPageKey={changePageKey} totalPages={totalPages}></PageButtonSection>
      </Div>
    </Main>
  )
}
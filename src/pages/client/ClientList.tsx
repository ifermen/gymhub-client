import { Main } from "../../components/Main/Main";
import DivList from "../../components/Div/DivList";
import type { ClientData } from "../../types/client";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ClientService } from "../../services/clientService";
import { useUserContext } from "../../contexts/UserContext";
import { PageButtonSection } from "../../components/ListOptions/PageButtonSection";
import { Loader } from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { HeaderList } from "../../components/Header/HeaderList";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { Div } from "../../components/Div/Div";
import { ListOptions } from "../../components/ListOptions/ListOptions";

export function ClientList() {
  const { logout } = useUserContext();
  const navegate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sort, setSort] = useState("creationDate");
  const [searchString, setSearchString] = useState("");
  const [filter, setFilter] = useState("");
  const [direction, setDirection] = useState<"DESC" | "ASC">("DESC");
  const [pageKey, setPageKey] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [clients, setClients] = useState<ClientData[] | null>();

  const hasShownToast = useRef(false);
  const { state } = useLocation();
  const action = state?.action;

  useEffect(() => {
    if (action && !hasShownToast.current) {
      if (action == "create") {
        toast.success(`Cliente \"${state.reference}\" creada con éxito`);
        hasShownToast.current = true;
      } else if (action == "edit") {
        toast.success(`Cliente \"${state.reference}\" editada con éxito`);
        hasShownToast.current = true;
      } else if (action == "enable") {
        toast.success(`Cliente \"${state.reference}\" dado de alta con éxito`);
        hasShownToast.current = true;
      } else if (action == "disable") {
        toast.success(`Cliente \"${state.reference}\" dado de baja con éxito`);
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
    ["isRenewed", "Suscrito"],
    ["isNotRenewed", "No Suscrito"],
    ["isDisactive", "No Activo"]
  ]);

  useEffect(() => {
    if (searchString == "") {
      ClientService.listClients({
        direction: direction,
        pageKey: pageKey,
        pageSize: 20,
        sort: sort,
        filter: filter
      })
        .then((response) => {
          setClients(response.content);
          setTotalPages(response.totalPages);
        })
        .catch((error) => {
          if (error.status == 401) {
            logout();
          }
        });
    } else {
      ClientService.searchClients(
        searchString,
        {
          direction: direction,
          pageKey: pageKey,
          pageSize: 20,
          sort: sort,
          filter: filter
        })
        .then((response) => {
          setClients(response.content);
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

  const viewClient = (id: number) => {
    navegate("/client/" + id);
  };

  const createClient = () => {
    navegate("/client/create");
  };

  if (!clients) {
    return <Loader />
  }

  return (
    <Main>
      <Div>
        <HeaderList title="Listado de clientes" type="CLIENTE" />
        <LineHorizontal />
        <ListOptions
          searchString={searchString}
          changeSearchString={changeSearchString}
          create={createClient}
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
          {clients.map((client) => (
            <div
              key={client.id}
              onClick={() => viewClient(client.id)}
              className="flex flex-col w-full bg-background-950 border border-background-800 p-3 rounded-xl cursor-pointer"
            >
              <div className="flex w-full flex-col">
                <span className="w-full text-xl">{client.name}</span>
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

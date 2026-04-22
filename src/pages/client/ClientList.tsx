import { Main } from "../../components/Main/Main";
import { Div } from "../../components/Div/Div";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import DivList from "../../components/Div/DivList";
import type { ClientData } from "../../types/client";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ClientService } from "../../services/clientService";
import { useUserContext } from "../../contexts/UserContext";
import { PageButtonSection } from "../../components/ListOptions/PageButtonSection";
import { SearchFilterSortAddOptions } from "../../components/ListOptions/SearchFilterSortAddOptions";

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
  const [clients, setClients] = useState<ClientData[]>([]);
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

  return (
    <Main>
      <TitlePage>Clientes</TitlePage>
      <Div>
        <SearchFilterSortAddOptions
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
          createNavegate={createClient}
        />
        <DivList>
          {clients.map((client) => (
            <div
              key={client.id}
              onClick={() => viewClient(client.id)}
              className="flex w-full flex-col rounded-xl border-2 border-background-900 bg-background-950 p-1"
            >
              <div className="flex w-full flex-col">
                <span className="w-full text-xl">{client.name}</span>
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

import { Main } from "../../components/Main/Main";
import { Div } from "../../components/Div/Div";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import DivList from "../../components/Div/DivList";
import type { ClientData } from "../../types/client";
import { useEffect, useState, type ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { ClientService } from "../../services/clientService";
import { useUserContext } from "../../contexts/UserContext";
import { Button } from "../../components/Button/Button";
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { Modal } from "../../components/Modal/Modal";
import { PageButtonSection } from "../../components/ListOptions/PageButtonSection";
import search from "../../assets/icons/search.svg";
import { Input } from "../../components/Input/Input";

export function ClientList() {
  const { user, logout } = useUserContext();
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

  const changeSearchString = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchString(event.target.value)
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
        <div className="flex flex-row py-1 gap-1">
          <div className="flex justify-center items-center bg-primary-600 rounded-full w-full">
            <img className="h-10 bg-background-950 border-3 border-primary-500 rounded-full p-1" src={search} alt="" />
            <Input id="search" name="search" placeholder="Buscar..." type="text" handleChange={changeSearchString} value={searchString}></Input>
          </div>
          <div className="hidden md:flex">
            <Dropdown id="filtro" title="Filtro" options={filterOption} handlerChange={changeFilter} value={filter} />
          </div>
        </div>
        <div className="hidden flex-row justify-between gap-1 md:flex">
          {user?.role == "ADMIN" ? (
            <Button
              id="btnCreateReport"
              type="button"
              variant="primary"
              width="fit"
              handleClick={createClient}
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
              value={sort}
            />
            <Dropdown
              id="direction"
              title="Dirección"
              options={directionOption}
              handlerChange={changeDirection}
              value={direction}
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
              handlerChange={changeSort}
              value={sort} />
            <Dropdown
              id="direction"
              title="Dirección"
              options={directionOption}
              handlerChange={changeDirection}
              value={direction} />
            <Dropdown
              id="filtro"
              title="Filtro"
              options={filterOption}
              handlerChange={changeFilter}
              value={filter} />
            <Button
              id="btnCreateReport"
              type="button"
              width="full"
              handleClick={createClient}>
              Añadir Cliente
            </Button>
          </Modal>
        </div>
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

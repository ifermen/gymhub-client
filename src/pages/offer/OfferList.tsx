import { useNavigate } from "react-router-dom";
import { Div } from "../../components/Div/Div";
import DivList from "../../components/Div/DivList";
import { PageButtonSection } from "../../components/ListOptions/PageButtonSection";
import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import type { OfferData } from "../../types/offer";
import { Button } from "../../components/Button/Button";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { Modal } from "../../components/Modal/Modal";
import { OfferService } from "../../services/offerService";

export function OfferList() {
  const { logout } = useUserContext();
  const navegate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sort, setSort] = useState("title");
  const [direction, setDirection] = useState<"DESC" | "ASC">("DESC");
  const [pageKey, setPageKey] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [offers, setOffers] = useState<OfferData[]>([]);
  const directionOption = new Map<string, string>([
    ["DESC", "Descendente"],
    ["ASC", "Ascendente"],
  ]);
  const sortOption = new Map<string, string>([
    ["title", "Título"],
    ["cost", "Coste"],
    ["numDay", "Número de días"],
  ]);

  useEffect(() => {
    OfferService.listOffers({
      direction: direction,
      pageKey: pageKey,
      sort: sort,
    }).then(response => {
      setOffers(response.content);
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

  const viewOffer = (id: number) => {
    navegate("/offer/" + id);
  };

  const createOffer = () => {
    navegate("/offer/create");
  };

  return (
    <Main>
      <TitlePage>Ofertas</TitlePage>
      <Div>
        <div className="hidden flex-row justify-between gap-1 md:flex">
          <Button
            id="btnCreateReport"
            type="button"
            variant="primary"
            width="fit"
            handleClick={createOffer}
          >
            Añadir
          </Button>
          <div className="flex gap-1">
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
            <Button
              id="btnCreateReport"
              type="button"
              width="full"
              handleClick={createOffer}
            >
              Añadir Clase
            </Button>
          </Modal>
        </div>
        <DivList>
          {offers.map((offer) => (
            <div
              key={offer.id}
              onClick={() => viewOffer(offer.id)}
              className="flex w-full flex-col rounded-xl border-2 border-background-900 bg-background-950 p-1"
            >
              <div className="flex w-full flex-col">
                <span className="w-full text-xl">{offer.title}</span>
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
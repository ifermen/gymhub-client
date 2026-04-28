import { useLocation, useNavigate } from "react-router-dom";
import { Div } from "../../components/Div/Div";
import DivList from "../../components/Div/DivList";
import { PageButtonSection } from "../../components/ListOptions/PageButtonSection";
import { Main } from "../../components/Main/Main";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState, useRef } from "react";
import type { OfferData } from "../../types/offer";
import { OfferService } from "../../services/offerService";
import { Loader } from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { HeaderList } from "../../components/Header/HeaderList";
import { ListOptions } from "../../components/ListOptions/ListOptions";
import { LineHorizontal } from "../../components/Line/LineHorizontal";

export function OfferList() {
  const { logout } = useUserContext();
  const navegate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [sort, setSort] = useState("title");
  const [direction, setDirection] = useState<"DESC" | "ASC">("DESC");
  const [filter, setFilter] = useState("");
  const [pageKey, setPageKey] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [offers, setOffers] = useState<OfferData[] | null>();

  const hasShownToast = useRef(false);
  const { state } = useLocation();
  const action = state?.action;

  useEffect(() => {
    if (action && !hasShownToast.current) {
      if (action == "create") {
        toast.success(`Oferta \"${state.reference}\" creada con éxito`);
        hasShownToast.current = true;
      } else if (action == "edit") {
        toast.success(`Oferta \"${state.reference}\" editada con éxito`);
        hasShownToast.current = true;
      } else if (action == "enable") {
        toast.success(`Oferta \"${state.reference}\" activada con éxito`);
        hasShownToast.current = true;
      } else if (action == "disable") {
        toast.success(`Oferta \"${state.reference}\" desactivada con éxito`);
        hasShownToast.current = true;
      }
    }
  }, [action]);

  const directionOption = new Map<string, string>([
    ["DESC", "Descendente"],
    ["ASC", "Ascendente"],
  ]);
  const sortOption = new Map<string, string>([
    ["title", "Título"],
    ["cost", "Coste"],
    ["numDay", "Número de días"],
  ]);
  const filterOption = new Map<string, string>([
    ["-1", "Ninguno"],
    ["isActive", "Activo"],
    ["isDisactive", "Desactivo"],
  ]);


  useEffect(() => {
    OfferService.listOffers({
      direction: direction,
      pageKey: pageKey,
      sort: sort,
      filter: filter
    }).then(response => {
      setOffers(response.content);
      setTotalPages(response.totalPages);
    }).catch(error => {
      if (error.status == 401) {
        logout();
      }
    });
  }, [sort, direction, pageKey, totalPages, filter]);

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

  if (!offers) {
    return <Loader />
  }

  return (
    <Main>
      <Div>
        <HeaderList title="Listado de Ofertas" type="OFERTA" />
        <LineHorizontal />
        <ListOptions
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
          create={createOffer}
        />
        <LineHorizontal />
        <DivList>
          {offers.map((offer) => (
            <div
              key={offer.id}
              onClick={() => viewOffer(offer.id)}
              className="flex w-full flex-col rounded-xl border-2 border-background-900 bg-background-950 p-1 cursor-pointer"
            >
              <div className="flex w-full flex-col">
                <span className="w-full text-xl">{offer.title}</span>
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
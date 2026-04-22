import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import DivContent from "../../components/Div/DivContent";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import type { OfferData } from "../../types/offer";
import { OfferService } from "../../services/offerService";

export function OfferById() {
  const { logout } = useUserContext();
  const navegate = useNavigate();
  const { id } = useParams();
  const [offer, setOffer] = useState<OfferData | null>();

  useEffect(() => {
    OfferService.offerById(Number(id))
      .then((response) => {
        setOffer(response);
      })
      .catch((error) => {
        if (error.status == 401) {
          logout();
        }
      });
  }, [id]);

  const clickEditHandler = () => {
    navegate("/offer/" + offer?.id + "/edit");
  }

  const clickBackHandler = () => {
    navegate("/offer");
  }

  return (
    <Main>
      <TitlePage>Oferta</TitlePage>
      <DivContent>
        <div className="flex w-full flex-col gap-1">
          <span className="text-center text-xl font-semibold sm:text-4xl">
            {offer?.title}
          </span>
        </div>
        <LineHorizontal></LineHorizontal>
        {offer?.endDate ?
          <span className="text-lg">Fin de la Oferta: {offer?.endDate.toLocaleDateString()}</span> :
          ""
        }
        <div className="flex flex-row w-full gap-3">
          <div className="flex flex-col w-full justify-center items-center bg-background-900 rounded-lg">
            <span className="text-lg font-bold">Coste</span>
            <span className="text-2xl">{offer?.cost}€</span>
          </div>
          <div className="flex flex-col w-full justify-center items-center bg-background-900 rounded-lg">
            <span className="text-lg font-bold">Días</span>
            <span className="text-2xl">{offer?.numDay}</span>
          </div>
        </div>
        <LineHorizontal></LineHorizontal>
        <Button
          id="btnEdit"
          type="button"
          variant="accent"
          handleClick={clickEditHandler}
        >Editar</Button>
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
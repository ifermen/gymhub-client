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
import { Modal } from "../../components/Modal/Modal";
import { Loader } from "../../components/Loader/Loader";
import { NotFoundElement } from "../error/NotFoundElement";

export function OfferById() {
  const { logout } = useUserContext();
  const navegate = useNavigate();
  const { id } = useParams();
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [offer, setOffer] = useState<OfferData | null>();
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    OfferService.offerById(Number(id))
      .then((response) => {
        setOffer(response);
      })
      .catch((error) => {
        if (error.status == 401) {
          logout();
        } else if (error.status == 404) {
          setIsNotFound(true);
        } else {
          console.log(error)
        }
      });
  }, [id]);

  const clickEditHandler = () => {
    navegate("/offer/" + offer?.id + "/edit");
  }

  const clickBackHandler = () => {
    navegate("/offer");
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

  const deleteOffer = () => {
    OfferService.deleteOffer(offer!.id).then(() => {
      navegate("/offer");
    }).catch(error => {
      if (error.status == 401) {
        logout();
      } else {
        console.log(error);
      }
    })
  }

  if (isNotFound) {
    return <NotFoundElement elementType="offer" />
  }

  if (!offer) {
    return <Loader />
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
          id="btnDelete"
          type="button"
          variant={offer?.endDate == null ? "danger" : "success"}
          handleClick={clickDeleteHandler}
        >
          {offer?.endDate == null ? "Desactivar" : "Activar"}
        </Button>
        <Modal isOpen={isOpenModalDelete} onClose={closeModalDelete}>
          <span className="text-center text-lg">
            {offer?.endDate == null ?
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
              variant={offer?.endDate == null ? "danger" : "success"}
              handleClick={deleteOffer}
            >
              {offer?.endDate == null ? "Desactivar" : "Activar"}
            </Button>
          </div>
        </Modal>
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
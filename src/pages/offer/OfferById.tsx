import { useNavigate, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import DivContent from "../../components/Div/DivContent";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { Main } from "../../components/Main/Main";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import type { OfferData } from "../../types/offer";
import { OfferService } from "../../services/offerService";
import { Modal } from "../../components/Modal/Modal";
import { Loader } from "../../components/Loader/Loader";
import { NotFoundElement } from "../error/NotFoundElement";
import { HeaderById } from '../../components/Header/HeaderById';
import { Data } from "../../components/Data/Data";

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
      navegate("/offer", { state: { action: offer?.endDate ? "enable" : "disable", reference: offer?.title } });
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
      <DivContent>
        <HeaderById title={offer.title} type="offer" isActive={offer.endDate ? false : true} />
        <LineHorizontal variant="grey"></LineHorizontal>
        <div className="sm:p-7 p-3 flex flex-col gap-3 w-full">
          <div className="flex flex-row gap-3">
            <Data size="2xl" title="PRECIO" value={offer.cost + " €"} />
            <Data size="2xl" title="DURACIÓN" value={offer.numDay + (offer.numDay > 1 ? " días" : " día")} />
          </div>
          {offer?.endDate ?
            <Data size="2xl" title="FINALIZADO" value={offer.endDate.toLocaleDateString()} /> :
            <Data size="2xl" title="ESTADO" value="En curso" />
          }
        </div>
        <LineHorizontal variant="grey"></LineHorizontal>
        <div className="flex flex-col gap-3 w-full sm:p-7 p-3">
          <div className="flex flex-row w-full gap-3">
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
              variant={offer?.endDate == null ? "danger" : "success"}
              handleClick={clickDeleteHandler}
            >
              {offer?.endDate == null ? "Desactivar" : "Activar"}
            </Button>
          </div>
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
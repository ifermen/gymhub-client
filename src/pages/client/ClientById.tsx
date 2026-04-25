import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ClientData, RenewalDataWithoutClient } from "../../types/client";
import { ClientService } from "../../services/clientService";
import { Main } from "../../components/Main/Main";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { Button } from '../../components/Button/Button';
import { Modal } from "../../components/Modal/Modal";
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { OfferService } from "../../services/offerService";
import { useUserContext } from "../../contexts/UserContext";
import type { OfferData } from '../../types/offer';
import { Pill } from "../../components/Pill/Pill";
import { Loader } from "../../components/Loader/Loader";
import { NotFoundElement } from "../error/NotFoundElement";
import DivContent from "../../components/Div/DivContent";
import { HeaderById } from "../../components/Header/HeaderById";
import { Data } from "../../components/Data/Data";

export default function ClientById() {
  const { logout } = useUserContext();
  const navegate = useNavigate();
  const { id } = useParams();
  const [client, setClient] = useState<ClientData>();
  const [offerOptions, setOfferOptions] = useState<Map<string, string>>(new Map());
  const [offerSelected, setOfferSelected] = useState("");
  const [isSuscriptionActive, setIsSuscriptionActive] = useState(false);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [isOpenModalDelete, setIsOpenModalDelete] = useState(false);
  const [renewalHistory, setRenewalHistory] = useState<RenewalDataWithoutClient[]>([]);
  const [isHistoryActive, setIsHistoryActive] = useState(false);
  const [isNotFound, setIsNotFound] = useState(false);

  useEffect(() => {
    ClientService.clientById(Number(id)).then((response) => {
      setClient(response);
    }).catch(error => {
      if (error.status == 401) {
        logout();
      } else if (error.status == 404) {
        setIsNotFound(true);
      } else {
        console.log(error);
      }
    });
  }, []);

  useEffect(() => {
    ClientService.getRenewalHistory(Number(id)).then(response => {
      setRenewalHistory(response);
      if (response.length > 0 && response[0].endDate.getTime() > Date.now()) {
        setIsSuscriptionActive(true);
      }
    }).catch(error => {
      console.error(error);
    })
  }, []);

  useEffect(() => {
    OfferService.listAllOffers().then((response: OfferData[]) => {
      const mapOffer = new Map(response.map(e => [e.id + "", e.title]));
      setOfferOptions(mapOffer);
      if (response.length > 0) {
        setOfferSelected(response[0].id + "");
      }
    })
  }, []);

  const changeOfferHandler = (value: string) => {
    setOfferSelected(value);
  }

  const submitRenewHandler = () => {
    ClientService.renewClient({
      clientId: client!.id + "",
      offerId: offerSelected
    }
    ).then(response => {
      setRenewalHistory([...renewalHistory, response]);
      setIsHistoryActive(true);

    })
  }

  const openModal = () => {
    setIsOpenModal(true);
  };

  const closeModal = () => {
    setIsOpenModal(false);
  };

  const clickEditClientHandler = () => {
    navegate("/client/" + id + "/edit");
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

  const clickBackHandler = () => {
    navegate("/client");
  };

  const deleteClient = () => {
    ClientService.deleteClient(client!.id).then(() => {
      navegate("/client", { state: { action: client?.endDate ? "enable" : "disable", reference: client?.name } });
    }).catch(error => {
      if (error.status == 401) {
        logout();
      } else {
        console.log(error);
      }
    })
  }

  if (isNotFound) {
    return <NotFoundElement elementType="client" />
  }

  if (!client) {
    return <Loader />
  }

  return (
    <Main>
      <DivContent>
        <HeaderById title={client.name} isActive={client.endDate ? false : true} type="CLIENTE" />
        <LineHorizontal />
        <div className="sm:p-7 p-3 flex flex-col gap-3 w-full">
          <Data title="EMAIL" value={client.email} />
          <Data title="DESDE" value={client.creationDate.toLocaleDateString()} />
          {/*SUSCRIPTIONS*/}
        </div>
        <LineHorizontal />
        <div className="sm:p-7 sm:pt-3 p-3 flex flex-col gap-3 w-full">
          <div className="flex w-full flex-row gap-5 mt-2 justify-between items-center">
            <span className="font-bold text-sm text-text-500">
              SUSCRIPCION
            </span>
            <div className="flex gap-3">
              <Button id="btnAddSuscription" width="fit" type="button" handleClick={openModal}>Renovar</Button>
              <Modal isOpen={isOpenModal} onClose={closeModal}>
                <form onSubmit={submitRenewHandler} className="flex flex-col justify-center items-center gap-3">
                  <Dropdown
                    id="offer"
                    title="Oferta"
                    options={offerOptions}
                    handlerChange={changeOfferHandler}
                  />
                  <Button id="btnRenew" type="submit" handleClick={() => { }}>Renovar Suscripción</Button>
                </form>
              </Modal>

            </div>
          </div>
          {renewalHistory.length > 0 ? <>
            {isHistoryActive ? (
              <Button
                id="btnHistory"
                variant="secondary"
                type="button"
                width="full"
                handleClick={() => {
                  setIsHistoryActive(false);
                }}
              >
                Ocultar
              </Button>
            ) : (
              <Button
                id="btnHistory"
                variant="secondary"
                type="button"
                width="full"
                handleClick={() => {
                  setIsHistoryActive(true);
                }}
              >
                Historial
              </Button>
            )}
            <div className="flex flex-col w-full bg-background-950 border border-background-800 p-3 rounded-xl">
              <div className="flex justify-between items-center">
                <span className="font-bold text-sm text-text-500">{renewalHistory[0].offer.title}</span>
                <Pill variant={isSuscriptionActive ? "success" : "danger"}>
                  {isSuscriptionActive ? "Activa" : "Terminada"}
                </Pill>
              </div>
              <span className={`sm:text-xl text-lg`}>{renewalHistory[0].startDate.toLocaleDateString()} - {renewalHistory[0].endDate.toLocaleDateString()}</span>
            </div>
            {isHistoryActive
              ? renewalHistory.slice(1).map((renewal) => (
                <div className="flex flex-col w-full bg-background-950 border border-background-800 p-3 rounded-xl">
                  <span className={`sm:text-xl text-lg`}>{renewal.startDate.toLocaleDateString()} - {renewal.endDate.toLocaleDateString()}</span>
                  <span className="font-bold text-sm text-text-500">{renewal.offer.title}</span>
                </div>
              ))
              : ""}
          </> : <span className="text-xl">Sin renovaciones</span>
          }
          { }
        </div>
        <LineHorizontal />
        <div className="flex flex-col gap-3 w-full sm:p-7 p-3">
          <div className="flex flex-row w-full gap-3">
            <Modal isOpen={isOpenModalDelete} onClose={closeModalDelete}>
              <span className="text-center text-lg">
                {client.endDate == null ?
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
                  variant={client.endDate == null ? "danger" : "success"}
                  handleClick={deleteClient}
                >
                  {client.endDate == null ? "Desactivar" : "Activar"}
                </Button>
              </div>
            </Modal>
            <Button
              id="btnEdit"
              type="button"
              variant="accent"
              handleClick={clickEditClientHandler}
            >
              Editar
            </Button>
            <Button
              id="btnDelete"
              type="button"
              variant={client.endDate == null ? "danger" : "success"}
              handleClick={clickDeleteHandler}
            >
              {client.endDate == null ? "Desactivar" : "Activar"}
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

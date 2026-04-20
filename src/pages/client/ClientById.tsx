import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { ClientData, RenewalDataWithoutClient } from "../../types/client";
import { ClientService } from "../../services/clientService";
import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { Button } from '../../components/Button/Button';
import { Modal } from "../../components/Modal/Modal";
import { Dropdown } from '../../components/Dropdown/Dropdown';
import { OfferService } from "../../services/offerService";
import { useUserContext } from "../../contexts/UserContext";
import type { OfferData } from '../../types/offer';
import { Pill } from "../../components/Pill/Pill";

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

  useEffect(() => {
    ClientService.clientById(Number(id)).then((response) => {
      setClient(response);
    }).catch(error => {
      if (error.status == 401) {
        logout();
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
      navegate("/client");
    }).catch(error => {
      if (error.status == 401) {
        logout();
      } else {
        console.log(error);
      }
    })
  }

  return (
    <Main>
      <TitlePage>Cliente</TitlePage>
      <div className="flex w-full flex-col items-center justify-center gap-3 rounded-3xl p-3 sm:w-3/4 sm:border-4 sm:border-text-600 sm:bg-background-950 sm:shadow-md md:w-2/3 lg:w-2/4 xl:w-1/3">
        <div className="flex w-full flex-col items-center justify-center">
          <div className="flex flex-row gap-1 pb-1">
            <span className="text-2xl font-semibold sm:text-4xl">
              {client?.name}
            </span>
            {client?.endDate != null ?
              <Pill variant="danger">Inactivo</Pill> : ""
            }
          </div>
          <LineHorizontal></LineHorizontal>
        </div>
        <span className="text-xl font-semibold sm:text-2xl">{client?.email}</span>
        <span className="text-xl font-semibold sm:text-2xl">
          {client?.creationDate.toLocaleDateString()}
        </span>
        {/*SUSCRIPTIONS*/}
        <div className="flex w-full flex-col items-center justify-center rounded-2xl bg-background-900 p-3">
          <Button id="btnAddSuscription" type="button" handleClick={openModal}>Renovar Suscripción</Button>
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
          <div className="flex w-full flex-row gap-5 mt-2">
            <span className="flex w-full items-center pt-1 text-center text-2xl font-semibold">
              Suscripción
            </span>
            {isHistoryActive ? (
              <Button
                id="btnHistory"
                variant="secondary"
                type="button"
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
                handleClick={() => {
                  setIsHistoryActive(true);
                }}
              >
                Historial
              </Button>
            )}
          </div>
          <div className="mt-2 flex flex-row gap-5 rounded-2xl border-2 border-background-500 bg-background-800 p-2">
            <span
              className={
                isSuscriptionActive
                  ? "flex items-center text-xl font-semibold text-success-400"
                  : "flex items-center text-xl font-semibold text-danger-400"
              }
            >
              {isSuscriptionActive ? "Activa" : "Inactiva"}
            </span>
            {renewalHistory.length > 0 ? (
              <span className="text-center text-xl">
                {renewalHistory[0].startDate.toLocaleDateString()} -{" "}
                {renewalHistory[0].endDate.toLocaleDateString()}
              </span>
            ) : (
              ""
            )}
          </div>
          {isHistoryActive
            ? renewalHistory.slice(1).map((renewal) => (
              <div
                key={renewal.startDate.getTime()}
                className="mt-2 flex flex-row gap-5 rounded-2xl border-2 border-background-500 bg-background-800 p-2"
              >
                <span className="flex items-center text-xl">
                  {renewal.startDate.toLocaleDateString()} -{" "}
                  {renewal.endDate.toLocaleDateString()}
                </span>
              </div>
            ))
            : ""}
          { }
        </div>
        <Button
          id="btnEdit"
          type="button"
          variant="accent"
          handleClick={clickEditClientHandler}
        >
          Editar Cliente
        </Button>
        <Button
          id="btnDelete"
          type="button"
          variant={client?.endDate == null ? "danger" : "success"}
          handleClick={clickDeleteHandler}
        >
          {client?.endDate == null ? "Dar de baja" : "Dar de alta"}
        </Button>
        <Modal isOpen={isOpenModalDelete} onClose={closeModalDelete}>
          <span className="text-center text-lg">
            {client?.endDate == null ?
              "¿Estas seguro que quieres dar de baja este cliente?" :
              "¿Estas seguro que quieres dar de alta este cliente?"}

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
              variant={client?.endDate == null ? "danger" : "success"}
              handleClick={deleteClient}
            >
              {client?.endDate == null ? "Dar de baja" : "Dar de alta"}
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
      </div>
    </Main>
  );
}

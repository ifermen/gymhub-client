import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useUserContext } from "../../contexts/UserContext";
import type { OfferCreate, OfferData, OfferUpdate } from "../../types/offer";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { OfferService } from "../../services/offerService";
import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import DivContent from "../../components/Div/DivContent";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";

interface OfferFormForm {
  title: string;
  cost: number;
  numDay: number;
}
export function OfferForm() {
  const { logout } = useUserContext();
  const location = useLocation();
  const navegate = useNavigate();
  const mode = location.pathname.includes("edit") ? "edit" : "create";
  const [offer, setOffer] = useState<OfferData>();
  const { control, handleSubmit, reset, formState: { errors } } = useForm<OfferFormForm>({
    defaultValues: {
      title: '',
      cost: 0.0,
      numDay: 0
    }
  });

  if (mode == "edit") {
    const { id } = useParams();
    useEffect(() => {
      OfferService.offerById(Number(id)).then(response => {
        setOffer(response);
        reset({
          title: response.title,
          cost: response.cost,
          numDay: response.numDay,
        })
      }).catch(error => {
        if (error.status == 401) {
          logout();
        }
      })
    }, [])
  }

  const onSubmit = (data: OfferFormForm) => {
    if (mode == "create") {
      const OfferCreate: OfferCreate = {
        title: data.title,
        cost: data.cost,
        numDay: data.numDay
      }

      OfferService.createOffer(OfferCreate).then(response => {
        navegate("/offer", { state: { action: "create", reference: response.title } })
      }).catch(error => {
        if (error.status == 401) {
          logout();
        } else {
          console.log(error)
        }
      })
    } else {
      const offerUpdate: OfferUpdate = {
        title: data.title,
        cost: data.cost,
        numDay: data.numDay
      }
      OfferService.updateOffer(offer!.id, offerUpdate).then(response => {
        navegate("/offer", { state: { action: "edit", reference: response.title } })
      })
    }
  }

  const btnCancel = () => {
    navegate("/offer");
  }

  if (mode == "edit" && !offer) {
    return <Loader />
  }

  return (
    <Main>
      <TitlePage>{mode == "create" ? "Crear clase" : "Editar clase"}</TitlePage>
      <DivContent>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
          <div>
            <Controller
              name="title"
              control={control}
              rules={{
                maxLength: {
                  value: 100,
                  message: "Título demasiado largo"
                },
                required: "El título es obligatorio"
              }}
              render={({ field }) => (
                <Input
                  id="title"
                  name="title"
                  placeholder="Título"
                  type="text"
                  value={field.value || ""}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.title && <p className="text-danger-500 text-sm">{errors.title.message}</p>}
          </div>
          <div>
            <Controller
              name="cost"
              control={control}
              rules={{
                min: {
                  value: 0.01,
                  message: "El coste no puede ser inferior a 0,01 €"
                }
              }}
              render={({ field }) => (
                <Input
                  id="cost"
                  name="cost"
                  placeholder="Coste"
                  type="number"
                  value={field.value || ""}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.cost && <p className="text-danger-500 text-sm">{errors.cost.message}</p>}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full">
              <Controller
                name="numDay"
                control={control}
                rules={{
                  min: {
                    value: 1,
                    message: "El número de días debe de ser mínimo 1"
                  }
                }}
                render={({ field }) => (
                  <Input
                    id="numDay"
                    name="numDay"
                    placeholder="Número de Días"
                    type="number"
                    value={field.value || ""}
                    handleChange={(e) => {
                      const value = e.target.value === "" ? "" : parseInt(e.target.value, 10);
                      field.onChange(value);
                    }}
                  />
                )}
              />
              {errors.numDay && <p className="text-danger-500 text-sm">{errors.numDay.message}</p>}
            </div>
          </div>
          <Button id="submit" type="submit" handleClick={() => { }}>Guardar</Button>
          <Button id="btnCacelar" variant="secondary" type="button" handleClick={btnCancel}>Cancelar</Button>
        </form>
      </DivContent>
    </Main>
  );

}
import { useNavigate, useParams } from "react-router-dom";
import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import DivContent from "../../components/Div/DivContent";
import { Controller, useForm } from "react-hook-form";
import type { ClientCreateRequest, ClientData, ClientUpdateRequest } from "../../types/client";
import { ClientService } from "../../services/clientService";
import { useUserContext } from "../../contexts/UserContext";
import { useEffect, useState } from "react";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { Loader } from "../../components/Loader/Loader";
import { LineHorizontal } from '../../components/Line/LineHorizontal';
import { HeaderForm } from '../../components/Header/HeaderForm';

interface ClientFormForm {
  name: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ClientForm() {
  const { logout } = useUserContext();
  const navegate = useNavigate();
  const mode = location.pathname.includes("edit") ? "edit" : "create";
  const [client, setClient] = useState<ClientData>();
  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<ClientFormForm>({
    defaultValues: {
      name: '',
      email: '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  if (mode == "edit") {
    const { id } = useParams();
    useEffect(() => {
      ClientService.clientById(Number(id)).then(response => {
        setClient(response);
        reset({
          name: response.name,
          email: response.email
        })
      }).catch(error => {
        if (error.status == 401) {
          logout();
        }
      })
    }, [])
  }

  const onSubmit = (data: ClientFormForm) => {
    if (mode == "create") {
      const clientCreate: ClientCreateRequest = {
        name: data.name,
        email: data.email,
        password: data.newPassword
      }

      ClientService.createClient(clientCreate).then(response => {
        navegate("/client", { state: { action: "create", reference: response.name } })
      }).catch(error => {
        if (error.status == 401) {
          logout();
        } else {
          console.log(error)
        }
      })
    } else {
      const clientUpdate: ClientUpdateRequest = {
        name: data.name,
        email: data.email,
        password: data.newPassword
      }
      ClientService.updateClient(client!.id, clientUpdate).then(response => {
        navegate("/client", { state: { action: "edit", reference: response.name } })
      })
    }
  }

  const btnCancel = () => {
    navegate("/client");
  }

  const newPassword = watch('newPassword');

  if (mode == "edit" && !client) {
    return <Loader />
  }

  return (
    <Main>
      <DivContent>
        <HeaderForm title={mode == "create" ? "Crear cliente" : mode == "edit" ? "Editar cliente" : ""} type="CLIENTE" />
        <LineHorizontal />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3 sm:py-7 py-3">
          <div className="sm:px-7 px-3">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  type="text"
                  title="Nombre"
                  value={field.value || ""}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.name && <p className="text-danger-500 text-sm">{errors.name.message}</p>}
          </div>
          <div className="sm:px-7 px-3">
            <Controller
              name="email"
              control={control}
              rules={{
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Email inválido'
                }
              }}
              render={({ field }) => (
                <Input
                  id="email"
                  name="email"
                  placeholder="Email"
                  type="email"
                  title="Email"
                  value={field.value || ''}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div className="sm:px-7 px-3">
            <Controller
              name="newPassword"
              control={control}
              rules={mode == "create" ? {
                required: "La contraseña es obligatoria",
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              } : {
                minLength: {
                  value: 6,
                  message: 'La contraseña debe tener al menos 6 caracteres'
                }
              }}
              render={({ field }) => (
                <Input
                  id="newPassword"
                  name="newPassword"
                  placeholder="Nueva Contraseña"
                  type="password"
                  title="Nueva Contraseña"
                  value={field.value || ''}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
          </div>
          <div className="sm:px-7 px-3 sm:pb-7 pb-3">
            <Controller
              name="confirmPassword"
              control={control}
              rules={{
                validate: (value) => (value == newPassword || value == "" && !newPassword) || 'Las contraseñas no coinciden'
              }}
              render={({ field }) => (
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="Confirmar Contraseña"
                  type="password"
                  title="Cofirmar Contraseña"
                  value={field.value || ''}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
          <LineHorizontal />
          <div className="sm:px-7 px-3 sm:pt-7 pt-3 flex flex-col gap-3">
            <Button id="submit" type="submit" handleClick={() => { }}>Guardar</Button>
            <Button id="btnCacelar" variant="secondary" type="button" handleClick={btnCancel}>Cancelar</Button>
          </div>
        </form>
      </DivContent>
    </Main>
  )
} 
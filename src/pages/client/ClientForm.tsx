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

      ClientService.createClient(clientCreate).then(() => {
        navegate("/client")
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
      ClientService.updateClient(client!.id, clientUpdate).then(() => {
        navegate("/client")
      })
    }
  }

  const btnCancel = () => {
    navegate("/client");
  }

  const newPassword = watch('newPassword');

  return (
    <Main>
      <TitlePage>{mode == "create" ? "Crear cliente" : "Editar cliente"}</TitlePage>
      <DivContent>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3">
          <div>
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  id="name"
                  name="name"
                  placeholder="Nombre"
                  type="text"
                  value={field.value || ""}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.name && <p className="text-danger-500 text-sm">{errors.name.message}</p>}
          </div>
          <div>
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
                  value={field.value || ''}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
          </div>
          <div>
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
                  value={field.value || ''}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword.message}</p>}
          </div>
          <div>
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
                  value={field.value || ''}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}
          </div>
          <Button id="submit" type="submit" handleClick={() => { }}>Guardar</Button>
          <Button id="btnCacelar" variant="secondary" type="button" handleClick={btnCancel}>Cancelar</Button>
        </form>
      </DivContent>
    </Main>
  )
} 
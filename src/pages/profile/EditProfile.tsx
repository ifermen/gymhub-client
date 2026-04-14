import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { DivContent } from '../../components/Div/DivContent';
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useForm, Controller } from 'react-hook-form';
import { useUserContext } from "../../contexts/UserContext";
import { ClientService } from "../../services/clientService";
import type { ClientUpdateRequest } from "../../types/client";
import { EmployeeService } from "../../services/employeeService";
import type { EmployeeUpdateRequest } from "../../types/employee";
import { useNavigate } from "react-router-dom";

interface UserEditForm {
  name: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export function EditProfile() {
  const { user, updateUser } = useUserContext();
  const navegate = useNavigate();
  const { control, handleSubmit, watch, formState: { errors } } = useForm<UserEditForm>({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      newPassword: '',
      confirmPassword: ''
    }
  });

  const onSubmit = (data: UserEditForm) => {
    if (user!.role == "CLIENT") {
      const clientUpdateRequest: Partial<ClientUpdateRequest> = {
        name: data.name,
        email: data.email,
      }
      if (data.newPassword != "") {
        clientUpdateRequest.password = data.newPassword;
      }
      ClientService.updateClient(user!.id, clientUpdateRequest).then(client => {
        updateUser(client);
        navegate("/profile");
      }).catch(error => {
        console.log(error);
      });
    } else if (user!.role == "ADMIN" || user!.role == "EMPLOYEE") {
      const employeeUpdateRequest: Partial<EmployeeUpdateRequest> = {
        name: data.name,
        email: data.email,
      }
      if (data.newPassword != "") {
        employeeUpdateRequest.password = data.newPassword;
      }
      EmployeeService.updateEmployee(user!.id, employeeUpdateRequest).then(employee => {
        updateUser(employee);
        navegate("/profile");
      }).catch(error => {
        console.log(error);
      })
    }
  };

  const btnCancel = () => {
    navegate("/profile");
  }

  const newPassword = watch('newPassword');

  return (
    <Main>
      <TitlePage>Editar Perfil</TitlePage>
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
              rules={{
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
                validate: (value) => value === newPassword || 'Las contraseñas no coinciden'
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
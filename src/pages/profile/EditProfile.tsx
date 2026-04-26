import { Main } from "../../components/Main/Main";
import { Input } from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useForm, Controller } from 'react-hook-form';
import { useUserContext } from "../../contexts/UserContext";
import { ClientService } from "../../services/clientService";
import type { ClientUpdateRequest } from "../../types/client";
import EmployeeService from "../../services/employeeService";
import type { EmployeeUpdateRequest } from "../../types/employee";
import { useNavigate } from "react-router-dom";
import DivContent from "../../components/Div/DivContent";
import { HeaderForm } from "../../components/Header/HeaderForm";
import { LineHorizontal } from "../../components/Line/LineHorizontal";

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
      <DivContent>
        <HeaderForm title="Editar Perfil" type="PERFIL" />
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
                  placeholder="Mi nombre . . ."
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
                  placeholder="example@email.com"
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
                  placeholder="? ? ? ? ?"
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
                validate: (value) => value === newPassword || 'Las contraseñas no coinciden'
              }}
              render={({ field }) => (
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  placeholder="? ? ? ? ?"
                  type="password"
                  title="Confirmar Contraseña"
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
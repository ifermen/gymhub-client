import { Controller, useForm } from "react-hook-form";
import DivContent from "../../components/Div/DivContent";
import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import type { EmployeeCreateRequest, EmployeeData, EmployeeUpdateRequest } from "../../types/employee";
import { useEffect, useState } from "react";
import EmployeeService from "../../services/employeeService";

interface EmployeeFormForm {
  name: string;
  email: string;
  newPassword: string;
  confirmPassword: string;
}

export function EmployeeForm() {
  const { logout } = useUserContext();
  const navegate = useNavigate();
  const mode = location.pathname.includes("edit") ? "edit" : "create";
  const [employee, setEmployee] = useState<EmployeeData>();
  const { control, handleSubmit, reset, watch, formState: { errors } } = useForm<EmployeeFormForm>({
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
      EmployeeService.employeeById(Number(id)).then(response => {
        setEmployee(response);
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

  const onSubmit = (data: EmployeeFormForm) => {
    if (mode == "create") {
      const employeeCreate: EmployeeCreateRequest = {
        name: data.name,
        email: data.email,
        password: data.newPassword
      }

      EmployeeService.createEmployee(employeeCreate).then(() => {
        navegate("/employee")
      }).catch(error => {
        if (error.status == 401) {
          logout();
        } else {
          console.log(error)
        }
      })
    } else {
      const employeeUpdate: EmployeeUpdateRequest = {
        name: data.name,
        email: data.email,
        password: data.newPassword
      }
      EmployeeService.updateEmployee(employee!.id, employeeUpdate).then(() => {
        navegate("/employee")
      })
    }
  }

  const btnCancel = () => {
    navegate("/employee");
  }

  const newPassword = watch('newPassword');

  return (
    <Main>
      <TitlePage>{mode == "create" ? "Crear Empleado" : "Editar Empleado"}</TitlePage>
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
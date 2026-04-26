import { Controller, useForm } from "react-hook-form";
import DivContent from "../../components/Div/DivContent";
import { Main } from "../../components/Main/Main";
import { Input } from "../../components/Input/Input";
import { Button } from "../../components/Button/Button";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate, useParams } from "react-router-dom";
import type { EmployeeCreateRequest, EmployeeData, EmployeeUpdateRequest } from "../../types/employee";
import { useEffect, useState } from "react";
import EmployeeService from "../../services/employeeService";
import { Loader } from "../../components/Loader/Loader";
import { HeaderForm } from "../../components/Header/HeaderForm";
import { LineHorizontal } from "../../components/Line/LineHorizontal";

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

      EmployeeService.createEmployee(employeeCreate).then(response => {
        navegate("/employee", { state: { action: "create", reference: response.name } })
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
      EmployeeService.updateEmployee(employee!.id, employeeUpdate).then(response => {
        navegate("/employee", { state: { action: "edit", reference: response.name } })
      })
    }
  }

  const btnCancel = () => {
    navegate("/employee");
  }

  const newPassword = watch('newPassword');

  if (mode == "edit" && !employee) {
    return <Loader />
  }

  return (
    <Main>
      <DivContent>
        <HeaderForm title={mode == "create" ? "Crear Empleado" : mode == "edit" ? "Editar Empleado" : ""} type="EMPLEADO" />
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
                  placeholder="Empleado . . ."
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
                validate: (value) => (value == newPassword || value == "" && !newPassword) || 'Las contraseñas no coinciden'
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
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Main } from "../../components/Main/Main";
import { Controller, useForm } from "react-hook-form";
import DivContent from "../../components/Div/DivContent";
import { Input } from "../../components/Input/Input";
import { TextArea } from "../../components/Input/TextArea";
import { Button } from "../../components/Button/Button";
import { Dropdown } from "../../components/Dropdown/Dropdown";
import { useEffect, useState } from "react";
import { EmployeeService } from "../../services/employeeService";
import type { ClassCreate, ClassData, ClassUpdate } from "../../types/class";
import { ClassService } from "../../services/classService";
import { useUserContext } from "../../contexts/UserContext";
import { Loader } from "../../components/Loader/Loader";
import toast from "react-hot-toast";
import { HeaderForm } from "../../components/Header/HeaderForm";
import { LineHorizontal } from "../../components/Line/LineHorizontal";

interface ClassFormForm {
  title: string;
  description: string;
  capacity: number;
  facility: string;
  schedule: string;
  teacher: string;
}

export function ClassForm() {
  const { logout } = useUserContext();
  const location = useLocation();
  const navegate = useNavigate();
  const mode = location.pathname.includes("edit") ? "edit" : "create";
  const [classData, setClassData] = useState<ClassData>();
  const [employeeOptions, setEmployeeOptions] = useState<Map<string, string>>(new Map([["-1", "Elige un empleado"]]));
  const { control, handleSubmit, reset, formState: { errors } } = useForm<ClassFormForm>({
    defaultValues: {
      title: '',
      description: '',
      capacity: 0,
      facility: '',
      schedule: '',
      teacher: "-1"
    }
  });

  if (mode == "edit") {
    const { id } = useParams();
    useEffect(() => {
      ClassService.classById(Number(id)).then(response => {
        setClassData(response);
        reset({
          title: response.title,
          description: response.description,
          capacity: response.capacity,
          facility: response.facility,
          schedule: response.schedule,
          teacher: response.idTeacher + "",
        })
      }).catch(error => {
        if (error.status == 401) {
          logout();
        }
      })
    }, [])
  }

  useEffect(() => {
    EmployeeService.listAllEmployees().then(response => {
      const mapEmployee = new Map(response.map(e => [e.id + "", e.name]));
      setEmployeeOptions(new Map([...employeeOptions, ...mapEmployee]));
    }).catch(error => {
      if (error.status == 401) {
        logout();
      } else {
        console.log(error)
      }
    })
  }, []);

  const onSubmit = (data: ClassFormForm) => {
    if (mode == "create") {
      const classCreate: ClassCreate = {
        title: data.title,
        description: data.description,
        teacher: Number(data.teacher),
        capacity: data.capacity,
        facility: data.facility,
        schedule: data.schedule
      }

      ClassService.createClass(classCreate).then(response => {
        navegate("/class", { state: { action: "create", reference: response.title } })
      }).catch(error => {
        if (error.status == 401) {
          logout();
        } else if (error.status == 404) {
          toast.error("Empleado no encontrado");
        } else {
          console.log(error)
        }
      })
    } else {
      const classUpdate: ClassUpdate = {
        title: data.title,
        description: data.description,
        teacher: Number(data.teacher),
        capacity: data.capacity,
        facility: data.facility,
        schedule: data.schedule
      }
      ClassService.updateClass(classData!.id, classUpdate).then(response => {
        navegate("/class", { state: { action: "edit", reference: response.title } })
      }).catch(error => {
        if (error.status == 401) {
          logout();
        } else if (error.status == 404) {
          toast.error("Empleado no encontrado");
        } else {
          console.log(error)
        }
      })
    }
  }

  const btnCancel = () => {
    navegate("/class");
  }

  if (mode == "edit" && !classData) {
    return <Loader />
  }

  return (
    <Main>
      <DivContent>
        <HeaderForm title={mode == "create" ? "Crear clase" : mode == "edit" ? "Editar clase" : ""} type="CLIENTE" />
        <LineHorizontal />
        <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-3 sm:py-7 py-3">
          <div className="sm:px-7 px-3">
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
                  placeholder="Clase de ..."
                  type="text"
                  title="Título"
                  value={field.value || ""}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.title && <p className="text-danger-500 text-sm font-bold">{errors.title.message?.toLocaleUpperCase()}</p>}
          </div>
          <div className="sm:px-7 px-3">
            <Controller
              name="teacher"
              control={control}
              rules={{
                validate: (value) => value == null || value == undefined || value != "-1" || "El profesor es obligatorio",
                required: "El profesor es obligatorio"
              }}
              render={({ field }) => (
                <Dropdown
                  id="teacher"
                  title="Profesor"
                  options={employeeOptions}
                  handlerChange={field.onChange}
                  value={field.value}
                />
              )}
            />
            {errors.teacher && <p className="text-danger-500 text-sm font-bold">{errors.teacher.message?.toLocaleUpperCase()}</p>}
          </div>
          <div className="sm:px-7 px-3">
            <Controller
              name="description"
              control={control}
              rules={{
                maxLength: {
                  value: 600,
                  message: "Descripción demasiado largo"
                },
                required: "La descripción es obligatoria"
              }}
              render={({ field }) => (
                <TextArea
                  id="description"
                  name="description"
                  placeholder="Descripción de ..."
                  title="Descripción"
                  value={field.value || ""}
                  rows={3}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.description && <p className="text-danger-500 text-sm font-bold">{errors.description.message?.toLocaleUpperCase()}</p>}
          </div>
          <div className="flex flex-col sm:flex-row gap-3 sm:px-7 px-3">
            <div className="w-full sm:w-1/3">
              <Controller
                name="capacity"
                control={control}
                rules={{
                  min: {
                    value: 1,
                    message: "Mayor que 0"
                  },
                  max: {
                    value: 100,
                    message: "Menor que 100"
                  },
                  required: "La capacidad es obligatoria"
                }}
                render={({ field }) => (
                  <Input
                    id="capacity"
                    name="capacity"
                    placeholder="1 a 100"
                    type="number"
                    title="Capacidad"
                    value={field.value || ""}
                    handleChange={field.onChange}
                  />
                )}
              />
              {errors.capacity && <p className="text-danger-500 text-sm font-bold">{errors.capacity.message?.toLocaleUpperCase()}</p>}
            </div>
            <div className="w-full">
              <Controller
                name="facility"
                control={control}
                rules={{
                  maxLength: {
                    value: 100,
                    message: "Intalación demasiado largo"
                  },
                  required: "La instalación es obligatoria"
                }}
                render={({ field }) => (
                  <Input
                    id="facility"
                    name="facility"
                    placeholder="Intalación donde ..."
                    type="text"
                    title="Intalación"
                    value={field.value || ""}
                    handleChange={field.onChange}
                  />
                )}
              />
              {errors.facility && <p className="text-danger-500 text-sm font-bold">{errors.facility.message?.toLocaleUpperCase()}</p>}
            </div>
          </div>
          <div className="sm:px-7 px-3 sm:pb-7 pb-3">
            <Controller
              name="schedule"
              control={control}
              rules={{
                maxLength: {
                  value: 100,
                  message: "Horario demasiado largo"
                },
                required: "El horario es obligatorio"
              }}
              render={({ field }) => (
                <Input
                  id="schedule"
                  name="schedule"
                  placeholder="Horario cuando ..."
                  type="text"
                  title="Horario"
                  value={field.value || ""}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.schedule && <p className="text-danger-500 text-sm font-bold">{errors.schedule.message?.toUpperCase()}</p>}
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
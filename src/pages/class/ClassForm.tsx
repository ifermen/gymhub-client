import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
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

interface ClassFormForm {
  title: string;
  description: string;
  capacity: number;
  facility: string;
  schedule: string;
  teacher: number;
}

export function ClassForm() {
  const { logout } = useUserContext();
  const location = useLocation();
  const navegate = useNavigate();
  const mode = location.pathname.includes("edit") ? "edit" : "create";
  const [classData, setClassData] = useState<ClassData>();
  const [employeeOptions, setEmployeeOptions] = useState<Map<string, string>>(new Map());
  const { control, handleSubmit, reset, formState: { errors } } = useForm<ClassFormForm>({
    defaultValues: {
      title: '',
      description: '',
      capacity: 0,
      facility: '',
      schedule: '',
      teacher: 0
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
          teacher: response.idTeacher,
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
      setEmployeeOptions(mapEmployee);
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
        teacher: data.teacher,
        capacity: data.capacity,
        facility: data.facility,
        schedule: data.schedule
      }

      ClassService.createClass(classCreate).then(() => {
        navegate("/class")
      }).catch(error => {
        if (error.status == 401) {
          logout();
        } else {
          console.log(error)
        }
      })
    } else {
      const classUpdate: ClassUpdate = {
        title: data.title,
        description: data.description,
        teacher: data.teacher,
        capacity: data.capacity,
        facility: data.facility,
        schedule: data.schedule
      }
      ClassService.updateClass(classData!.id, classUpdate).then(() => {
        navegate("/class")
      })
    }
  }

  const btnCancel = () => {
    navegate("/class");
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
                  placeholder="Descripción"
                  value={field.value || ""}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.description && <p className="text-danger-500 text-sm">{errors.description.message}</p>}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="w-full">
              <Controller
                name="capacity"
                control={control}
                rules={{
                  max: {
                    value: 100,
                    message: "Capacidad demasiado alta"
                  },
                  required: "La capacidad es obligatoria"
                }}
                render={({ field }) => (
                  <Input
                    id="capacity"
                    name="capacity"
                    placeholder="Capacidad"
                    type="number"
                    value={field.value || ""}
                    handleChange={field.onChange}
                  />
                )}
              />
              {errors.capacity && <p className="text-danger-500 text-sm">{errors.capacity.message}</p>}
            </div>
            <div className="w-full flex justify-center">
              <Controller
                name="teacher"
                control={control}
                rules={{
                  required: "El profesor es obligatorio"
                }}
                render={({ field }) => (
                  <Dropdown
                    id="teacher"
                    title="Profesor"
                    options={employeeOptions}
                    handlerChange={field.onChange}
                    value={field.value + ""}
                  />
                )}
              />
              {errors.teacher && <p className="text-danger-500 text-sm">{errors.teacher.message}</p>}
            </div>
          </div>
          <div>
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
                  placeholder="Intalación"
                  type="text"
                  value={field.value || ""}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.facility && <p className="text-danger-500 text-sm">{errors.facility.message}</p>}
          </div>
          <div>
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
                  placeholder="Horario"
                  type="text"
                  value={field.value || ""}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.schedule && <p className="text-danger-500 text-sm">{errors.schedule.message}</p>}
          </div>
          <Button id="submit" type="submit" handleClick={() => { }}>Guardar</Button>
          <Button id="btnCacelar" variant="secondary" type="button" handleClick={btnCancel}>Cancelar</Button>
        </form>
      </DivContent>
    </Main>
  )
}
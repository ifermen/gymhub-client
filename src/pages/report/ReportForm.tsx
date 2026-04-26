import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Main } from "../../components/Main/Main";
import DivContent from '../../components/Div/DivContent';
import { Input } from "../../components/Input/Input";
import { Controller, useForm } from "react-hook-form";
import type { ReportCreate, ReportData } from "../../types/report";
import { useEffect, useState } from "react";
import { Button } from "../../components/Button/Button";
import { ReportService } from "../../services/reportService";
import { TextArea } from "../../components/Input/TextArea";
import { useUserContext } from "../../contexts/UserContext";
import type { ReportUpdate } from '../../types/report';
import { Loader } from "../../components/Loader/Loader";
import { HeaderForm } from "../../components/Header/HeaderForm";
import { LineHorizontal } from "../../components/Line/LineHorizontal";

interface ReportFormForm {
  title: string;
  description: string
}

export function ReportForm() {
  const { user, logout } = useUserContext();
  const location = useLocation();
  const navegate = useNavigate();
  const mode = location.pathname.includes("edit") ? "edit" : "create";
  const [report, setReport] = useState<ReportData | null>(null);
  const { control, handleSubmit, reset, formState: { errors } } = useForm<ReportFormForm>({
    defaultValues: {
      title: '',
      description: '',
    }
  });

  if (mode == "edit") {
    const { id } = useParams();
    useEffect(() => {
      ReportService.reportById(Number(id)).then(response => {
        if (response.userCreatorId != user?.id) {
          //TODO: Debería redirigir a una página de error
          navegate("/report");
        } else {
          setReport(response);
          reset({
            title: response.title,
            description: response.description
          })
        }
      }).catch(error => {
        if (error.status == 401) {
          logout();
        }
      })
    }, [])
  }

  const onSubmit = (data: ReportFormForm) => {
    if (mode == "create") {
      const reportCreate: ReportCreate = {
        title: data.title,
        description: data.description
      }
      ReportService.createReport(reportCreate).then(response => {
        navegate("/report", { state: { action: "create", reference: response.title } })
      })
    } else if (mode == "edit") {
      const reportUpdate: ReportUpdate = {
        title: data.title,
        description: data.description
      }
      ReportService.updateReport(report!.id, reportUpdate).then(response => {
        navegate("/report", { state: { action: "edit", reference: response.title } })
      })
    }
  }

  const btnCancel = () => {
    navegate("/report");
  }

  if (mode == "edit" && !report) {
    return <Loader />
  }

  return (
    <Main>
      <DivContent>
        <HeaderForm title={mode == "create" ? "Crear Incidencia" : mode == "edit" ? "Editar Incidencia" : ""} type="INCIDENCIA" />
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
                  placeholder="Incidencia . . ."
                  type="text"
                  title="Título"
                  value={field.value || ""}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.title && <p className="text-danger-500 text-sm">{errors.title.message}</p>}
          </div>
          <div className="sm:px-7 px-3 sm:pb-7 pb-3">
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
                  placeholder="Ocurrio . . ."
                  title="Descripción"
                  rows={3}
                  value={field.value || ""}
                  handleChange={field.onChange}
                />
              )}
            />
            {errors.description && <p className="text-danger-500 text-sm">{errors.description.message}</p>}
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
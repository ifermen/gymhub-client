import { useLocation, useNavigate } from "react-router-dom";
import { Main } from "../../components/Main/Main";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { DivContent } from '../../components/DivContent/DivContent';
import { Input } from "../../components/Input/Input";
import { Controller, useForm } from "react-hook-form";
import type { ReportCreate } from "../../types/report";
import { useState } from "react";
import { Button } from "../../components/Button/Button";
import { ReportService } from "../../services/reportService";
import { TextArea } from "../../components/Input/TextArea";

interface ReportFormForm {
  title: string;
  description: string
}

export function ReportForm() {
  const location = useLocation();
  const navegate = useNavigate();
  const mode = location.pathname.includes("edit") ? "edit" : "create";
  const [report, setReport] = useState<ReportCreate | null>(null);
  const { control, handleSubmit, watch, formState: { errors } } = useForm<ReportFormForm>({
    defaultValues: {
      title: report?.title || '',
      description: report?.description || '',
    }
  });

  const onSubmit = (data: ReportFormForm) => {
    const reportCreate: ReportCreate = {
      title: data.title,
      description: data.description
    }
    ReportService.createReport(reportCreate).then(() => {
      navegate("/report")
    })
  }

  const btnCancel = () => {
    navegate("/report");
  }

  return (
    <Main>
      <TitlePage>{mode == "create" ? "Crear incidencia" : "Editar incidencia"}</TitlePage>
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
          <Button id="submit" type="submit" handleClick={() => { }}>Guardar</Button>
          <Button id="btnCacelar" variant="secondary" type="button" handleClick={btnCancel}>Cancelar</Button>
        </form>
      </DivContent>
    </Main>
  )
}
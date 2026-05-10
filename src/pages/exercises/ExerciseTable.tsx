import { useEffect, useState } from "react";
import { Main } from "../../components/Main/Main";
import { useUserContext } from "../../contexts/UserContext";
import { ClientService } from "../../services/clientService";
import { ExerciseService } from "../../services/exerciseService";
import type { ExerciseTableData } from "../../types/exercise";
import DivContent from "../../components/Div/DivContent";
import { ExerciseDay } from "./ExerciseDay";
import { Loader } from "../../components/Loader/Loader";
import { LineHorizontal } from "../../components/Line/LineHorizontal";

export function ExerciseTable() {
  const { user, logout } = useUserContext();
  const [table, setTable] = useState<ExerciseTableData>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    ClientService.clientById(user!.id).then(client => {
      if (client.exerciseTableId != null) {
        ExerciseService.exerciseById(client.exerciseTableId).then(table => {
          setTable(table);
        })
      }
    }).catch(error => {
      if (error.status == 401) {
        logout();
      }
    }).finally(() => {
      setIsLoading(false);
    })
  }, [])

  if (isLoading) {
    return <Loader />
  }

  if (!table) {
    return (
      <Main>
        <div className="w-full sm:w-3/4 md:w-2/3 lg:w-2/4 xl:w-2/4 flex flex-col gap-3 sm:items-start items-center p-3">
          <span className="text-9xl font-extrabold">404</span>
          <h3 className="text-3xl">Tabla de ejercicio no encontrada</h3>
          <p className="text-lg sm:text-2xl w-full text-center sm:text-start">Lo sentimos, no tienes ninguna tabla de ejercicios asignada. Por favor, ponte en contacto con un empleado para que pueda asignarte una.</p>
        </div>
      </Main>
    )
  }

  return (
    <Main>
      <DivContent>
        <div className="sm:p-7 sm:pb-3 p-3 flex flex-col w-full">
          <span className="font-bold text-text-500 text-sm">TABLA DE EJERCICIOS</span>
          <h3 className="sm:text-3xl text-xl">{table.title}</h3>
        </div>
        <LineHorizontal />
        <div className="flex flex-col gap-3 w-full sm:p-7 p-3">
          {table?.days.map(day => (
            <ExerciseDay exerciseDay={day}></ExerciseDay>
          ))}
        </div>
      </DivContent>
    </Main>
  )
}
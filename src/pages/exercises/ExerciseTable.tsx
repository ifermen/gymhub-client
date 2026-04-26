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

  useEffect(() => {
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
    })
  }, [])

  if (!table) {
    return <Loader />
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
import { useEffect, useState } from "react";
import { Main } from "../../components/Main/Main";
import { useUserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import { ClientService } from "../../services/clientService";
import { ExerciseService } from "../../services/exerciseService";
import type { ExerciseTableData } from "../../types/exercise";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import DivContent from "../../components/Div/DivContent";
import { ExerciseDay } from "./ExerciseDay";

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

  return (
    <Main>
      <TitlePage>Tabla de Ejercicios</TitlePage>
      <DivContent>
        {table?.days.map(day => (
          <ExerciseDay exerciseDay={day}></ExerciseDay>
        ))}
      </DivContent>
    </Main>
  )
}
import { useEffect, useState } from "react";
import type { ClassData } from "../../types/class";
import { useNavigate, useParams } from "react-router-dom";
import { ClassService } from "../../services/classService";
import { TitlePage } from "../../components/TitlePage/TitlePage";
import { Main } from "../../components/Main/Main";
import { useUserContext } from "../../contexts/UserContext";
import { LineHorizontal } from "../../components/Line/LineHorizontal";
import { Button } from "../../components/Button/Button";
import { DivContent } from "../../components/Div/DivContent";
import { Pill } from '../../components/Pill/Pill';

export function ClassById() {
  const { user, logout } = useUserContext();
  const navegate = useNavigate();
  const { id } = useParams();
  const [classData, setClassData] = useState<ClassData | null>();

  useEffect(() => {
    ClassService.classById(Number(id))
      .then((response) => {
        setClassData(response);
      })
      .catch((error) => {
        if (error.status == 401) {
          logout();
        }
      });
  }, [id]);

  const clickBackHandler = () => {
    navegate("/class");
  }

  return (
    <Main>
      <TitlePage>Clase</TitlePage>
      <DivContent>
        <div className="flex w-full flex-col gap-1">
          <span className="text-center text-xl font-semibold sm:text-4xl">
            {classData?.title}
          </span>
        </div>
        <LineHorizontal></LineHorizontal>
        <div
          className="flex w-full flex-col sm:flex-row gap-3 justify-between"
        >
          <Pill variant="primary">{classData?.nameTeacher}</Pill>
          <Pill variant="primary">{classData?.schedule}</Pill>
        </div>
        <div className="flex w-full flex-col sm:flex-row gap-3 justify-between">
          <Pill variant="primary">{classData?.facility}</Pill>
          <Pill variant="primary">Capacidad: {classData?.numJoined}/{classData?.capacity}</Pill>
        </div>
        <span className="text-base sm:text-2xl">{classData?.description}</span>
        <LineHorizontal></LineHorizontal>
        <Button
          id="btnBack"
          type="button"
          variant="secondary"
          handleClick={clickBackHandler}
        >
          Volver
        </Button>
      </DivContent>
    </Main>
  );
}

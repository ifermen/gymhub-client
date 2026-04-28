import type { ExerciseTableData } from "../types/exercise";
import { HTTPRequest } from "../utilities/HTTPRequest";

const URL_BASE = import.meta.env.VITE_URL_BASE;
const PATH = "/exercises";

export const ExerciseService = {
  exerciseById: async (id: number) => {
    const response = await HTTPRequest.get<ExerciseTableData>(`${URL_BASE}${PATH}/${id}`);

    return response;
  }
}
import type { ClientWithExerciseTable } from "../types/employee";
import type { ExerciseTableData, } from "../types/exercise";
import { HTTPRequest } from "../utilities/HTTPRequest";
import type { AssignRequest } from '../types/exercise';

const URL_BASE = import.meta.env.VITE_URL_BASE;
const PATH = "/exercises";

export const ExerciseService = {
  exerciseById: async (id: number) => {
    const response = await HTTPRequest.get<ExerciseTableData>(`${URL_BASE}${PATH}/${id}`);

    return response;
  },

  listAllExercise: async () => {
    const response = await HTTPRequest.get<ExerciseTableData[]>(`${URL_BASE}${PATH}/all`)

    return response;
  },

  assign: async (assignRequest: AssignRequest) => {
    const response = await HTTPRequest.post<ClientWithExerciseTable>(`${URL_BASE}${PATH}/assign`, assignRequest);

    return response;
  },

  unassign: async (clientId: number) => {
    const response = await HTTPRequest.delete(`${URL_BASE}${PATH}/unassign/${clientId}`);

    return response;
  }
}
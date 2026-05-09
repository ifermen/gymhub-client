import type { ExerciseTableData } from "./exercise";

export interface EmployeeData {
  id: number;
  name: string;
  email: string;
  creationDate: Date;
  endDate: Date;
  exerciseTableId: number;
}

export interface EmployeeCreateRequest {
  name: string;
  email: string;
  password: string;
}

export interface EmployeeUpdateRequest {
  name: string;
  email: string;
  password: string;
}

export interface ClientWithExerciseTable {
  id: number;
  name: string;
  email: string;
  creationDate: Date;
  endDate: Date;
  exerciseTable: ExerciseTableData;
}

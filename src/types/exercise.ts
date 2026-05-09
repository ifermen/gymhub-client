export interface ExerciseTableData {
  id: number;
  title: string;
  description: string;
  days: ExerciseDayData[]
}

export interface ExerciseDayData {
  day: number;
  title: string;
  content: string;
}

export interface AssignRequest {
  clientId: number;
  exerciseTableId: number;
}

export interface UnassignRequest {
  clientId: number;
}
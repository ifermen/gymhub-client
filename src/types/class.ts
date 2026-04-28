export interface ClassData {
  id: number;
  title: string;
  description: string;
  numJoined: number;
  capacity: number;
  facility: string;
  schedule: string;
  endDate: Date;
  idTeacher: number;
  nameTeacher: string;
}

export interface ClassCreate {
  title: string;
  description: string;
  teacher: number;
  capacity: number;
  facility: string;
  schedule: string;
}

export interface ClassUpdate {
  title: string;
  description: string;
  teacher: number;
  capacity: number;
  facility: string;
  schedule: string;
}

export interface JoinClass {
  idClass: number;
}
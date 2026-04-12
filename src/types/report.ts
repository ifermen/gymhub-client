export interface ReportData {
  id: number;
  title: string;
  status: 'PENDING' | 'CANCELED' | 'RESOLVED';
  description: string;
  creationDate: Date;
  userCreatorId: number;
  userCreatorName: string;
  userSolverId: number;
  userSolverName: string;
}
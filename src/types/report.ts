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

export interface ResolveReportRequest {
  id: number;
  status: 'PENDING' | 'CANCELED' | 'RESOLVED';
}

export interface ReportCreate {
  title: string;
  description: string;
}

export interface ReportUpdate {
  title: string;
  description: string;
}
export interface ListParams {
  pageKey: number;
  pageSize: number;
  sort: string;
  direction: 'ASC' | 'DESC'
}

export interface PageResponse<T> {
  pageKey: number;
  pageSize: number;
  totalPages: number;
  totalElements: number;
  content: T
}
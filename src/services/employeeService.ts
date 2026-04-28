import type { ListParams, PageResponse } from "../types/api";
import type { EmployeeCreateRequest, EmployeeData, EmployeeUpdateRequest } from "../types/employee";
import { HTTPRequest } from "../utilities/HTTPRequest";

const URL_BASE = import.meta.env.VITE_URL_BASE;
const PATH = "/employees";

export const EmployeeService = {
  updateEmployee: async (id: number, data: Partial<EmployeeUpdateRequest>) => {
    const response = await HTTPRequest.put<EmployeeData>(`${URL_BASE}${PATH}/${id}`, data);

    return response;
  },

  createEmployee: async (data: EmployeeCreateRequest) => {
    const response = await HTTPRequest.post<EmployeeData>(`${URL_BASE}${PATH}`, data);

    return response;
  },

  deleteEmployee: async (id: number) => {
    const response = await HTTPRequest.delete(`${URL_BASE}${PATH}/${id}`);

    return response;
  },

  listEmployees: async (params?: Partial<ListParams>) => {
    const queryParams = new URLSearchParams();

    if (params?.pageKey !== undefined) queryParams.set('pageKey', String(params.pageKey));
    if (params?.pageSize !== undefined) queryParams.set('pageSize', String(params.pageSize));
    if (params?.sort) queryParams.set('sort', params.sort);
    if (params?.direction) queryParams.set('direction', params.direction);
    if (params?.filter && params.filter != "") queryParams.set('filter', params.filter);

    const queryString = queryParams.toString();
    const url = `${URL_BASE}${PATH}${queryString ? `?${queryString}` : ''}`;
    const response = await HTTPRequest.get<PageResponse<EmployeeData[]>>(url);

    return response;
  },

  employeeById: async (id: number) => {
    const response = await HTTPRequest.get<EmployeeData>(`${URL_BASE}${PATH}/${id}`);

    response.creationDate = new Date(response.creationDate);

    return response
  },

  searchEmployees: async (search: string, params?: Partial<ListParams>) => {
    const queryParams = new URLSearchParams();

    queryParams.set("search", search);
    if (params?.pageKey !== undefined) queryParams.set('pageKey', String(params.pageKey));
    if (params?.pageSize !== undefined) queryParams.set('pageSize', String(params.pageSize));
    if (params?.sort) queryParams.set('sort', params.sort);
    if (params?.direction) queryParams.set('direction', params.direction);
    if (params?.filter && params.filter != "") queryParams.set('filter', params.filter);

    const queryString = queryParams.toString();
    const url = `${URL_BASE}${PATH}/search${queryString ? `?${queryString}` : ''}`;
    const response = await HTTPRequest.get<PageResponse<EmployeeData[]>>(url);

    return response;
  },

  listAllEmployees: async () => {
    const response = await HTTPRequest.get<EmployeeData[]>(`${URL_BASE}${PATH}/all`);

    return response;
  }
}

export default EmployeeService
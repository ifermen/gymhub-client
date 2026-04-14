import type { ListParams, PageResponse } from "../types/api";
import type { ClassData } from "../types/class";
import { HTTPRequest } from "../utilities/HTTPRequest";

const URL_BASE = import.meta.env.VITE_URL_BASE;
const PATH = "/classes";

export const ClassService = {
  listClasses: async (params?: Partial<ListParams>) => {
    const queryParams = new URLSearchParams();

    if (params?.pageKey !== undefined) queryParams.set('pageKey', String(params.pageKey));
    if (params?.pageSize !== undefined) queryParams.set('pageSize', String(params.pageSize));
    if (params?.sort) queryParams.set('sort', params.sort);
    if (params?.direction) queryParams.set('direction', params.direction);

    const queryString = queryParams.toString();
    const url = `${URL_BASE}${PATH}${queryString ? `?${queryString}` : ''}`;
    const response = await HTTPRequest.get<PageResponse<ClassData[]>>(url);

    const data = response.content.map(classData => {
      return {
        ...classData,
        endDate: new Date(classData.endDate),
      }
    });

    response.content = data;

    return response;
  },

  classById: async (id: number) => {
    const response = await HTTPRequest.get<ClassData>(`${URL_BASE}${PATH}/${id}`);

    response.endDate = new Date(response.endDate);

    return response;
  },
}
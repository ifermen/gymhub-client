import type { ListParams, PageResponse } from "../types/api";
import type { ReportData } from "../types/report";
import { HTTPRequest } from "../utilities/HTTPRequest";

const URL_BASE = import.meta.env.VITE_URL_BASE;
const PATH = "/reports";

export const ReportService = {
  listReports: async (params?: Partial<ListParams>) => {
    const queryParams = new URLSearchParams();

    if (params?.pageKey !== undefined) queryParams.set('pageKey', String(params.pageKey));
    if (params?.pageSize !== undefined) queryParams.set('pageSize', String(params.pageSize));
    if (params?.sort) queryParams.set('sort', params.sort);
    if (params?.direction) queryParams.set('direction', params.direction);

    const queryString = queryParams.toString();
    const url = `${URL_BASE}${PATH}${queryString ? `?${queryString}` : ''}`;
    const response = await HTTPRequest.get<PageResponse<ReportData[]>>(url);

    const data = response.content.map(report => {
      return {
        ...report,
        creationDate: new Date(report.creationDate),
      }
    })

    response.content = data;

    return response;
  }
}
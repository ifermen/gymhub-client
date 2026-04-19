import type { ListParams, PageResponse } from "../types/api";
import type { ClientCreateRequest, ClientData, ClientUpdateRequest, RenewalDataWithoutClient } from "../types/client";
import type { RenewalCreate, RenewalData } from "../types/renewal";
import { HTTPRequest } from "../utilities/HTTPRequest";

const URL_BASE = import.meta.env.VITE_URL_BASE;
const PATH = "/clients";

export const ClientService = {
  getRenewalHistory: async (id: number) => {
    const response = (await HTTPRequest.get<RenewalDataWithoutClient[]>(`${URL_BASE}${PATH}/${id}/renewals`)).map(
      renewal => {
        const renewalRefactor: RenewalDataWithoutClient = {
          offer: renewal.offer,
          startDate: new Date(renewal.startDate),
          endDate: new Date(renewal.endDate)
        }
        return renewalRefactor
      });

    return response;
  },

  updateClient: async (id: number, data: Partial<ClientUpdateRequest>) => {
    const response = await HTTPRequest.put<ClientData>(`${URL_BASE}${PATH}/${id}`, data);

    return response;
  },

  createClient: async (data: ClientCreateRequest) => {
    const response = await HTTPRequest.post<ClientData>(`${URL_BASE}${PATH}`, data);

    return response;
  },

  deleteClient: async (id: number) => {
    const response = await HTTPRequest.delete(`${URL_BASE}${PATH}/${id}`);

    return response;
  },

  listClients: async (params?: Partial<ListParams>) => {
    const queryParams = new URLSearchParams();

    if (params?.pageKey !== undefined) queryParams.set('pageKey', String(params.pageKey));
    if (params?.pageSize !== undefined) queryParams.set('pageSize', String(params.pageSize));
    if (params?.sort) queryParams.set('sort', params.sort);
    if (params?.direction) queryParams.set('direction', params.direction);
    if (params?.filter && params.filter != "") queryParams.set('filter', params.filter);

    const queryString = queryParams.toString();
    const url = `${URL_BASE}${PATH}${queryString ? `?${queryString}` : ''}`;
    const response = await HTTPRequest.get<PageResponse<ClientData[]>>(url);

    return response;
  },

  clientById: async (id: number) => {
    const response = await HTTPRequest.get<ClientData>(`${URL_BASE}${PATH}/${id}`);

    response.creationDate = new Date(response.creationDate);

    return response
  },

  searchClients: async (search: string, params?: Partial<ListParams>) => {
    const queryParams = new URLSearchParams();

    queryParams.set("search", search);
    if (params?.pageKey !== undefined) queryParams.set('pageKey', String(params.pageKey));
    if (params?.pageSize !== undefined) queryParams.set('pageSize', String(params.pageSize));
    if (params?.sort) queryParams.set('sort', params.sort);
    if (params?.direction) queryParams.set('direction', params.direction);
    if (params?.filter && params.filter != "") queryParams.set('filter', params.filter);

    const queryString = queryParams.toString();
    const url = `${URL_BASE}${PATH}/search${queryString ? `?${queryString}` : ''}`;
    const response = await HTTPRequest.get<PageResponse<ClientData[]>>(url);

    return response;
  },

  renewClient: async (data: RenewalCreate) => {
    const response = await HTTPRequest.post<RenewalData>(`${URL_BASE}${PATH}/renewal`, data);

    return response;
  }
}
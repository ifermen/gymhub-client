import type { ListParams, PageResponse } from "../types/api";
import type { OfferData } from "../types/offer";
import { HTTPRequest } from "../utilities/HTTPRequest";

const URL_BASE = import.meta.env.VITE_URL_BASE;
const PATH = "/offers";

export const OfferService = {
  listAllOffers: async () => {
    const response = await HTTPRequest.get<OfferData[]>(`${URL_BASE}${PATH}/all`)

    return response;
  },

  listOffers: async (params?: Partial<ListParams>) => {
    const queryParams = new URLSearchParams();

    if (params?.pageKey !== undefined) queryParams.set('pageKey', String(params.pageKey));
    if (params?.pageSize !== undefined) queryParams.set('pageSize', String(params.pageSize));
    if (params?.sort) queryParams.set('sort', params.sort);
    if (params?.direction) queryParams.set('direction', params.direction);

    const queryString = queryParams.toString();
    const url = `${URL_BASE}${PATH}${queryString ? `?${queryString}` : ''}`;
    const response = await HTTPRequest.get<PageResponse<OfferData[]>>(url);

    const data = response.content.map(offer => {
      return {
        ...offer,
        endDate: new Date(offer.endDate),
      }
    })

    response.content = data;

    return response;
  },
}
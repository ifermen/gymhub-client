import type { ListParams, PageResponse } from "../types/api";
import type { OfferCreate, OfferData, OfferUpdate } from "../types/offer";
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
    if (params?.filter && params.filter != "") queryParams.set('filter', params.filter);

    const queryString = queryParams.toString();
    const url = `${URL_BASE}${PATH}${queryString ? `?${queryString}` : ''}`;
    const response = await HTTPRequest.get<PageResponse<OfferData[]>>(url);

    const data = response.content.map(offer => {
      return {
        ...offer,
        endDate: offer.endDate ? new Date(offer.endDate) : null,
      }
    })

    response.content = data;

    return response;
  },

  offerById: async (id: number) => {
    const response = await HTTPRequest.get<OfferData>(`${URL_BASE}${PATH}/${id}`);

    response.endDate = response.endDate ? new Date(response.endDate) : null;

    return response;
  },

  createOffer: async (offerCreate: OfferCreate) => {
    const response = await HTTPRequest.post<OfferData>(`${URL_BASE}${PATH}`, offerCreate);

    response.endDate = response.endDate ? new Date(response.endDate) : null;

    return response;
  },

  updateOffer: async (id: number, offerUpdate: OfferUpdate) => {
    const response = await HTTPRequest.put<OfferData>(`${URL_BASE}${PATH}/${id}`, offerUpdate);

    response.endDate = response.endDate ? new Date(response.endDate) : null;

    return response;
  },

  deleteOffer: async (id: number) => {
    const response = await HTTPRequest.delete(`${URL_BASE}${PATH}/${id}`);

    return response;
  }
}
import type { OfferData } from "../types/offer";
import { HTTPRequest } from "../utilities/HTTPRequest";

const URL_BASE = import.meta.env.VITE_URL_BASE;
const PATH = "/offers";

export const OfferService = {
  listAllOffers: async () => {
    const response = await HTTPRequest.get<OfferData[]>(`${URL_BASE}${PATH}/all`)

    return response;
  },
}
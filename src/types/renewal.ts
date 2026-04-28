import type { ClientData } from "./client";
import type { OfferData } from "./offer";

export interface RenewalCreate {
  clientId: string;
  offerId: string;
}

export interface RenewalData {
  client: ClientData;
  offer: OfferData;
  startDate: Date;
  endDate: Date;
}
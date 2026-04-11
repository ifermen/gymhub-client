import type { OfferData } from "./offer";

export interface RenewalDataWithoutClient {
  startDate: Date;
  endDate: Date;
  offer: OfferData;
}

export interface ClientUpdateRequest {
  name: string;
  email: string;
  password: string;
}

export interface ClientData {
  id: number;
  name: string;
  email: string;
  creationDate: Date;
  endDate: Date;
  exerciseTableId: number;
}

export interface ClientCreateRequest {
  name: string;
  email: string;
  password: string;
}
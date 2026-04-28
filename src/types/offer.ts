export interface OfferData {
  id: number;
  title: string;
  cost: number;
  numDay: number;
  endDate: Date | null;
}

export interface OfferCreate {
  title: string;
  cost: number;
  numDay: number;
}

export interface OfferUpdate {
  title: string;
  cost: number;
  numDay: number;
}
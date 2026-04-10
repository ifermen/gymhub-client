import type { ApiError } from "../types/error";
import { LocalStorageUtility } from "./LocalStorage";

export const HTTPRequest = {
  get: async <T>(url: string): Promise<T> => {
    const token = LocalStorageUtility.getToken();
    const response = await fetch(url, {
      headers: {
        ...(token && { Authorization: `Bearer ${token}` }),
      }
    });
    const data = await response.json();

    if (!response.ok) {
      throw { ...data } as ApiError;
    }

    return data;
  },

  post: async <T>(url: string, body: any): Promise<T> => {
    const token = LocalStorageUtility.getToken();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(body),
    });

    const data: T = await response.json();

    if (!response.ok) {
      throw { ...data } as ApiError;
    }

    return data;
  }
}
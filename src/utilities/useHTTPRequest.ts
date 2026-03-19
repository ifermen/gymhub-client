import type { ApiError } from "../types/error";

export const useHTTPRequest = () => {
  const get = async <T>(url: string): Promise<T | ApiError> => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  }

  const post = async <T>(url: string, body: any): Promise<T> => {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const data: T = await response.json();

    if (!response.ok) {
      throw { ...data } as ApiError;

    }


    return data;
  }

  return { get, post }
}
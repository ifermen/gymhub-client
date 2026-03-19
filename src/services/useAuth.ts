import type { LoginRequest, LoginResponse } from "../types/auth";
import { useHTTPRequest } from "../utilities/useHTTPRequest"

export const useAuth = () => {
  const URL_BASE = import.meta.env.VITE_URL_BASE;
  const PATH = "/auth/login";
  const { post } = useHTTPRequest();

  const login = async (email: string, password: string) => {
    const loginRequest: LoginRequest = { email, password };

    let response: LoginResponse;

    response = await post<LoginResponse>(URL_BASE + PATH, loginRequest);

    return response;
  }

  return { login }
}
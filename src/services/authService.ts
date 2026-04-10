import type { LoginRequest, LoginResponse, VerifyResponse } from "../types/auth";
import { HTTPRequest } from "../utilities/HTTPRequest";

const URL_BASE = import.meta.env.VITE_URL_BASE;
const PATH = "/auth";

export const AuthService = {

  login: async (email: string, password: string) => {
    const loginRequest: LoginRequest = { email, password };

    const response = await HTTPRequest.post<LoginResponse>(URL_BASE + PATH + "/login", loginRequest);

    return response;
  },

  verifyToken: async () => {
    const response = await HTTPRequest.get<VerifyResponse>(URL_BASE + PATH + "/verify");

    return response;
  }
}
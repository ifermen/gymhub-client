export interface LoginRequest {
  email: string,
  password: string
}

export interface LoginResponse {
  token: string
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'client';
  creation: Date
}

export interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'client';
  creation: Date
}
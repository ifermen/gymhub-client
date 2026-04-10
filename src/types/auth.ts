export interface LoginRequest {
  email: string,
  password: string
}

export interface LoginResponse {
  token: string
}

export interface VerifyResponse {
  valid: true
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'client';
  creationDate: Date
}

export interface JwtPayload {
  id: number;
  name: string;
  email: string;
  role: 'admin' | 'employee' | 'client';
  creationDate: Date
}
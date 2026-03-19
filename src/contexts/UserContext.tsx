import { createContext, useContext, useState, type ReactNode } from "react";
import { useAuth } from "../services/useAuth";
import type { JwtPayload, LoginResponse, UserType } from "../types/auth";
import { jwtDecode } from "jwt-decode";

interface UserContextType {
  loginContext: (email: string, password: string) => Promise<void>;
  user: UserType | null;
}

const UserContext = createContext<UserContextType | null>(null);

interface UserContextProviderProps {
  children: ReactNode
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("El contexto no está inicializado");
  }
  return context;
}

export const UserContextProvider = ({ children }: UserContextProviderProps) => {

  const [user, setUser] = useState<UserType | null>(null);
  const { login } = useAuth();

  const mapJwtToUser = (token: string) => {
    const decoded = jwtDecode<JwtPayload>(token);

    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      //TODO arreglar el parse a date en mapJwtUser
      creation: new Date(decoded.creation),
    };
  }

  const loginContext = async (email: string, password: string): Promise<void> => {
    try {
      const data: LoginResponse = await login(email, password);
      const userResponse = mapJwtToUser(data.token);
      console.log(userResponse)
      setUser(userResponse);
    } catch (error: any) {
      if (error.status === 401) {
        throw new Error('Unauthorized');
      } else {
        console.error(error);
      }
    }
  };

  return (
    <UserContext.Provider value={{
      loginContext,
      user
    }}>
      {children}
    </UserContext.Provider>
  )
} 
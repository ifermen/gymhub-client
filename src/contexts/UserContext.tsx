import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { JwtPayload, LoginResponse, UserType, VerifyResponse } from "../types/auth";
import { jwtDecode } from "jwt-decode";
import { AuthService } from "../services/authService";
import { LocalStorageUtility } from "../utilities/LocalStorage";
import { useNavigate } from "react-router-dom";
import type { ClientData } from "../types/client";
import type { EmployeeData } from "../types/employee";

interface UserContextType {
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  user: UserType | null;
  updateUser: (userData: ClientData | EmployeeData) => void;
  isLoading: boolean;
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

  const navigate = useNavigate();
  const [user, setUser] = useState<UserType | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = LocalStorageUtility.getToken();
    if (!token) {
      setIsLoading(false);
      navigate('/login');
    } else {
      AuthService.verifyToken().then(
        response => {
          const user = mapJwtToUser(token);
          console.log(user)
          setUser(user);
        }
      ).catch(error => {
        if (error.status === 401) {
          navigate('/login');
        } else {
          console.error(error);
        }
      }).finally(() => {
        setIsLoading(false);
      })
    }
  }, []);

  const mapJwtToUser = (token: string) => {
    const decoded = jwtDecode<JwtPayload>(token);

    return {
      id: decoded.id,
      name: decoded.name,
      email: decoded.email,
      role: decoded.role,
      //TODO arreglar el parse a date en mapJwtUser
      creationDate: new Date(decoded.creationDate),
    };
  }

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const data: LoginResponse = await AuthService.login(email, password);
      LocalStorageUtility.saveToken(data.token);
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

  const logout = () => {
    LocalStorageUtility.deleteToken();
    navigate("/login")
  }

  const updateUser = (userData: ClientData | EmployeeData) => {
    const data: UserType = {
      id: user!.id,
      name: userData.name,
      email: userData.email,
      creationDate: user!.creationDate,
      role: user!.role,
    }

    setUser(data);
  }

  return (
    <UserContext.Provider value={{
      login,
      logout,
      user,
      updateUser,
      isLoading
    }}>
      {children}
    </UserContext.Provider>
  )
} 
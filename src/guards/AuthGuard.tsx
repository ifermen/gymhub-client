import { Navigate, Outlet } from 'react-router-dom';
import { useUserContext } from '../contexts/UserContext';
import { LocalStorageUtility } from '../utilities/LocalStorage';

export const AuthGuard = () => {
  const { user, isLoading } = useUserContext();
  const token = LocalStorageUtility.getToken();

  if (isLoading) return <div>Loading...</div>;

  if (!user && !token) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
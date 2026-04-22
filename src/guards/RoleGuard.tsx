import { Outlet } from "react-router-dom";
import { useUserContext } from "../contexts/UserContext";
import type { Role } from "../types/auth";

interface RoleGuardProps {
  allowedRoles: Role[]
}
export function RoleGuard({ allowedRoles }: RoleGuardProps) {
  const { user } = useUserContext();

  if (allowedRoles.some(role => role == user?.role)) {
    return <Outlet />;
  }

  return <span>No permitido</span>;
}
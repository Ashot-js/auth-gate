import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../../store/hooks";

export default function ProtectedRoute() {
  const user = useAppSelector((s) => s.auth.user);
  const isAuthChecked = useAppSelector((s) => s.auth.isAuthChecked);

  if (!isAuthChecked) {
    return <div className="ag-loader">Checking authentication...</div>;
  }

  return user ? <Outlet /> : <Navigate to="/login" replace />;
}

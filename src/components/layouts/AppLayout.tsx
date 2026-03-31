import { Outlet, Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { logout } from "../../store/authSlice";
import { signOut } from "firebase/auth";
import { auth } from "../../configs/firebase";
import Button from "../ui/Button";

export default function AppLayout() {
  const user = useAppSelector((s) => s.auth.user);
  const isAuthChecked = useAppSelector((s) => s.auth.isAuthChecked);
  const dispatch = useAppDispatch();

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } finally {
      dispatch(logout());
    }
  };

  if (!isAuthChecked) {
    return <div className="ag-loader">Loading...</div>;
  }

  return (
    <div className="ag-app-layout">
      <nav className="ag-nav">
        <Link to="/" className="ag-nav__brand">
          Auth Gate
        </Link>
        <div className="ag-nav__right">
          {user && <span className="ag-nav__email">{user.email}</span>}
          {user && (
            <Button variant="outline" onClick={handleLogout}>
              Logout
            </Button>
          )}
        </div>
      </nav>
      <main className="ag-app-layout__main">
        <Outlet />
      </main>
    </div>
  );
}

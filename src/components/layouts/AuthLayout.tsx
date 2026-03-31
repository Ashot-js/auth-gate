import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="ag-auth-layout">
      <div className="ag-auth-layout__card">
        <div className="ag-auth-layout__brand">
          <div className="ag-auth-layout__logo">AG</div>
          <h1 className="ag-auth-layout__title">Auth Gate</h1>
          <p className="ag-auth-layout__subtitle">Secure multi-app authentication</p>
        </div>
        <Outlet />
      </div>
    </div>
  );
}

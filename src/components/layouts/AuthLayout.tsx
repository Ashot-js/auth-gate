import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="ag-auth-layout">
      <div className="ag-bg-grid" aria-hidden="true" />
      <div className="ag-orb ag-orb--1" aria-hidden="true" />
      <div className="ag-orb ag-orb--2" aria-hidden="true" />
      <div className="ag-orb ag-orb--3" aria-hidden="true" />

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

import { useRef } from "react";
import { Outlet } from "react-router";

export default function AuthLayout() {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
    el.style.setProperty("--my", `${e.clientY - rect.top}px`);
  };

  return (
    <div className="ag-auth-layout">
      <div className="ag-bg-grid" aria-hidden="true" />
      <div className="ag-orb ag-orb--1" aria-hidden="true" />
      <div className="ag-orb ag-orb--2" aria-hidden="true" />
      <div className="ag-orb ag-orb--3" aria-hidden="true" />

      <div ref={cardRef} className="ag-auth-layout__card" onMouseMove={handleMouseMove}>
        <div className="ag-card-spotlight" aria-hidden="true" />
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

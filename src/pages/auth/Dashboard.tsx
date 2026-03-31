import { useAppSelector } from "../../store/hooks";

export default function Dashboard() {
  const user = useAppSelector((s) => s.auth.user);

  return (
    <div className="ag-dashboard">
      <div className="ag-dashboard__card">
        <div className="ag-dashboard__avatar">{user?.email?.[0]?.toUpperCase()}</div>
        <h1 className="ag-dashboard__title">Welcome back!</h1>
        <p className="ag-dashboard__email">{user?.email}</p>
        <p className="ag-dashboard__uid">UID: {user?.id}</p>
      </div>

      <div className="ag-dashboard__info">
        <h2>Auth Gate</h2>
        <p>You are successfully authenticated. This is a demo protected dashboard showing your session details.</p>
        <ul>
          <li>Firebase Authentication</li>
          <li>JWT session management</li>
          <li>Protected route guards</li>
          <li>Redux state persistence</li>
        </ul>
      </div>
    </div>
  );
}

import { createBrowserRouter } from "react-router";
import AuthLayout from "./components/layouts/AuthLayout";
import AppLayout from "./components/layouts/AppLayout";
import ProtectedRoute from "./components/protected-route/ProtectedRoute";
import LoginForm from "./pages/login/LoginForm";
import RegisterForm from "./pages/register/RegisterForm";
import Dashboard from "./pages/auth/Dashboard";

export const router = createBrowserRouter([
  {
    element: <AuthLayout />,
    children: [
      { path: "/login", element: <LoginForm /> },
      { path: "/register", element: <RegisterForm /> },
    ],
  },
  {
    element: <AppLayout />,
    children: [
      {
        element: <ProtectedRoute />,
        children: [
          { path: "/", element: <Dashboard /> },
        ],
      },
    ],
  },
]);

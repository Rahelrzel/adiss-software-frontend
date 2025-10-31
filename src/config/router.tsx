import { createBrowserRouter } from "react-router-dom";
import LoginPage from "../app/pages/Auth/Login";
import Register from "../app/pages/Auth/Register";
import Landing from "../app/pages/Landing/Landing";
import Dashboard from "../app/pages/Dashboard/Dashboard";

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  { path: "/landing", element: <Landing /> },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);

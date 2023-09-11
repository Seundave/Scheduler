import { Navigate, useRoutes } from "react-router-dom";
// layouts
import DashboardLayout from "./layouts/dashboard";
import SimpleLayout from "./layouts/simple";
//
import UserPage from "./pages/UserPage";
import LogOut from "./pages/LogOut";
import LoginPage from "./pages/LoginPage";
import Page404 from "./pages/Page404";
import DashboardAppPage from "./pages/DashboardAppPage";
import SchedulePage from "./pages/SchedulePage";
import HistoryPage from "./pages/HistoryPage";

// ----------------------------------------------------------------------

export default function Router() {
  const logout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/login");
  };

  const handleSchedule = () => {
    navigate("/schedule");
  };

  const handleHistory = () => {
    navigate("/history");
  };

  const routes = useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "app", element: <DashboardAppPage /> },
        { path: "user", element: <UserPage /> },
        { path: "history", element: <HistoryPage /> },
        { path: "schedule", element: <SchedulePage /> },
      ],
    },
    {
      path: "/",
      element: <LoginPage />,
      children: [{ element: <Navigate to="/" />, index: true }],
    },
    {
      path: "logout",
      element: <LogOut onClick={logout} />,
    },
    {
      path: "schedule",
      element: <SchedulePage onClick={handleSchedule} />,
    },
    {
      path: "history",
      element: <HistoryPage onClick={handleHistory} />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: "404", element: <Page404 /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}

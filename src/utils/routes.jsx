import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard/layout/AdminDashboard";
import NotificationPage from "../pages/AdminDashboard/pages/NotificationPage";
import PricingPlansPage from "../pages/AdminDashboard/pages/PricingPlansPage";
import SupportPage from "../pages/AdminDashboard/pages/SupportPage";
import ControlsPage from "../pages/AdminDashboard/pages/ControlsPage";


export const router = createBrowserRouter([
  {
    path: "/", element: <AdminDashboard />, children: [
      { index: true, element: <ControlsPage /> },
      { path: "Notification", element: <NotificationPage /> },
      { path: "PricingPlans", element: <PricingPlansPage /> },
      { path: "Support", element: <SupportPage /> },
    ]
  },
]);

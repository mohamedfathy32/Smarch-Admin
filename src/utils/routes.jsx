import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard/layout/AdminDashboard";
import Notification from "../pages/AdminDashboard/pages/Notification";
import SupportPage from "../pages/AdminDashboard/pages/SupportPage";
import ControlsPage from "../pages/AdminDashboard/pages/ControlsPage";
import ChaletOwner from "../pages/AdminDashboard/pages/ChaletOwner";
import PricePlans from "../pages/AdminDashboard/pages/PricePlans";
import Payments from "../pages/AdminDashboard/pages/Payments";
import ReservationManagement from "../pages/AdminDashboard/pages/ReservationManagement";
import ReservationRequester from "../pages/AdminDashboard/pages/ReservationRequester";
import Supscriptions from "../pages/AdminDashboard/pages/Subscriptions";
import BalanceRecharge from "../pages/AdminDashboard/pages/BalanceRecharge";
import Login from "../pages/AdminDashboard/pages/Login";


<<<<<<< HEAD

=======
>>>>>>> fekry


export const router = createBrowserRouter([
  {
    path: "/", 
    element: <Login /> // الصفحة الافتراضية هي Login
  },
  {
    path: "/dashboard", 
    element: <AdminDashboard />, 
    children: [
      { index: true, element: <ControlsPage /> },
      { path: "BalanceRecharge", element: <BalanceRecharge /> },
      { path: "ChaletOwner", element: <ChaletOwner /> },
      { path: "Notification", element: <Notification /> },
      { path: "Payments", element: <Payments /> },
      { path: "PricingPlans", element: <PricePlans /> },
      { path: "ReservationManagement", element: <ReservationManagement /> },
      { path: "ReservationRequester", element: <ReservationRequester /> },
      { path: "Supscriptions", element: <Supscriptions /> },
      { path: "Support", element: <SupportPage /> },
    ]
  }
]);

import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard/layout/AdminDashboard";
import ControlsPage from "../pages/AdminDashboard/pages/ControlsPage";
import BalanceRecharge from "../pages/AdminDashboard/pages/BalanceRecharge";
import ChaletOwner from "../pages/AdminDashboard/pages/ChaletOwner";
import Notification from "../pages/AdminDashboard/pages/Notification";
import Payments from "../pages/AdminDashboard/pages/Payments";
import PricePlans from "../pages/AdminDashboard/pages/PricePlans"; // تأكد أن اسم الملف مطابق
import ReservationManagement from "../pages/AdminDashboard/pages/ReservationManagement";
import ReservationRequester from "../pages/AdminDashboard/pages/ReservationRequester";
import Supscriptions from "../pages/AdminDashboard/pages/Subscriptions"; // تعديل الاسم هنا
import SupportPage from "../pages/AdminDashboard/pages/SupportPage";
import Login from "../pages/AdminDashboard/pages/Login";

export const router = createBrowserRouter([
  {
    path: "/login", 
    element: <Login />
  },
  {
    path: "/", 
    element: <AdminDashboard />, 
    children: [
      { index: true, element: <ControlsPage /> },
      {path:"BalanceRecharge",element:<BalanceRecharge/>},
      {path:"ChaletOwner",element:<ChaletOwner/>},
      { path: "Notification", element: <Notification/> },
      {path:"Payments" , element:<Payments/>},
      { path: "PricingPlans", element: <PricePlans/> },
      {path:"ReservationManagement",element:<ReservationManagement/>},
      {path:"ReservationRequester", element:<ReservationRequester/>},
      {path:"Supscriptions", element:<Supscriptions/>},
      { path: "Support", element: <SupportPage/> },
    ]
  }
]);

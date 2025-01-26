import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard/layout/AdminDashboard";
<<<<<<< HEAD
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



=======
import NotificationPage from "../pages/AdminDashboard/pages/NotificationPage";
import PricingPlansPage from "../pages/AdminDashboard/pages/PricingPlansPage";
import SupportPage from "../pages/AdminDashboard/pages/SupportPage";
import ControlsPage from "../pages/AdminDashboard/pages/ControlsPage";
>>>>>>> fathy


export const router = createBrowserRouter([
  {
    path: "/", element: <AdminDashboard />, children: [
      { index: true, element: <ControlsPage /> },
<<<<<<< HEAD
      {path:"BalanceRecharge",element:<BalanceRecharge/>},
      {path:"ChaletOwner",element:<ChaletOwner/>},
      { path: "Notification", element: <Notification/> },
      {path:"Payments" , element:<Payments/>},
      { path: "PricingPlans", element: <PricePlans/> },
      {path:"ReservationManagement",element:<ReservationManagement/>},
      {path:"ReservationRequester", element:<ReservationRequester/>},
      {path:"Supscriptions", element:<Supscriptions/>},
      { path: "Support", element: <SupportPage/> },

      

=======
      { path: "Notification", element: <NotificationPage /> },
      { path: "PricingPlans", element: <PricingPlansPage /> },
      { path: "Support", element: <SupportPage /> },
>>>>>>> fathy
    ]
  },
]);

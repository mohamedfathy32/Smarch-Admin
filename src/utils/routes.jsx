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
import Articles from "../pages/AdminDashboard/pages/Articles";
import ProtectedRoute from "../pages/AdminDashboard/pages/ProtectedRoute";
export const router = createBrowserRouter([
  {
    path: "/login", 
    element: <Login />
  },
  {
    path: "/", 
    element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>, 
    children: [
<<<<<<< HEAD
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
      {path:"Articles" , element:<Articles/>}
=======
      { index: true, element: <ProtectedRoute><ControlsPage /></ProtectedRoute> },
      {path:"BalanceRecharge",element:<ProtectedRoute><BalanceRecharge/></ProtectedRoute>},
      {path:"ChaletOwner",element:<ProtectedRoute><ChaletOwner/></ProtectedRoute>},
      { path: "Notification", element: <ProtectedRoute><Notification/></ProtectedRoute> },
      {path:"Payments" , element:<ProtectedRoute><Payments/></ProtectedRoute>},
      { path: "PricingPlans", element: <ProtectedRoute><PricePlans/></ProtectedRoute> },
      {path:"ReservationManagement",element:<ProtectedRoute><ReservationManagement/></ProtectedRoute>},
      {path:"ReservationRequester", element:<ProtectedRoute><ReservationRequester/></ProtectedRoute>},
      {path:"Supscriptions", element:<ProtectedRoute><Supscriptions/></ProtectedRoute>},
      { path: "Support", element: <ProtectedRoute><SupportPage/></ProtectedRoute> },
      {path:"Articles" , element:<ProtectedRoute><Articles /></ProtectedRoute>}
>>>>>>> f8772cf34dab025309dbf3c8d370a5ecf3553eae
    ]
  }
]);

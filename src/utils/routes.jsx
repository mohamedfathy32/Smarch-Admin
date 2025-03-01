import { createBrowserRouter } from "react-router-dom";
import AdminDashboard from "../pages/AdminDashboard/layout/AdminDashboard";
import ControlsPage from "../pages/AdminDashboard/pages/ControlsPage";
import BalanceRecharge from "../pages/AdminDashboard/pages/BalanceRecharge";
import ChaletOwner from "../pages/AdminDashboard/pages/ChaletOwner";
import Payments from "../pages/AdminDashboard/pages/Payments";
import PricePlans from "../pages/AdminDashboard/pages/PricePlans"; // تأكد أن اسم الملف مطابق
import ReservationManagement from "../pages/AdminDashboard/pages/ReservationManagement";
import ReservationRequester from "../pages/AdminDashboard/pages/ReservationRequester";
import Supscriptions from "../pages/AdminDashboard/pages/Subscriptions"; // تعديل الاسم هنا
import SupportPage from "../pages/AdminDashboard/pages/SupportPage";
import Login from "../pages/AdminDashboard/pages/Login";
import Articles from "../pages/AdminDashboard/pages/Articles";
import ProtectedRoute from "../pages/AdminDashboard/pages/ProtectedRoute";
import NotificationDetail from "../pages/AdminDashboard/pages/NotificationDetail";
import NotificationPage from "../pages/AdminDashboard/pages/Notifications/NotificationPage";
import AllNotification from "../pages/AdminDashboard/pages/Notifications/Pages/AllNotification";
import ReadNotification from "../pages/AdminDashboard/pages/Notifications/Pages/ReadNotification";
import NewNotification from "../pages/AdminDashboard/pages/Notifications/Pages/NewNotification";
import ChatAdmin from "../pages/AdminDashboard/pages/ChatAdmin";
export const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  {
    path: "/dashboard", element: <ProtectedRoute><AdminDashboard /></ProtectedRoute>, children: [
      { index: true, element: <ControlsPage /> },
      { path: "BalanceRecharge", element: <BalanceRecharge /> },
      { path: "ChaletOwner", element: <ChaletOwner /> },
      {
        path: "Notification", element: <NotificationPage />, children: [
          { index: true, element: <AllNotification /> },
          { path: "new", element: <NewNotification /> },
          { path: "read", element: <ReadNotification /> },
        ]
      },
      { path: "Payments", element: <Payments /> },
      { path: "PricingPlans", element: <PricePlans /> },
      { path: "ReservationManagement", element: <ReservationManagement /> },
      { path: "ReservationRequester", element: <ReservationRequester /> },
      { path: "Supscriptions", element: <Supscriptions /> },
      { path: "Support", element: <SupportPage /> },
      { path: "Articles", element: <Articles /> },
      { path: "ChatAdmin/:id", element: <ChatAdmin /> },

    ]

  },
  { path: "notification/:id", element: <NotificationDetail /> },
]);

import { createContext, useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";

// Create Context
export const NotificationContext = createContext();

// Provider Component
// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  // const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("tokenAdmin");

    if (!token ) {
      console.error("No token found! Redirecting to login...");
      // window.location.href = "/";
      // console.log(location.pathname)
      return;
    }

    // Fetch notifications
    const fetchNotifications = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_URL_BACKEND}/notification/admin`,
          {
            headers: { Authorization: token },
          }
        );

        console.log("Fetched Notifications:", response.data);
        setNotifications(response.data.data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();

    // Initialize Pusher
    const pusher = new Pusher("e2d89305666fadb1029b", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("notification-admin");

    // Listen for new notifications
    channel.bind("newNotification", (data) => {
      console.log("New notification received:", data);
      setNotifications((prev) => [data, ...prev]);
    });

    // Cleanup function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);

  // Mark notification as read
  const markAsRead = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      await axios.patch(
        `${import.meta.env.VITE_URL_BACKEND}/notification/isRead/${id}`,
        { isRead: true }, 
        {
          headers: { Authorization: token },
        }
      );

      // Update local state
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, isRead: true } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark notification as unread
  const markUnRead = async (id) => {
    const token = localStorage.getItem("tokenAdmin");
    if (!token) return;

    try {
      await axios.patch(
        `${import.meta.env.VITE_URL_BACKEND}/notification/isRead/${id}`,
        { isRead: false }, 
        {
          headers: { Authorization: token },
        }
      );

      // Update local state
      setNotifications((prev) =>
        prev.map((notif) =>
          notif._id === id ? { ...notif, isRead: false } : notif
        )
      );
    } catch (error) {
      console.error("Error marking notification as unread:", error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, markAsRead, markUnRead }}>
      {children}
    </NotificationContext.Provider>
  );
};

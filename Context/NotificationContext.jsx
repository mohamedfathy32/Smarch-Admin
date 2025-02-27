import { createContext, useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";

// Create Context
export const NotificationContext = createContext();

// Provider Component
// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [numOfNewNotification, setnumOfNewNotification] = useState();
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);


  const token = localStorage.getItem("tokenAdmin");

  const fetchNotifications = async (isRead = null) => {
    setLoading(true)
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_URL_BACKEND}/notification/admin`,
        {
          headers: { Authorization: token },
          params: {
            page: currentPage,
            ...(isRead !== null && { isRead })
          }
        }
      );

      console.log("Fetched Notifications:", response.data);
      setNotifications(response.data.data);
      setTotalPages(response.data.pagination.totalPages)

    } catch (error) {
      console.error("Error fetching notifications:", error);
    } finally {
      setLoading(false)
    }
  };

  const getNewNotifications = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/notification/admin`, {
        headers: {
          Authorization: token
        },
        params: {
          isRead: false
        }
      })

      setnumOfNewNotification(data.pagination.totalItems)
      console.log("data:"+data)
    } catch (error) {
      console.log(error);

    } finally {

      setLoading(false)
    }
  };


  useEffect(() => {

    getNewNotifications()
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


  return (
    <NotificationContext.Provider value={{ notifications, setCurrentPage, totalPages, currentPage, loading, fetchNotifications, numOfNewNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

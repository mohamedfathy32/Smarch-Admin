import { createContext, useState, useEffect } from "react";
import Pusher from "pusher-js";
import axios from "axios";
import Swal from "sweetalert2";

// Create Context
export const NotificationContext = createContext();

// Provider Component
// eslint-disable-next-line react/prop-types
export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const [readNotifications, setreadNotifications] = useState([]);
  const [newNotifications, setNewNotifications] = useState([]);
  const [numOfNewNotification, setnumOfNewNotification] = useState();
  const [numOfReadNotification, setNumOfReadNotification] = useState();
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
          page: 1,
          limit: 1000,
          isRead: false
        }
      })
      setNewNotifications(data.data)
      setnumOfNewNotification(data.pagination.totalItems)
      setTotalPages(data.pagination.totalPages)
      console.log("data:" + data)
    } catch (error) {
      console.log(error);

    } finally {

      setLoading(false)
    }
  };


  const getReadNotifications = async () => {
    setLoading(true)
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_URL_BACKEND}/notification/admin`, {
        headers: {
          Authorization: token
        },
        params: {
          page: 1,
          limit: 1000,
          isRead: true
        }
      })
      setreadNotifications(data.data)
      setNumOfReadNotification(data.pagination.totalItems)
      setTotalPages(data.pagination.totalPages)
      console.log("data:" + data)
    } catch (error) {
      console.log(error);

    } finally {

      setLoading(false)
    }
  };


  useEffect(() => {

    getNewNotifications()
    fetchNotifications();
    getReadNotifications();

    // Initialize Pusher
    const pusher = new Pusher("e2d89305666fadb1029b", {
      cluster: "us3",
    });

    const channel = pusher.subscribe("notification-admin");

    // Listen for new notifications
    channel.bind("newNotification", (data) => {
      console.log("New notification received:", data);
      setNotifications((prev) => [data, ...prev]);
      setnumOfNewNotification(prev => prev + 1)

    });

    // Cleanup function
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
      pusher.disconnect();
    };
  }, []);



  const toggleReadStatus = async (id, all) => {


    try {
      await axios.patch(
        `${import.meta.env.VITE_URL_BACKEND}/notification/isRead/${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      fetchNotifications()
      getNewNotifications(all)
      setCurrentPage(currentPage);

    } catch (error) {
      Swal.fire({
        title: "errors",
        text: error.response.data.massage,
        icon: "error",
        confirmButtonText: "موافق",
      });
      console.error("Failed to update notification status", error);
    }

  };



  return (
    <NotificationContext.Provider value={{
      notifications, setCurrentPage, totalPages, currentPage, loading, fetchNotifications,
      numOfNewNotification, toggleReadStatus, numOfReadNotification, readNotifications, newNotifications, getReadNotifications, getNewNotifications
    }}>
      {children}
    </NotificationContext.Provider>
  );
};

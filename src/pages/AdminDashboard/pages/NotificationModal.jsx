import { useContext, useEffect, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NotificationContext } from "../../../../Context/NotificationContext";
import { useNavigate } from "react-router-dom";
import Pagination from "../../../components/Pagination";

// eslint-disable-next-line react/prop-types
export default function NotificationModal({ onClose }) {
  const { numOfNewNotification, numOfReadNotification, readNotifications, newNotifications, getNewNotifications, getReadNotifications , toggleReadStatus } = useContext(NotificationContext);
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("unread");
  const [displayedNotifications, setDisplayedNotifications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // عدد الإشعارات لكل صفحة

  useEffect(() => {
    // اجلب كل الإشعارات دفعة واحدة عند فتح المودال
    getNewNotifications();
    getReadNotifications();
  }, []);

  useEffect(() => {
    const activeNotifications = activeTab === "unread" ? newNotifications : readNotifications;

    if (activeNotifications.length > 0) {
      const start = (currentPage - 1) * itemsPerPage;
      const end = start + itemsPerPage;
      setDisplayedNotifications(activeNotifications.slice(start, end));
    } else {
      setDisplayedNotifications([]);
    }
  }, [activeTab, newNotifications, readNotifications, currentPage]);


  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1); // إعادة تعيين الصفحة عند تغيير التبويبة
  };

  const handleNotificationClick = (notif) => {
    toggleReadStatus(notif._id,false);
    switch (notif.type) {
      case "Ticket":
        navigate("/dashboard/Support");
        break;
      case "Chalet":
        navigate(`/dashboard/notification/${notif.relatedEntityId}`);
        break;

      default:
        navigate(`/`);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full relative">
        {/* زر الإغلاق */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-800"
        >
          <FaTimes size={18} />
        </button>

        {/* عنوان الإشعارات */}
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3">
          الإشعارات
        </h2>

        {/* التبويبات */}
        <div className="flex justify-center mt-4 border-b pb-2">
          <button
            className={`px-4 py-2 text-sm font-semibold ${activeTab === "unread"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
              }`}
            onClick={() => handleTabChange("unread")}
          >
            غير مقروءة ({numOfNewNotification})
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold ml-4 ${activeTab === "read"
              ? "border-b-2 border-blue-500 text-blue-600"
              : "text-gray-600"
              }`}
            onClick={() => handleTabChange("read")}
          >
            مقروءة ({numOfReadNotification})
          </button>
        </div>

        {/* عرض الإشعارات حسب التبويب المختار */}
        <div className="mt-4 space-y-4">
          {displayedNotifications.length === 0 && (
            <p className="text-center text-gray-500">لا توجد إشعارات</p>
          )}

          {displayedNotifications.map((notif) => (
            <div
              key={notif._id}
              onClick={() => handleNotificationClick(notif)}
              className={`p-3 border rounded-md shadow-sm cursor-pointer transition ${activeTab === "unread" ? "bg-blue-50 border-blue-400" : "bg-gray-100"
                }`}
            >
              <p className={`text-sm ${activeTab === "unread" ? "text-blue-700 font-semibold" : "text-gray-600"}`}>
                {notif.text}
              </p>
              <p className="text-xs text-gray-500">{notif.createdAt}</p>
            </div>
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={Math.ceil((activeTab === "unread" ? newNotifications.length : readNotifications.length) / itemsPerPage)}
        />
      </div>
    </div>
  );
}

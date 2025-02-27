import React, { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { NotificationContext } from "../../../../Context/NotificationContext";
import { useNavigate } from "react-router-dom";

export default function NotificationModal({ onClose }) {
  const { notifications, markAsRead } = useContext(NotificationContext);
  const navigate = useNavigate();

  // تصنيف الإشعارات إلى غير مقروءة ومقروءة
  const unreadNotifications = notifications.filter((notif) => !notif.isRead);
  const readNotifications = notifications.filter((notif) => notif.isRead);

  // حالة التحكم في التبويبات
  const [activeTab, setActiveTab] = useState("unread");

  // حالة الترقيم لكل قائمة
  const [currentPageUnread, setCurrentPageUnread] = useState(1);
  const [currentPageRead, setCurrentPageRead] = useState(1);
  const notificationsPerPage = 5;

  // حساب الإشعارات المعروضة حسب الصفحة
  const paginate = (data, currentPage) => {
    const start = (currentPage - 1) * notificationsPerPage;
    return data.slice(start, start + notificationsPerPage);
  };

  const paginatedUnread = paginate(unreadNotifications, currentPageUnread);
  const paginatedRead = paginate(readNotifications, currentPageRead);

  // التبديل بين التبويبات
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPageUnread(1);
    setCurrentPageRead(1);
  };

  // التنقل بين الصفحات
  const changePage = (type, direction) => {
    if (type === "unread") {
      setCurrentPageUnread((prev) =>
        direction === "next"
          ? Math.min(prev + 1, Math.ceil(unreadNotifications.length / notificationsPerPage))
          : Math.max(prev - 1, 1)
      );
    } else {
      setCurrentPageRead((prev) =>
        direction === "next"
          ? Math.min(prev + 1, Math.ceil(readNotifications.length / notificationsPerPage))
          : Math.max(prev - 1, 1)
      );
    }
  };

  // التنقل إلى صفحة التفاصيل
  const handleNotificationClick = (id) => {
    navigate(`/notification/${id}`);
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
            className={`px-4 py-2 text-sm font-semibold ${
              activeTab === "unread"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("unread")}
          >
            غير مقروءة ({unreadNotifications.length})
          </button>
          <button
            className={`px-4 py-2 text-sm font-semibold ml-4 ${
              activeTab === "read"
                ? "border-b-2 border-blue-500 text-blue-600"
                : "text-gray-600"
            }`}
            onClick={() => handleTabChange("read")}
          >
            مقروءة ({readNotifications.length})
          </button>
        </div>

        {/* عرض الإشعارات حسب التبويب المختار */}
        <div className="mt-4 space-y-4">
          {activeTab === "unread" && paginatedUnread.length === 0 && (
            <p className="text-center text-gray-500">لا توجد إشعارات غير مقروءة</p>
          )}
          {activeTab === "read" && paginatedRead.length === 0 && (
            <p className="text-center text-gray-500">لا توجد إشعارات مقروءة</p>
          )}

          {(activeTab === "unread" ? paginatedUnread : paginatedRead).map((notif) => (
            <div
              key={notif._id}
              onClick={() => handleNotificationClick(notif.relatedEntityId)}
              className={`p-3 border rounded-md shadow-sm cursor-pointer transition ${
                activeTab === "unread" ? "bg-blue-50 border-blue-400" : "bg-gray-100"
              }`}
            >
              <p className={`text-sm ${activeTab === "unread" ? "text-blue-700 font-semibold" : "text-gray-600"}`}>
                {notif.text}
              </p>
              <p className="text-xs text-gray-500">{notif.createdAt}</p>
            </div>
          ))}
        </div>

        {/* أزرار الترقيم */}
        {(activeTab === "unread" ? unreadNotifications : readNotifications).length > notificationsPerPage && (
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => changePage(activeTab, "prev")}
              disabled={activeTab === "unread" ? currentPageUnread === 1 : currentPageRead === 1}
              className={`px-4 py-2 rounded-md text-sm font-semibold ${
                (activeTab === "unread" ? currentPageUnread === 1 : currentPageRead === 1)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              السابق
            </button>
            <span className="text-gray-700">
              صفحة {activeTab === "unread" ? currentPageUnread : currentPageRead} من{" "}
              {Math.ceil((activeTab === "unread" ? unreadNotifications.length : readNotifications.length) / notificationsPerPage)}
            </span>
            <button
              onClick={() => changePage(activeTab, "next")}
              disabled={
                activeTab === "unread"
                  ? currentPageUnread >= Math.ceil(unreadNotifications.length / notificationsPerPage)
                  : currentPageRead >= Math.ceil(readNotifications.length / notificationsPerPage)
              }
              className={`px-4 py-2 rounded-md text-sm font-semibold ${
                (activeTab === "unread"
                  ? currentPageUnread >= Math.ceil(unreadNotifications.length / notificationsPerPage)
                  : currentPageRead >= Math.ceil(readNotifications.length / notificationsPerPage))
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-blue-500 text-white hover:bg-blue-600"
              }`}
            >
              التالي
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
